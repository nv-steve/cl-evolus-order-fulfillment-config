/**
 * NetSuite Units Type record  (used for 'units of measure')
 */
import { NetsuiteRecord } from './Record';
import { Sublist, SublistLine } from './Sublist';
import * as record from 'N/record';
/**
 * the "Units" sublist
 */
export declare class UOMSublist extends SublistLine {
    internalid: string;
    abbreviation: string;
    baseunit: boolean;
    conversionrate: number;
    pluralabbreviation: string;
    pluralname: string;
    unitname: string;
}
/**
 * NetSuite Units Type record (unitstype)
 */
export declare class UnitsType extends NetsuiteRecord {
    name: string;
    externalid: string;
    isinactive: boolean;
    uom: Sublist<UOMSublist>;
    static recordType(): record.Type;
}
