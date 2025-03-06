/**
 * Base class for Note record
 */
import { NetsuiteRecord } from './Record';
import * as record from 'N/record';
/**
 * Note record base class
 */
export declare class NoteBase extends NetsuiteRecord {
    /**
     * Record type
     */
    static recordType(): record.Type;
    /**
     * Accounting Period
     */
    accountingperiod: number;
    /**
     * Author
     */
    author: number;
    /**
     * Direction
     */
    direction: number;
    /**
     * Entity
     */
    entity: number;
    /**
     * ExternalId
     */
    externalid: string;
    /**
     * Folder
     */
    folder: number;
    /**
     * Item
     */
    item: number;
    /**
     * Modification Date
     */
    lastmodifieddate: Date;
    /**
     * Media
     */
    media: number;
    /**
     * Memo
     */
    note: string;
    /**
     * Date
     */
    notedate: Date;
    /**
     * Type
     */
    notetype: number;
    /**
     * Custom Record Key
     */
    record: number;
    /**
     * Custom Record Type
     */
    recordtype: number;
    /**
     * Time
     */
    time: string;
    /**
     * Title
     */
    title: string;
    /**
     * Topic
     */
    topic: number;
    /**
     * Transaction
     */
    transaction: number;
}
