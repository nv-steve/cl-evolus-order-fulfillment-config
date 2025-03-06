/**
 * This module provides a lazy, functional processing approach to working with NetSuite SuiteQL queries.
 * It automatically handles paging behind the scenes allowing the developer to focus on 'per result' business logic.
 *
 * Use `LazyQuery.from()` to get started.
 * Turn query results into plain objects using `nsQueryResult2obj()` and enables you to leverage
 * the methods of [ImmutableJS](https://immutable-js.com) to process query results.
 * @module
 */
import * as query from 'N/query';
import * as LogManager from './EC_Logger';
/**
 * Rudimentary conversion of a NS query result to a simple flat plain javascript object. Suitable as an argument to `map()`
 * @param r the query result to process
 * @returns a simple javascript object representation of the query result as type `T`.
 *
 *
 * @typeparam T declares the shape of the plain objects returned. e.g. `nsQueryResult2obj<{ companyname, memo }>` for a query
 * that has columns _companyname_ and _memo_. Including an optional type here ensures strong typing on followup chained
 * method calls.
 *
 * @example  (using Immutable JS Sequence)
 *
 * ```typescript
 *
 *  Seq(LazyQuery.from({query:'string'}).map(nsQueryResult2obj()).forEach(...)
 *
 *  ```
 */
export declare function nsQueryResult2obj<T = {}>(r: query.Result): T;
/**
 *
 * Makes a NetSuite query an ES2015 style Iterator. That is, it follows the Iterator Protocol for iterating
 * over query results in a forward-only fashion. The result can be passed to any library
 * that accepts Iterators (such as ImmutableJS)
 * to provide easy chainable logic for arbitrary length result sets.
 *
 * @see LazySearch
 *
 * @example take the first result of a query as a plain object (ImmutableJS)
 * ```typescript
 * import {Seq} from './NFT-X.Y.Z/immutable'
 * const oneResult = Seq(LazyQuery.from()).map(nsQueryResult2obj()).take(1)
 * ```
 */
export declare class LazyQuery implements IterableIterator<query.Result> {
    /**
     * the name of the custom logger for this component for independent logging control
     */
    static LOGNAME: "lazy";
    protected log: LogManager.Logger;
    protected pagedData: query.PagedData;
    protected currentPage: query.Page;
    protected currentData: query.Result[];
    protected index: number;
    protected mappedData: query.QueryResultMap[];
    protected iterator: query.PageIterator;
    /**
     * Not meant to be used directly, use factory methods such as `load` or `from`
     * @param q object of query and parameters
     * @param pageSize optional pagesize, can be up to 1000
     */
    private constructor();
    /**
     * Creates a lazy query from an existing NS .
     * @param q the SQL query and optional query parameters
     * @param pageSize optional pagesize, can be up to 1000. Default is 500
     * @returns Lazy Seq ready for processing
     *
     * @example create a query and begin lazy processing of results
     *
     * ```
     * import {Seq} from './NFT-X.Y.Z/immutable'
     * import * as query from 'N/query
     * import {governanceRemains, LazyQuery, nsQueryResult2obj} from './NFT-X.Y.Z/query'
     *
     * Seq(LazyQuery.from({
     *    query: 'SELECT id FROM FOO WHERE name = ?',
     *    params: ['Farnsworth']
     * }))
     *   .takeWhile(governanceRemains()) // process until we drop below default governance threshold
     *   .map(nsQueryResult2obj()) // convert query results to plain objects with properties
     *   .forEach( r => log.debug(r))
     * ```
     */
    static from(q: {
        query: string;
        params?: Array<string | number | boolean>;
    }, pageSize?: number): LazyQuery;
    /**
     * LazyQuery is both an iterable and an iterator for query results.
     */
    [Symbol.iterator](): IterableIterator<query.Result>;
    /**
     * per the iterator protocol, retrieves the next element. Also returns `null` if done as the specification for
     * the protocol says the value property is optional when 'done'
     *
     * You don't typically call this function yourself - libraries like ImmutableJS do.
     */
    next(): IteratorResult<query.Result>;
}
