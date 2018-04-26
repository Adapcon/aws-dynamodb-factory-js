const AWS = require('aws-sdk')

const DEFAULT_PRODUCTION_OPTIONS = {
    region: 'sa-east-1'
}
const DEFAULT_LOCAL_OPTIONS = {
    region: "localhost",
    endpoint: "http://localhost:8000"
}

class DynamodbFactory {
    static raw(options) {
        return new AWS.DynamoDB(this._getOptions(options))
    }
    
    static doc(options) {
        return new AWS.DynamoDB.DocumentClient(this._getOptions(options))
    }

    static _getOptions(options) {
        if (options) return options;
        else if (process.env.IS_OFFLINE) return DEFAULT_LOCAL_OPTIONS;
        else return DEFAULT_PRODUCTION_OPTIONS;
    }
}


module.exports = DynamodbFactory;