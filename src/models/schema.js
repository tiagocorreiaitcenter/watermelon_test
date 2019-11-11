import {appSchema, tableSchema} from '@nozbe/watermelondb';

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'contacts',
      columns: [
        {name: 'native_id', type: 'string', isIndexed: true},
        {name: 'name', type: 'string'},
        {name: 'im_name', type: 'string'},
        {name: 'type', type: 'string'},
        {name: 'sort_name', type: 'string'},
        {name: 'photo', type: 'string'},
        {name: 'search_val', type: 'string'},
        {name: 'origin', type: 'string'},
      ],
    }),
    tableSchema({
      name: 'phone_numbers',
      columns: [
        {name: 'number', type: 'string', isIndexed: true},
        {name: 'origin', type: 'string'},
        {name: 'contact_id', type: 'string'},
      ],
    }),
    /*     tableSchema({
      name: 'contact_phone_numbers',
      columns: [
        {name: 'contact_id', type: 'string'},
        {name: 'phone_number_id', type: 'string'},
      ],
    }), */
    tableSchema({
      name: 'emails',
      columns: [
        {name: 'email', type: 'string'},
        {name: 'contact_id', type: 'string'},
      ],
    }),
  ],
});

export default schema;
