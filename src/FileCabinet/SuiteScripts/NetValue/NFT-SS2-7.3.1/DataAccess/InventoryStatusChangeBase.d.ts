/**
 * NetSuite Inventory Status Change Record Type
 */
import { NetsuiteRecord } from './Record';
import * as record from 'N/record';
/**
 *
 * Inventory Status Change NetSuite record
 */
export declare class InventoryStatusChangeBase extends NetsuiteRecord {
    static recordType(): record.Type;
    externalid: string;
    location: number;
    memo: string;
    previousstatus: number;
    revisedstatus: number;
}
