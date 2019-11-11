import {Platform} from 'react-native';
import Contacts from 'react-native-contacts';
import {request, PERMISSIONS} from 'react-native-permissions';

import {removeAccents} from './generic';

export const requestContactsPermissions = async () => {
  if (Platform.OS === 'android') {
    return await request(PERMISSIONS.ANDROID.READ_CONTACTS);
  } else {
    return await request(PERMISSIONS.IOS.CONTACTS);
  }
};

const formatDeviceContacts = contacts => {
  let nContacts = contacts
    .filter(contact => contact.phoneNumbers.length > 0)
    .map(contact => {
      let lNumbers = [],
        emails = [];
      let numbers = contact.phoneNumbers.map(phoneNumber => {
        const mappedNumber = {};
        mappedNumber.originalNumber = phoneNumber.number;
        mappedNumber.value = phoneNumber.number.replace(/[^0-9+*#]/g, '');
        lNumbers.push(mappedNumber.value);
        return mappedNumber;
      });
      if (contact.emailAddresses.length > 0) {
        for (let emailAddress of contact.emailAddresses) {
          emails.push(emailAddress.email);
          lNumbers.push(emailAddress.email.toLowerCase());
        }
      }

      let name;

      if (Platform.OS === 'android') {
        name = contact.displayName;
      } else {
        name = contact.givenName;
        if (contact.familyName) {
          name += ` ${contact.familyName}`;
        }
      }

      lNumbers.push(removeAccents(name).toLowerCase());

      return {
        id: contact.recordID,
        name: name.trim(),
        im_name: name,
        type: 'personal',
        sort_name: removeAccents(name).toLowerCase(),
        phone_numbers: numbers,
        photo: contact.thumbnailPath,
        search_val: lNumbers.join('|'),
        emails: emails,
        origin: 'device',
      };
    });
  return nContacts;
};

export const getContacts = () =>
  new Promise(async (resolve, reject) => {
    Contacts.getAll((err, contacts) => {
      if (err) {
        return reject(err);
      }
      resolve(formatDeviceContacts(contacts));
    });
  });

export const editDeviceContact = recordID =>
  new Promise((resolve, reject) => {
    Contacts.openExistingContact({recordID}, (err, data) => {
      if (err) return reject(err);
      if (!data) return resolve(data);

      const formatedContact = formatDeviceContacts([data])[0];
      resolve(formatedContact);
    });
  });

export const getDeviceContacts = async () => {
  try {
    const hasPermissions = await requestContactsPermissions();
    if (hasPermissions === 'granted') {
      const contacts = await getContacts();
      return formatDeviceContacts(contacts);
    } else {
      //permissions errors are ignored for the moment
      return [];
    }
  } catch (e) {
    throw e;
  }
};
