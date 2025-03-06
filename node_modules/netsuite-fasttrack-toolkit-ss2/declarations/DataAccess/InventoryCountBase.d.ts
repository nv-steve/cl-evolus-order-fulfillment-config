/**
 * NetSuite Inventory Count Record Type
 */
import { type Sublist, SublistLine } from './Sublist';
import { NetsuiteRecord } from './Record';
import * as record from 'N/record';
/**
 * Items sublist
 */
export declare class ItemSublist extends SublistLine {
    item: number;
}
/**
 * NetSuite Inventory Transfer Record type
 */
export declare class InventoryCountBase extends NetsuiteRecord {
    static recordType(): record.Type;
    item: Sublist<ItemSublist>;
}
