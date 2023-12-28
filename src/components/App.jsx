import React, { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Modal } from './Modal';
const KEY_LOCAL_STORAGE = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    try {
      const contactsInLS =
        JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE)) || [];
      setContacts(contactsInLS);

      if (contactsInLS.length === 0) {
        setTimeout(() => {
          setShowModal(true);
        }, 1000);
      }
    } catch (error) {
      new Error(error.message);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(contacts));
    } catch (error) {
      new Error(error.message);
    }
  }, [contacts]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleInputFilter = evt => {
    const searchName = evt.target.value;
    setFilter(searchName);
  };

  const handleSubmitForm = ({ id, name, number }) => {
    const isExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isExists) {
      NotificationManager.info(`${name} is alredy in contacts`);
      return;
    }
    setContacts([...contacts, { id, name, number }]);
  };

  const handleDeleteContact = idContact => {
    setContacts(contacts.filter(contact => contact.id !== idContact));
  };

  const loadDefaultContacts = contactsFromModal => {
    setContacts(contactsFromModal);
    toggleModal();
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      {showModal && (
        <Modal toggleModal={toggleModal} loadContacts={loadDefaultContacts} />
      )}
      <div className="container">
        <NotificationContainer />
        <h1>Phonebook</h1>
        <ContactForm onSubmitForm={handleSubmitForm} />
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
