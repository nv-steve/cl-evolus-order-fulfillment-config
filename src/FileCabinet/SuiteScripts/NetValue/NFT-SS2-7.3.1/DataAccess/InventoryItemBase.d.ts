import * as record from 'N/record';
import { Item } from './Item';
/**
 * Netsuite Inventory Item record type
 */
export declare class InventoryItemBase extends Item {
    static recordType(): record.Type;
    contingentrevenuehandling: boolean;
    vendorname: string;
}
