const { expect } = require('chai');
const sinon = require('sinon');

const DynamodbFactory = require('../index')
const AWS = require('aws-sdk')

let stubAwsDynamoDbRaw;
let stubAwsDynamoDbDoc;

describe('UTIL - DynamodbFactory', () => {

    beforeEach(() => {
        delete process.env.IS_OFFLINE;
        stubAwsDynamoDbRaw = sinon.stub(AWS, 'DynamoDB');
        stubAwsDynamoDbRaw.DocumentClient = () => {};

        stubAwsDynamoDbDoc = sinon.stub(stubAwsDynamoDbRaw, 'DocumentClient')
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
            it('should return custom options', () => {
                let options = DynamodbFactory._getOptions({
                    region: 'customRegion',
                    endpoint: 'customEndPoint'
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

    /* describe('static functions', () => {
      it('create', () => {
        let dynamodbFactoryInstance = new DynamodbFactory();
  
        expect(DynamodbFactory.create).to.be.an('function')
        expect(dynamodbFactoryInstance.create).to.be.an('undefined')
      });
    });
  
    describe('instance', () => {
      it('should instance production database', () => {
        let db = DynamodbFactory.create()
        expect(db.region).to.equal(PRODUCTION_REGION)
      });
      it('should instance local database', () => {
        let db = DynamodbFactory.create({
          offline: true
        })
        expect(db.region).to.equal(LOCAL_REGION)
      });
      it('should instance production database with custom region', () => {
        let customRegion = 'us-east-1';
        let db = DynamodbFactory.create({
          region: customRegion
        })
        expect(db.region).to.equal(customRegion)
      })
    }); */
});
