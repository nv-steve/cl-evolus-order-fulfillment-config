/**
 * Represents a Contact (contact) record type in NetSuite
 */
import { NetsuiteRecord } from './Record';
import * as record from 'N/record';
import { SublistLine, Sublist } from './Sublist';
import { AddressBase } from './AddressBase';
/**
 * The address _sublist_ (addressbook) on Contact records, not to be confused with the Address _subrecord_.
 * Contact address info is split between this sublist and the subrecord pointed to by the _addressbookaddress_ field.
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
    addressid: string;
    addrtext: string;
    attention: string;
    city: string;
    country: string;
    defaultbilling: boolean;
    defaultshipping: boolean;
    displaystate: string;
    id: number;
    internalid: number;
    label: string;
    override: boolean;
    phone: string;
    state: string;
    zip: string;
}
/**
 * Contact Base Type
 */
export declare class ContactBase extends NetsuiteRecord {
    static recordType(): record.Type;
    altemail: string;
    assistant: number;
    assistantphone: string;
    category: number;
    comments: string;
    company: number;
    contactrole: number;
    contactsource: number;
    customform: number;
    datecreated: Date;
    defaultaddress: string;
    email: string;
    entityid: string;
    externalid: string;
    fax: string;
    firstname: string;
    globalsubscriptionstatus: number;
    homephone: string;
    image: number;
    isinactive: boolean;
    isprivate: boolean;
    lastmodifieddate: Date;
    lastname: string;
    middlename: string;
    mobilephone: string;
    officephone: string;
    otherrelationships: number[];
    owner: number;
    phone: string;
    phoneticname: string;
    salutation: string;
    subsidiary: number;
    supervisor: number;
    supervisorphone: string;
    title: string;
    unsubscribe: number;
    addressbook: Sublist<AddressSublist>;
}
