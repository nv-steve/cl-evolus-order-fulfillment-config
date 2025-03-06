/**
 * NetSuite generic Transaction record
 */
import { NetsuiteRecord } from './Record';
/**
 * Fields common to all transactions in NS, and is the share base class for bundled DataAccess transaction types.
 * Note that when using this base class, pass an existing native NS record object to the constructor.
 * Attempting to create a new instance of this class from scratch or load an existing transaction by internal id
 * will fail (since the record type cannot be ambiguous in those cases).
 *
 */
export declare class TransactionBase extends NetsuiteRecord {
    createddate: Date;
    customform: number;
    department: number;
    /**
     * This field exists only if 'Use Deletion Reason' feature is enabled on the account
     */
    deletionreason: number;
    /**
     * This field exists only if 'Use Deletion Reason' feature is enabled on the account
     */
    deletionreasonmemo: string;
    email: string;
    entity: number;
    externalid: string;
    istaxable: boolean;
    lastmodifieddate: Date;
    location: number;
    memo: string;
    orderstatus: number | string;
    otherrefnum: string;
    postingperiod: number;
    salesrep: number;
    /**
     * Note unlike other identifiers in NetSuite, this one is a string (e.g. 'Partially Fulfilled')
     */
    status: string;
    /**
     * Note unlike other references in NetSuite, this one is a set of undocumented string keys (e.g. 'partiallyFulfilled')
     * The possible statusref values differ for each transaction type
     */
    statusRef: string;
    subsidiary: number;
    tranid: string;
    trandate: Date;
    /**
     * locates line on the 'apply' sublist that corresponds to the passed related record internal id
     * expose this method in derived classes that need dynamic access to the apply sublist
     * returns undefined
     * @deprecated - dynamic access to the apply sublist should generally work using normal collection oriented means
     */
    protected findApplyLine(docId: number): {
        apply: boolean;
        amount: number;
        line: number;
    } | null;
}
