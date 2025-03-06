/**
 * Represents the Revenue Arrangement NetSuite record (used with ARM)
 * @module
 */
import { NetsuiteRecord } from "./Record";
import { Sublist, SublistLine } from "./Sublist";
import * as record from "N/record";
/**
 * The 'revenueelement' sublist on Revenue Arrangement records
 */
export declare class RevenueElementSublist extends SublistLine {
    allocationtype: number;
    amortizationenddate: Date;
    amortizationstartdate: Date;
    fairvalue: number;
    calculatedamount: number;
    contractexpenseacct: number;
    contractexpenseoffsetacct: number;
    costamortizationamount: number;
    deferralaccount: number;
    revrecenddate: Date;
    fairvalueoverride: boolean;
    /**
     * undocumented field but is there
     */
    forecaststartdate: Date;
    /**
     * undocumented field but is there
     */
    forecastenddate: Date;
    isvsoeprice: boolean;
    permitdiscount: boolean;
    referenceid: string;
    recognitionaccount: number;
    returnofelement: number;
    revenueelement: number;
    revenueallocationgroup: number;
    allocationamount: number;
    revenuerecognitionrule: number;
    revrecstartdate: Date;
}
/**
 * The Revenue Arrangement record type in NetSuite.
 * The records browser (2018.1) does not mention the `revenueelement` sublist but the NS help does.
 */
export declare class RevenueArrangementBase extends NetsuiteRecord {
    static recordType(): record.Type;
    accountingbook: number;
    class: number;
    compliant: boolean;
    contrevhandlingtriggered: boolean;
    department: number;
    location: number;
    memo: string;
    subsidiary: number;
    revenueelement: Sublist<RevenueElementSublist>;
}
