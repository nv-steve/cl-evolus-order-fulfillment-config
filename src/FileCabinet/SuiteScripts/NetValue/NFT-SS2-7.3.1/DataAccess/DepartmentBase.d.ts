import { NetsuiteRecord } from './Record';
import * as record from 'N/record';
/**
 * NetSuite Department record type
 */
export declare class DepartmentBase extends NetsuiteRecord {
    /**
     * External ID
     */
    externalid: string;
    /**
     * Include Children
     */
    includechildren: boolean;
    /**
     * Is Inactive
     */
    isinactive: boolean;
    /**
     * Name
     */
    name: string;
    /**
     * Name No Hierarchy
     */
    namenohierarchy: string;
    /**
     * Parent
     */
    parent: number;
    /**
     * Subsidiary
     */
    subsidiary: number[];
    static recordType(): record.Type;
}
