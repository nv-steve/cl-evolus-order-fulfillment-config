/**
 * NetSuite Email Template Record Type
 */
import { NetsuiteRecord } from './Record';
/**
 * NetSuite Email Template Record Type (emailtemplate)
 */
export declare class EmailTemplate extends NetsuiteRecord {
    static recordType(): string;
    addcompanyaddress: boolean;
    addunsubscribelink: boolean;
    campaigndomain: number;
    content: string;
    description: string;
    externalid: string;
    isinactive: boolean;
    isprivate: boolean;
    mediaitem: number;
    name: string;
    restricttogroup: number;
    subject: string;
}
