# aws-dynamodb-factory-js

Validate arguments for a Javascript.

[![Build Status](https://travis-ci.org/Adapcon/aws-dynamodb-factory-js.svg?branch=master)](https://travis-ci.org/Adapcon/aws-dynamodb-factory-js)

[![Coverage Status](https://coveralls.io/repos/github/Adapcon/aws-dynamodb-factory-js/badge.svg?branch=master)](https://coveralls.io/github/Adapcon/aws-dynamodb-factory-js?branch=master)

## Installation

```
npm install --save aws-dynamodb-factory-js
```

## Usage

#### Import

```js
const DynamodbFactory = require('aws-dynamodb-factory-js')
```

#### DynamoDB

```js
const DynamodbFactory = require('aws-dynamodb-factory-js')
let dynamo = DynamodbFactory.raw();

//return new AWS.DynamoDB({ region: 'sa-east-1' })
```

#### DynamoDB with custom options

```js
const DynamodbFactory = require('aws-dynamodb-factory-js')
let dynamo = DynamodbFactory.raw({
    options: { ... }
});

//return new AWS.DynamoDB({ ... })
```

#### DynamoDB with local (offline)

```js
const DynamodbFactory = require('aws-dynamodb-factory-js')

process.env.IS_OFFLINE = true;

let dynamo = DynamodbFactory.raw();

//return new AWS.DynamoDB({ region: "localhost", endpoint: "http://localhost:8000" })

let dynamoCustom = DynamodbFactory.raw({
    offlinePort: 3001
});

//return new AWS.DynamoDB({ region: "localhost", endpoint: "http://localhost:3001" })
```

#### DocumentClient

```js
const DynamodbFactory = require('aws-dynamodb-factory-js')
let dynamo = DynamodbFactory.doc();

//return new AWS.DynamoDB.DocumentClient({ region: 'sa-east-1' })
```

#### DocumentClient with custom options

```js
const DynamodbFactory = require('aws-dynamodb-factory-js')
let dynamo = DynamodbFactory.doc({
    options: { ... }
});

//return new AWS.DynamoDB.DocumentClient({ ... })
```

#### DocumentClient with local (offline)

```js
const DynamodbFactory = require('aws-dynamodb-factory-js')

process.env.IS_OFFLINE = true;
let dynamo = DynamodbFactory.doc();

//return new AWS.DynamoDB.DocumentClient({ region: "localhost", endpoint: "http://localhost:8000" })

let dynamoCustom = DynamodbFactory.doc({
    offlinePort: 3001
});

//return new AWS.DynamoDB.DocumentClient({ region: "localhost", endpoint: "http://localhost:3001" })
```


