import { NetsuiteRecord } from './Record';
/**
 * The addressbook 'subrecord'. In SS2.x this is mostly treated as a normal record object but you can't
 * create or load one from scratch. Typically just reference this type on the appropriate address subrecord
 * property. For example,
 *
 * @example - an NSDAL Customer instance can refer to the first address's subrecord simply as:
 *
 * customer.addressbook[0].addressbookaddress.addr1
 *
 *
 * @example - defining custom addressbook subrecord fields.

 ```typescript

 // define custom fields on address subrecord (optional)
  export class MyCustomAddressClass extends AddressBase {
         // ... define custom address subrecord fields here
    }

  // tell the customer address sublist to use our custom subrecord class
  export class MyAddressSublist extends CustomerAddressSublist {
       @SublistFieldType.subrecord(MyCustomAddressClass)
      addressbookaddress: MyCustomAddressClass
   }
 ```
 */
export declare class AddressBase extends NetsuiteRecord {
    addr1: string;
    addr2: string;
    addr3: string;
    addressee: string;
    /**
     * note this field name differs from the 'records browser' documentation
     */
    addrphone: string;
    addrtext: string;
    attention: string;
    city: string;
    /**
     * Unlike other `select` fields which take a numeric internal id value, this one requires the country abbreviation as the key (e.g. 'US')
     */
    country: string;
    state: string;
    zip: string;
    override: boolean;
}
