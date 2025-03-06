/**
 * Static mappings (arrays) for easily working with geographic countries and states defined in NetSuite.
 *
 * @example

 ```typescript

 getStateById(3) // returns { 'country': 'US','fullname': 'Arkansas','id': 3,'shortname': 'AR' }
 getStateById(-123) // returns undefined
 getStateByShortName('CA') //  returns 4
 stateMapping.filter( state => state.country === 'US') // array of states in USA
 getCountryById('US') // {'uniquekey': 230,'name': 'United States', 'edition': 'US','id': 'US' }
 ```

 @module
 */
/**
 * Geographic state information
 */
export interface State {
    /**
     * primary key
     */
    id: number;
    /**
     * foreign key linking to Country.id
     */
    country: string;
    /**
     * State abbreviation, if any.
     */
    shortname: string;
    /**
     * long name of the state
     */
    fullname: string;
}
export interface Country {
    /**
     * country numeric primary key
     */
    uniquekey: number;
    /**
     * Country code (abbreviation) - used as unique key for addresses
     */
    id: string;
    /**
     * Country full name
     */
    name: string;
    /**
     * which edition of NetSuite this country belongs to?
     */
    edition: string;
}
/**
 * Represents geographic states used in NetSuite. First one is blank to allow easy binding to a UI dropdown
 * The list was generated via SuiteQL `select * from state`
 */
export declare const stateMapping: State[];
/**
 * Retrieves the state object for the given internal id else undefined
 * @param id internal id of the state you wish to find.
 */
export declare const getStateById: (number: any) => State | undefined;
/**
 * Retrieves the state object for the given State short name (e.g., 'CA') else undefined
 * @example const stateIID = getStateByShortName('CA').id  //  The internal ID (iid) of the California State record
 * @param code The two character state short name
 */
export declare const getStateByShortName: (string: any) => State | undefined;
/**
 * Mappings of country abbreviation, name and NetSuite internal id.
 * This list was generated via SuiteQL `select uniquekey, name, edition, id from country`
 */
export declare const countryMapping: Country[];
/**
 * Retrieves the given country by NS internal id via the static `countryMapping` list.
 * Note that this is an exception to most Netsuite records that use a numeric integer key identifier.
 * @see `countryMapping`
 * @param id country internal id - which is the country code e.g. ('US', 'HK'). This is the id required for
 * Address records.
 */
export declare function getCountryById(id: string): Country | undefined;
/**
 * Retrieves the given country by the numeric 'uniquekey' in the static `countryMapping` list.
 * @see `countryMapping`
 * @param uniquekey the unique _numeric_ key assigned by NS to the country record.
 */
export declare function getCountryByUniqueKey(uniquekey: number): Country | undefined;
