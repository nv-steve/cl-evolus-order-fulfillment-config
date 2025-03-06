/**
 * NS Base subsidiary record - contains definitions built in fields
 */
import { NetsuiteRecord } from './Record';
import * as record from 'N/record';
import { SublistLine } from './Sublist';
export declare class SubsidiaryBase extends NetsuiteRecord {
    static recordType(): record.Type;
    addr1: string;
    addr2: string;
    addr3: string;
    currency: number;
    email: string;
    externalid: string;
    fax: string;
    iselimination: boolean;
    isinactive: boolean;
    legalname: string;
    logo: number;
    name: string;
    override: boolean;
    parent: number;
}
export declare class AccountBookDetail extends SublistLine {
    accountingbook: number;
    currency: number;
}
