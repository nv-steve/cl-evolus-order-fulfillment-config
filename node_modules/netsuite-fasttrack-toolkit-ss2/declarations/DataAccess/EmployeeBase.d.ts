/**
 * NetSuite Employee Base Record
 */
import { Entity } from './Entity';
import * as record from 'N/record';
import { SublistLine } from './Sublist';
export declare class RolesSublist extends SublistLine {
    selectedrole: number;
}
export declare class EmployeeBase extends Entity {
    approver: number;
    birthdate: Date;
    class: number;
    department: number;
    directdeposit: boolean;
    employeestatus: number;
    employeetype: number;
    gender: string;
    giveaccess: boolean;
    hiredate: Date;
    homephone: string;
    image: number;
    isjobresource: boolean;
    isjobmanager: boolean;
    jobdescription: string;
    lastreviewdate: Date;
    location: number;
    maritalstatus: number;
    mobilephone: string;
    officephone: string;
    releasedate: Date;
    sendemail: boolean;
    supervisor: number;
    timeapprover: number;
    title: string;
    workcalendar: number;
    static recordType(): record.Type;
}
