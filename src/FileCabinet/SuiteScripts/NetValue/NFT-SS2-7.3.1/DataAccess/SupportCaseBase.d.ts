/**
 * Defines new base record type for support cases. Currently outlining high level fields used for this client.
 */
import { NetsuiteRecord } from './Record';
import * as record from 'N/record';
/**
 * NetSuite Support Case record type
 */
export declare class SupportCaseBase extends NetsuiteRecord {
    assigned: number;
    category: number;
    customform: number;
    status: number;
    title: string;
    company: number;
    emailform: boolean;
    messagenew: boolean;
    incomingmessage: string;
    email: string;
    quicknote: string;
    phone: string;
    origin: number;
    startdate: Date;
    static recordType(): record.Type;
}
