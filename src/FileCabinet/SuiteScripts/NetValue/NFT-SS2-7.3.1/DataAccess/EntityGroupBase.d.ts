/**
 * Represents an (Entity) Group record type in NetSuite
 */
import { NetsuiteRecord } from './Record';
import { SublistLine, Sublist } from './Sublist';
/**
 * EntityGroup Group Members sublist
 */
export declare class GroupMembersSublist extends SublistLine {
    accesslevel: number;
    bouncedaddress: string;
    contribution: string;
    email: string;
    employeemember: number;
    isprimary: boolean;
    memberemail: string;
    membername: string;
    memberphone: string;
    phone: string;
}
/**
 * EntityGroup (entitygroup) netsuite type
 */
export declare class Base extends NetsuiteRecord {
    static recordType(): string;
    comments: string;
    email: string;
    externalid: string;
    groupname: string;
    groupowner: number;
    grouptypename: string;
    isfunctionalteam: boolean;
    isinactive: boolean;
    ismanufacturingworkcenter: boolean;
    isprivate: boolean;
    isproductteam: boolean;
    issalesrep: boolean;
    issuerole: number;
    issupportrep: boolean;
    laborresources: number;
    machineresources: number;
    restrictiongroup: number;
    savedsearch: number;
    subsidiary: number;
    workcalendar: number;
    groupmembers: Sublist<GroupMembersSublist>;
}
