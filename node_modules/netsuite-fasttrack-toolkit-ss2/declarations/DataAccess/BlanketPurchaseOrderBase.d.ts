/**
 * NetSuite Blanket Purchase Order Record Type
 */
import { SublistLine } from './Sublist';
import { NetsuiteRecord } from './Record';
import * as record from 'N/record';
export declare class ItemSublist extends SublistLine {
    description: string;
    item: number;
    quantity: number;
}
/**
 * NetSuite Blanket Purchase Order Record type
 */
export declare class BlanketPurchaseOrderBase extends NetsuiteRecord {
    static recordType(): record.Type.BLANKET_PURCHASE_ORDER;
    location: number;
    memo: string;
    subsidiary: number;
    trandate: Date;
}
