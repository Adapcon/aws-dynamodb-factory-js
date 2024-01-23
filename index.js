const { DynamoDBDocument } = require('@aws-sdk/lib-dynamodb');
const { DynamoDB } = require('@aws-sdk/client-dynamodb');

class DynamodbFactory {
    static raw({options, offlinePort} = {}) {
        return new DynamoDB(this._getOptions({options, offlinePort}));
    }
    
    static doc({options, offlinePort} = {}) {
        return DynamoDBDocument.from(this.raw({options, offlinePort}));
    }

    static _getOptions({options, offlinePort} = {}) {
        if (options) return options;
        else if (process.env.IS_OFFLINE) return { region: "localhost", endpoint: `http://localhost:${offlinePort || 8000}` }
        else return { region: 'sa-east-1' };
    }
}


module.exports = DynamodbFactory;