/**
 * NS Base location record - contains definitions for most of the built in fields
 */
import { NetsuiteRecord } from './Record';
import { Sublist, SublistLine } from './Sublist';
import * as record from "N/record";
/**
 * NetSuite generic Location used as a common base class for 'location-like' records,
 * This is meant to be inherited by concrete record types to avoid duplicating effort on fields.
 * Note that this inheritance hierarchy emerged empirically - it's not documented by NetSuite.
 *
 * It contains fields common to all 'location' records in NS
 */
export declare class BusinessHoursSublist extends SublistLine {
    endtime: string;
    isfriday: boolean;
    ismonday: boolean;
    issaturday: boolean;
    issunday: boolean;
    isthursday: boolean;
    istuesday: boolean;
    iswednesday: boolean;
    samedaypickupcutofftime: string;
    starttime: string;
}
export declare class ExcludeTheseRegionsSublist extends SublistLine {
    name: string;
    ranking: number;
    region: number;
}
export declare class IncludeTheseRegionsSublist extends SublistLine {
    name: string;
    ranking: number;
    region: number;
}
/**
 * NetSuite Location base record type
 */
export declare class LocationBase extends NetsuiteRecord {
    static recordType(): record.Type;
    addrphone: string;
    addrtext: string;
    allowstorepickup: boolean;
    autoassignmentregionsetting: number;
    bufferstock: number;
    city: string;
    country: number | string;
    dailyshippingcapacity: number;
    externalid: string;
    geolocationmethod: 'T' | 'F';
    includecontroltower: boolean;
    includesupplyplanning: boolean;
    isinactive: boolean;
    latitude: number;
    locationtype: number;
    logo: number;
    longitude: number;
    makeinventoryavailable: boolean;
    makeinventoryavailablestore: boolean;
    name: string;
    nextpickupcutofftime: Date;
    override: boolean;
    parent: number;
    returnaddr: string;
    returnaddress1: string;
    returnaddress2: string;
    returncity: string;
    returncountry: number | string;
    returnstate: number;
    returnzip: string;
    sopredconfidence: number;
    sopredicteddays: number;
    state: string;
    storepickupbufferstock: number;
    subsidiary: number;
    timezone: number;
    totalshippingcapacity: number;
    tranprefix: string;
    usebins: boolean;
    zip: string;
    businesshours: Sublist<BusinessHoursSublist>;
    excludelocationregions: Sublist<ExcludeTheseRegionsSublist>;
    includelocationregions: Sublist<IncludeTheseRegionsSublist>;
}
