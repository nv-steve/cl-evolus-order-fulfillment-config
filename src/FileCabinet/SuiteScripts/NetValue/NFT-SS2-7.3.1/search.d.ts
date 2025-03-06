/**
 * This module provides a lazy, functional processing approach to working with NetSuite saved searches.
 * It automatically handles paging behind the scenes allowing the developer to focus on 'per result' business logic.
 *
 * Use `LazySearch.from()` and `LazySearch.load()` to get started.
 * Turn search results into plain objects using `nsSearchResult2obj()` and leverage
 * the methods of [ImmutableJS](https://facebook.github.io/immutable-js/) to process search results.
 * @module
 */
import * as search from 'N/search';
import * as LogManager from './EC_Logger';
/**
 *  Any object that includes an 'id' property, which NS search results always have
 */
export type ObjectWithId<T> = T & {
    id: string;
};
/**
 * NetSuite search results always have an `id` property and `recordType` property.
 * These two should flow through to the output of `nsSearchResult2Obj()`. Note that custom column labels will take
 * precedence over these values, so don't use `id` or `recordType` as your custom column label if you want the
 * native SearchResult property values to be used.
 */
export type BaseSearchResult<T> = ObjectWithId<T> & {
    recordType: string | search.Type;
};
/**
 * Rudimentary conversion of a NS search result to a simple flat plain javascript object. Suitable as an argument to `map()`
 * @param useLabels set to false to ignore search column labels, using the column name (internalid) instead.
 * Defaults to true which means the property names on the returned object will match the column label names if set.
 * If useLabels = true and no label exists, falls back to using column name. Note that label strings should be valid
 * characters for property names (e.g. contain no ':', '-', '>' etc.)
 * @param addGetTextProps if true, for each column which has a _truthy_ getText() value, include that as a 'propnameText' field similar to how nsdal behaves
 * @returns a mapping function taking a NetSuite search result and returns a POJO representation of that search result.
 * The return type will always have an 'id' property merged with type T if provided.
 *
 * @typeparam T declares the shape of the plain objects returned. e.g. `nsSearchResult2obj<{ companyname, memo }>` for a search result
 * that has columns _companyname_ and _memo_. Including an optional type here ensures strong typing on followup chained
 * method calls.
 *
 * @example  (using Immutable JS Sequence)
 *
 * ```typescript
 *  // default (uses column labels if present)
 *  Seq(LazySearch.load(1234)).map(nsSearchResult2obj()).forEach(...)
 *
 *  // force ignoring search column labels
 *  Seq(LazySearch.load(1234)).map(nsSearchResult2obj(false)).forEach(...)
 *
 *  ```
 */
export declare function nsSearchResult2obj<T = {}>(useLabels?: boolean, addGetTextProps?: boolean): (r: search.Result) => BaseSearchResult<T>;
/**
 * Makes a NetSuite search an ES2015 style Iterator. That is, it follows the Iterator Protocol for iterating
 * over search results in a forward-only fashion. The result can be passed to any library
 * that accepts Iterators (such as ImmutableJS)
 * to provide easy chainable logic on arbitrary length search result sets.
 *
 * Started with this as a class due to other library requirements and left it as a class just as an easy
 * way to contain state about currentpage and index into that page.
 *
 * This is exposed as an iterator so that it could be used with other libraries. For example
 * I've heard Ramda may support iterators so if we choose to go a more pure FP route down the
 * road this class would be useful - i.e. it remains untied to any particular library.
 *
 * @example take the first result of a search as a plain object (ImmutableJS)
 * ```typescript
 * import {Seq} from './NFT-X.Y.Z/immutable'
 * const oneResult = Seq(LazySearch.load('1234')).map(nsSearchResult2obj()).take(1)
 * ```
 */
export declare class LazySearch implements IterableIterator<search.Result> {
    private search;
    private pageSize;
    /**
     * LazySearch is both an iterable and an iterator for search results.
     */
    [Symbol.iterator](): IterableIterator<search.Result>;
    /**
     * the name of the custom logger for this component for independent logging control
     */
    static LOGNAME: string;
    /**
     * Loads an existing NS search by id and prepares it for lazy evaluation
     * @param id internal id of the search to load
     * @param pageSize how many records to retrieve per page (paging is automatic) Maximum value: 1000
     * @returns {LazySearch}
     *
     * @example do something for each search result, automatically exiting if out of governance.
     *
     * ```typescript
     *
     * import {Seq} from './NFT-X.Y.Z/immutable'
     * import {governanceRemains, LazySearch, nsSearchResult2obj} from './NFT-X.Y.Z/search'
     *
     * Seq(LazySearch.load('1234'))
     *   .takeWhile(governanceRemains()) // process until we drop below default governance threshold
     *   .map(nsSearchResult2obj()) // convert search results to plain objects with properties
     *   .forEach( r => log.debug(r))
     * ```
     */
    static load(id: string, pageSize?: number): LazySearch;
    /**
     * Creates a lazy search from an existing NS search.
     * @param search
     * @param pageSize
     * @returns {LazySearch}
     *
     * @example create a search and begin lazy processing of results
     *
     * ```
     * import {Seq} from './NFT-X.Y.Z/immutable'
     * import * as search from 'N/search
     * import {governanceRemains, LazySearch, nsSearchResult2obj} from './NFT-X.Y.Z/search'
     *
     * Seq(LazySearch.from(search.create({
     *    filters: [['internalid', 'anyof', [1,2]),
     *    columns:['item', 'description'],
     *    type: search.Type.ITEM,
     *  })))
     *   .takeWhile(governanceRemains()) // process until we drop below default governance threshold
     *   .map(nsSearchResult2obj()) // convert search results to plain objects with properties
     *   .forEach( r => log.debug(r))
     * ```
     */
    static from(search: search.Search, pageSize?: number): LazySearch;
    protected log: LogManager.Logger;
    protected currentData: search.Result[];
    protected index: number;
    protected nextPageStart: number;
    protected currentRange: search.Result[];
    protected executedSearch: search.ResultSet;
    protected totalSearchResultLength: number;
    /**
     * Not meant to be used directly, use factory methods such as `load` or `from`
     * @param search the netsuite search object to wrap
     * @param pageSize optional pagesize, can be up to 1000
     */
    private constructor();
    /**
     * per the iterator protocol, retrieves the next element. Also returns `null` if done as the specification for
     * the protocol says the value property is optional when 'done'
     *
     * You don't typically call this function yourself - libraries like ImmutableJS do.
     */
    next(): IteratorResult<search.Result>;
}
