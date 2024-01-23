import type { DynamoDB, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import type { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

export interface FactoryOptions<T extends DynamoDBClientConfig> {
    options?: T
    offlinePort?: number
}

declare class DynamodbFactory {
    static raw(opts?: FactoryOptions<DynamoDBClientConfig>): DynamoDB

    static doc(opts?: FactoryOptions<DynamoDBClientConfig>): DynamoDBDocument

    static _getOptions<T extends DynamoDBClientConfig>(opts?: FactoryOptions<T>): T
}

export default DynamodbFactory
