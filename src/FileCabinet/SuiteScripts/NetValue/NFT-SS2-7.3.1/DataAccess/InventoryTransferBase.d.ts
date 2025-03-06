/**
 * NetSuite Inventory Transfer Record Type
 */
import { type Sublist, SublistLine } from './Sublist';
import { NetsuiteRecord } from './Record';
import * as record from 'N/record';
/**
 * Adjustments sublist
 */
export declare class InventorySublist extends SublistLine {
    item: number;
}
/**
 * NetSuite Inventory Transfer Record type
 */
export declare class InventoryTransferBase extends NetsuiteRecord {
    static recordType(): record.Type;
    inventory: Sublist<InventorySublist>;
}
