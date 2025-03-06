/**
 * Represents a Vendor-Subsidiary Relationship record in NetSuite
 */
import { NetsuiteRecord } from './Record';
import * as record from 'N/record';
/**
 * Vendor-Subsidiary Relationship Record Type
 */
export declare class VendorSubsidiaryRelationshipBase extends NetsuiteRecord {
    static recordType(): record.Type;
    balance: string;
    balancebase: string;
    basecurrency: string;
    creditlimit: string;
    entity: number;
    externalid: string;
    isprimarysub: boolean;
    primarycurrency: string;
    subsidiary: number;
    taxitem: number;
    unbilledorders: string;
    unbilledordersbase: string;
}
