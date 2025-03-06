/**
 * NS Base customer record - contains definitions for most of the built in fields
 */
import { NetsuiteRecord } from './Record';
import * as record from 'N/record';
import { Sublist, SublistLine } from './Sublist';
import { AddressBase } from './AddressBase';
/**
 * The address _sublist_ on customer records, not to be confused with the Address _subrecord_.
 * Customer address info is split between this sublist and the subrecord pointed to by the _addressbook_ field.
 */
export declare class AddressSublist extends SublistLine {
    /**
     * The Address subrecord associated to this line
     *
     * Extend this class and override this property
     * if you want to replace AddressBase with a custom Address subclass.
     *
     * @example
     export class MyCustomAddressClass extends AddressBase {
          // ... custom fields here
     }
 
     export class MyAddressSublist extends AddressSublist {
       @SublistFieldType.subrecord(MyCustomAddressClass)
       addressbookaddress: MyCustomAddressClass
    }
     */
    addressbookaddress: AddressBase;
    attention: string;
    defaultbilling: boolean;
    defaultshipping: boolean;
    displaystate: string;
    dropdownstate: number;
    id: number;
    internalid: number;
    isresidential: boolean;
    label: string;
    override: boolean;
    phone: string;
    state: string;
    zip: string;
}
export declare enum CurrencySymbolPlacement {
    BeforeNumber = 1,
    AfterNumber = 2
}
export declare class CurrencySublist extends SublistLine {
    readonly balance: number;
    readonly consolbalance: number;
    readonly consoldepositbalance: number;
    readonly consoloverduebalance: number;
    readonly consolunbilledorders: number;
    currency: number;
    readonly currencyformatsample: string;
    readonly depositbalance: number;
    displaysymbol: string;
    readonly overduebalance: number;
    overridecurrencyformat: boolean;
    symbolplacement: CurrencySymbolPlacement;
    readonly unbilledorders: number;
}
export declare class CustomerBase extends NetsuiteRecord {
    static recordType(): record.Type;
    accountnumber: string;
    category: number;
    comments: string;
    companyname: string;
    currency: number;
    customform: number;
    datecreated: Date;
    email: string;
    entityid: string;
    entitystatus: number;
    externalid: string;
    fax: string;
    firstname: string;
    isinactive: boolean;
    isperson: 'T' | 'F';
    lastmodifieddate: Date;
    language: number;
    lastname: string;
    parent: number;
    phone: string;
    pricelevel: number;
    salesrep: number;
    subsidiary: number;
    taxable: boolean;
    taxitem: number;
    terms: number;
    addressbook: Sublist<AddressSublist>;
    currencySublist: Sublist<CurrencySublist>;
}
export declare class ContactsSublist extends SublistLine {
    contact: number;
    email: string;
    giveaccess: boolean;
    passwordconfirm: boolean;
    role: number;
    sendemail: boolean;
    /**
     * Password strength
     */
    strength: string;
}
