import {Model, Q} from '@nozbe/watermelondb';
import {field, children, lazy, action} from '@nozbe/watermelondb/decorators';

export class PhoneNumbers extends Model {
  static table = 'phone_numbers';

  static associations = {
    contacts: {type: 'belongs_to', key: 'contact_id'},
  };

  @field('id') id;
  @field('number') number;
  @field('origin') origin;
  @field('contact_id') contactId;
}

export class Contacts extends Model {
  static table = 'contacts';

  static associations = {
    phone_numbers: {type: 'has_many', foreignKey: 'contact_id'},
    emails: {type: 'has_many', foreignKey: 'contact_id'},
  };

  @field('native_id') nativeId;
  @field('name') name;

  @field('im_name') imName;
  @field('type') type;
  @field('sort_name') sortName;
  @field('photo') photo;

  @children('phone_numbers') phoneNumbers;

  @action async createContact({name}) {
    return await this.collections.get('contacts').create(contact => {
      contact.name = name;
    });
  }
}

export class Emails extends Model {
  static table = 'emails';

  static associations = {
    contacts: {type: 'belongs_to', key: 'contact_id'},
  };
}

/* export class ContactPhoneNumbers extends Model {
  static table = 'contact_phone_numbers';

  static associations = {
    contacts: {type: 'belongs_to', key: 'contact_id'},
    phone_numbers: {type: 'belongs_to', key: 'phone_number_id'},
  };
} */
