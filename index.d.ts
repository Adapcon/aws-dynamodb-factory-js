import {DynamoDB} from "aws-sdk";

export interface FactoryOptions<T> {
    options?: T
    offlinePort?: number
}

declare class DynamodbFactory {
    static raw(opts?: FactoryOptions<DynamoDB.Types.ClientConfiguration>): DynamoDB

    static doc(opts?: FactoryOptions<DynamoDB.Types.ClientConfiguration & DynamoDB.DocumentClient.DocumentClientOptions>): DynamoDB.DocumentClient

    static _getOptions<T extends DynamoDB.Types.ClientConfiguration>(opts?: FactoryOptions<T>): T
}

export default DynamodbFactory
