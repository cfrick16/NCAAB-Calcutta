export type AmplifyDependentResourcesAttributes = {
    'auth': {
        'nflcalcutta15eb7e86': {
            'IdentityPoolId': 'string',
            'IdentityPoolName': 'string',
            'UserPoolId': 'string',
            'UserPoolArn': 'string',
            'UserPoolName': 'string',
            'AppClientIDWeb': 'string',
            'AppClientID': 'string'
        }
    },
    'api': {
        'Groups': {
            'RootUrl': 'string',
            'ApiName': 'string',
            'ApiId': 'string'
        }
    },
    'function': {
        'groupsLambda': {
            'Name': 'string',
            'Arn': 'string',
            'Region': 'string',
            'LambdaExecutionRole': 'string'
        },
        'groups': {
            'Name': 'string',
            'Arn': 'string',
            'Region': 'string',
            'LambdaExecutionRole': 'string'
        }
    }
}
