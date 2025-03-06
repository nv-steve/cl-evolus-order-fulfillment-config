import * as record from 'N/record';
import { Sublist, SublistLine } from './Sublist';
import { TransactionBase } from './Transaction';
/**
 * Charge Rule 'resourcerateoverride' Sublist
 */
export declare class ResourcesSublist extends SublistLine {
    name: number;
    rate: number;
}
/**
 * NetSuite Charge Rule
 */
export declare class ChargeRuleBase extends TransactionBase {
    static recordType(): record.Type.CHARGE_RULE;
    amount: number;
    billingitem: number;
    caphours: number;
    capmoney: number;
    captype: number;
    chargeruletype: number;
    customform: number;
    description: string;
    endbydate: number;
    expamtmultiplier: number;
    externalid: string;
    frequency: string;
    isinactive: boolean;
    name: string;
    noenddate: boolean;
    project: number;
    projecttask: number;
    ratemultiplier: number;
    rateroundingtype: number;
    ratesourcetype: number;
    ruleorder: number;
    saleunit: number;
    savedsearch: number;
    scheduledate: Date;
    seriesstartdate: Date;
    stage: number;
    stopifcapped: boolean;
    unitstype: number;
    resourcerateoverride: Sublist<ResourcesSublist>;
}
