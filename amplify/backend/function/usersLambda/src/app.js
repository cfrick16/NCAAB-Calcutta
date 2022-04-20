/* eslint-disable */

/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

/* Amplify Params - DO NOT EDIT
	AUTH_NFLCALCUTTA15EB7E86_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-1' });
const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = 'usersTable-staging';
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

app.get('/users', (req, res) => {
    // Add your code here
    res.json({ success: 'get call succeed!', url: req.url });
});

app.get('/users/:email', (req, res) => {
    // Add your code here
    let params = {
        TableName: tableName,
        Key: {
            email: req.params.email
        },
    }
    dynamodb.get(params,(error, result) => {
        if (error) {
            res.json({statusCode: 500, error: error.message});
        } else {
            res.json({statusCode: 200, url: req.url, body: JSON.stringify(result.Item)})
        }
    });
});

/** **************************
* Example post method *
*************************** */

app.post('/users', (req, res) => {
    // Add your code here
    res.json({ success: 'post call succeed!', url: req.url, body: req.body });
});

app.post('/users/*', (req, res) => {
    // Add your code here
    res.json({ success: 'post call succeed!', url: req.url, body: req.body });
});

/** **************************
* Example put method *
*************************** */

app.put('/users', (req, res) => {
    const params = {
        TableName: tableName,
        Item: {
            ...req.body,
            groups: [],
        },
        ConditionExpression: 'attribute_not_exists(email)'
    };
    // Add your code here
    dynamodb.put(params, (error, result) => {
        if (error) {
            res.json({ statusCode: 500, error: error.message, url: req.url });
        } else {
            res.json({ statusCode: 200, url: req.url, body: JSON.stringify(result.Attributes) });
        }
    });

});

app.put('/users/:email', (req, res) => {
    let params = {
        TableName: tableName,
        Key: {
            email: req.params.email
        },
        UpdateExpression: "SET groups = list_append(groups, :newGroup)",
        ExpressionAttributeValues: {
            ':newGroup': [req.body.newGroup],
        },
        ConditionalExpression: "not(contains(groups, :newGroup))",
        ReturnValues: 'UPDATED_NEW'
    }
    // Add your code here
    dynamodb.update(params, (error, result) => {
        if (error) {
            res.json({statusCode: 500, error: error.message, url: req.url});
        } else {
            res.json({statusCode: 200, url: req.url, body: JSON.stringify(result.Attributes)});
        }
    });
});

/** **************************
* Example delete method *
*************************** */

app.delete('/users', (req, res) => {
    // Add your code here
    res.json({ success: 'delete call succeed!', url: req.url });
});

app.delete('/users/*', (req, res) => {
    // Add your code here
    res.json({ success: 'delete call succeed!', url: req.url });
});

app.listen(3000, () => {
    console.log('App started');
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
