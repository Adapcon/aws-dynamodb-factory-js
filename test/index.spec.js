const { expect } = require('chai');
const sinon = require('sinon');

const DynamodbFactory = require('../index')
const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocument } = require('@aws-sdk/lib-dynamodb');

let stubAwsDynamoDbRaw;
let stubAwsDynamoDbDoc;

describe('UTIL - DynamodbFactory', () => {

    beforeEach(() => {
        delete process.env.IS_OFFLINE;
        stubAwsDynamoDbRaw = sinon.stub(DynamoDB, 'constructor');
        stubAwsDynamoDbDoc = sinon.stub(DynamoDBDocument, 'from');
    });
    afterEach(() => {
        stubAwsDynamoDbRaw.restore()
        stubAwsDynamoDbDoc.restore()
    });

    describe('static methods', () => {
        describe('_getOptions', () => {
            it('should return production options', () => {
                expect(DynamodbFactory._getOptions().region)
                    .to.equal('sa-east-1')
            })
            it('should return local options', () => {
                process.env.IS_OFFLINE = true;
                let options = DynamodbFactory._getOptions();
                expect(options.region).to.equal('localhost')
                expect(options.endpoint).to.equal('http://localhost:8000')
            })
            it('should return local options with custom port', () => {
                process.env.IS_OFFLINE = true;
                let options = DynamodbFactory._getOptions({
                    offlinePort: 3001
                });
                expect(options.region).to.equal('localhost')
                expect(options.endpoint).to.equal('http://localhost:3001')
            })
            it('should return custom options', () => {
                let options = DynamodbFactory._getOptions({
                    options: {
                        region: 'customRegion',
                        endpoint: 'customEndPoint'
                    }
                });
                expect(options.region).to.equal(options.region)
                expect(options.endpoint).to.equal(options.endpoint)
            })
        });
        describe('doc', () => {
            it('should return raw instance', () => {
                DynamodbFactory.raw()
                expect(stubAwsDynamoDbRaw.called).to.be.true;
                expect(stubAwsDynamoDbDoc.called).to.be.false;
            })

            it('should return doc instance', () => {
                DynamodbFactory.doc()
                expect(stubAwsDynamoDbRaw.called).to.be.false;
                expect(stubAwsDynamoDbDoc.called).to.be.true;
            })
        });
    });
});
