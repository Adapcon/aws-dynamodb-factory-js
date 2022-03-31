import {DynamoDB} from "aws-sdk";

export interface FactoryOptions<T extends DynamoDB.Types.ClientConfiguration> {
    options?: T
    offlinePort?: number
}

declare class DynamodbFactory {
    static raw(opts?: FactoryOptions<DynamoDB.Types.ClientConfiguration>): DynamoDB

    static doc(opts?: FactoryOptions<DynamoDB.Types.ClientConfiguration & DynamoDB.DocumentClient.DocumentClientOptions>): DynamoDB.DocumentClient

    static _getOptions<T>(opts?: FactoryOptions<T>): T
}

export default DynamodbFactory
