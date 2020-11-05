import { DocumentNode } from 'graphql';

/**
 * @interface {GraphQLDataSourceSettings<T>}
 * 
 */

export interface GraphQLDataSourceSettings<T> {
    /** The server to which to connect. */ server: string,
    /** Authentication string to pass to request */ auth?: string,
    /** The GraphQL query */ query: DocumentNode | string,
    /** Any parameters to be passed to theq uery */ params: any,
    /** A function that handles extracting actual items to return */ dataFilter: (document: any) => T[],
    /** A function that handles extracting the total record count from a query */ countFilter: (document: any) => number
}