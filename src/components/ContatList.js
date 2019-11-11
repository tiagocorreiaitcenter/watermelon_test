import React from 'react';
import {FlatList, Text} from 'react-native';
import withObservables from '@nozbe/with-observables';

import ContactItem from './ContactItem';

const ContactsList = ({contacts = []}) => {
  return (
    <FlatList
      data={contacts}
      keyExtractor={item => item.id}
      renderItem={({item}) => <ContactItem contact={item} />}
    />
  );
};

const enhance = withObservables([''], ({database}) => ({
  contacts: database.collections.get('contacts').query(),
}));

export default enhance(ContactsList);
