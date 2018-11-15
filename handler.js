
const AWS = require('aws-sdk');
const bluebird = require('bluebird');
AWS.config.setPromisesDependency(bluebird);

// use local dynamodb if running offline
const dbClient = new AWS.DynamoDB.DocumentClient(
  process.env.IS_OFFLINE ? {region: 'localhost', endpoint: 'http://localhost:8000'} : {}
);

module.exports.usersGet = async (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_USER_TABLE
  };
  let result;
  try {
    result = await dbClient.scan(params).promise();
  } catch(error) {
    callback(null, {
      statusCode: error.statusCode || 501,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Failed to get users'
    });
    return;
  }

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(result.Items)
  });
};

module.exports.usersCreate = async (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_USER_TABLE,
    Item: {
      email: `${Math.random().toString(36).substring(7)}@test.com`
    }
  };

  let result;
  // try {
    return await dbClient.put(params).promise();
  
};