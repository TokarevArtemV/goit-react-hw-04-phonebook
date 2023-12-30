import React, { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const KEY_LOCAL_STORAGE = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE)) || []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(contacts));
    } catch (error) {
      new Error(error.message);
    }
  }, [contacts]);

  const handleInputFilter = evt => setFilter(evt.target.value);

  const handleSubmitForm = ({ id, name, number }) => {
    const isExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isExists) {
      NotificationManager.info(`${name} is alredy in contacts`);
      return;
    }
    setContacts(prevState => [...prevState, { id, name, number }]);
  };

  const handleDeleteContact = idContact => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== idContact)
    );
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <div className="container">
        <NotificationContainer />
        <h1>Phonebook</h1>
        <ContactForm handleSubmitForm={handleSubmitForm} />
        <h2>Contacts</h2>
        <Filter onInputFilter={handleInputFilter} filter={filter} />
        {filteredContacts.length > 0 && (
          <Contacts
            contacts={filteredContacts}
            onClickDelBtn={handleDeleteContact}
          />
        )}
      </div>
    </>
  );
};
