/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = 'teams-staging';

const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

/** ********************
 * Example get method *
 ********************* */

app.get('/teams', (req, res) => {
    const params = {
        TableName: tableName,
        Limit: 1000,
    };

    dynamodb.scan(params, (error, result) => {
        if (error) {
            res.json({ statusCode: 500, error: error.message });
        } else {
            const teamNames = result.Items.map((item) => item.name);
            res.json({
                statusCode: 200, success: 'get call succeeded', url: req.url, body: JSON.stringify(teamNames),
            });
        }
    });
});

app.get('/teams/:teamName', (req, res) => {
    // Add your code here
    const params = {
        TableName: tableName,
        Key: {
            name: req.params.teamName,
        },
    };
    dynamodb.get(params, (error, result) => {
        if (error) {
            res.json({ statusCode: 500, error: error.message });
        } else {
            res.json({ statusCode: 200, url: req.url, body: JSON.stringify(result.Item) });
        }
    });
});

app.listen(3000, () => {
    console.log('App started');
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
