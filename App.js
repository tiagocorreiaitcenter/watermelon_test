import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import withObservables from '@nozbe/with-observables';

import {getContacts, requestContactsPermissions} from './src/utils/contacts';
import {schema} from './src/models/schema';
import {Contacts, PhoneNumbers, Emails} from './src/models/models';
import ContactsList from './src/components/ContatList';

const adapter = new SQLiteAdapter({
  dbName: 'watermelonTest',
  schema,
});

const database = new Database({
  adapter,
  modelClasses: [Contacts, PhoneNumbers, Emails],
  actionsEnabled: true,
});

const App = () => {
  const requestAndSetContacts = async () => {
    await requestContactsPermissions();
    const contacts = await getContacts();

    try {
      await database.action(async action => {
        const contactsCollection = database.collections.get('contacts');

        console.log('INICIO BATCH', new Date());
        const contactsBatch = contacts.map(contact => {
          return contactsCollection.prepareCreate(c => {
            c.name = contact.name;
          });
        });

        await database.batch(...contactsBatch);
        console.log('FIM BATCH', new Date());
        console.log('CONTACTOS INSERIDOS:', contactsBatch.length);
      });
    } catch (e) {
      console.log('ERRO: ', e.message);
    }
  };

  /*   useEffect(() => {
    requestAndSetContacts();
  }, []); */

  return (
    <View>
      <Text>🍉 WatermelonDB</Text>
      <ContactsList database={database} />
    </View>
  );
};

export default App;
