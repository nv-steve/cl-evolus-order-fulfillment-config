/**
 * NetSuite Serial Number (Inventory Number) Record Type
 */
import { NetsuiteRecord } from './Record';
import * as record from 'N/record';
import { Sublist, SublistLine } from './Sublist';
/**
 * The 'locations' sublist on Inventory Number records
 */
export declare class LocationsSublist extends SublistLine {
    /**
     * Note the record browser claims this is a select field but it's actually just the text of the location
     * (not internalid)
     */
    location: string;
    quantityavailable: number;
    quantityintransit: number;
    quantityonhand: number;
    quantityonorder: number;
}
/**
 * NetSuite Inventory Number Record Type (inventorynumber)
 */
export declare class InventoryNumberBase extends NetsuiteRecord {
    static recordType(): record.Type;
    expirationdate: Date;
    externalid: string;
    inventorynumber: string;
    memo: string;
    status: string;
    units: number;
    locations: Sublist<LocationsSublist>;
}
