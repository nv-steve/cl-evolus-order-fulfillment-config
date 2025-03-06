/**
 * NetSuite Bin Worksheet Record Type
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
 * NetSuite Bin Worksheet Record type
 */
export declare class BinWorksheetBase extends NetsuiteRecord {
    static recordType(): record.Type.BIN_WORKSHEET;
    location: number;
    memo: string;
    subsidiary: number;
    trandate: Date;
}
