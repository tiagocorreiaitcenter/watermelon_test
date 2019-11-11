import React from 'react';
import {View, Text} from 'react-native';
import withObservables from '@nozbe/with-observables';

const ContactItem = ({contact}) => {
  return <Text>{contact.name}</Text>;
};

const enhance = withObservables(['contact'], ({contact}) => ({
  contact: contact.observe(),
}));

export default enhance(ContactItem);
