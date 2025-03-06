/**
 * Represents an Customer Message (customermessage) record type in NetSuite
 */
import { NetsuiteRecord } from './Record';
import * as record from 'N/record';
/**
 * Customer Message (customermessage) Base Type
 */
export declare class CustomerMessageBase extends NetsuiteRecord {
    static recordType(): record.Type;
    description: string;
    externalid: string;
    isinactive: boolean;
    name: string;
    preferred: boolean;
}
