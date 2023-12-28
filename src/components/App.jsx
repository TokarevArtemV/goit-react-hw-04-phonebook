import React, { PureComponent } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Modal } from './Modal';

const KEY_LOCAL_STORADGE = 'contacts';

export class App extends PureComponent {
  state = {
    contacts: [],
    filter: '',
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(
        KEY_LOCAL_STORADGE,
        JSON.stringify(this.state.contacts)
      );
    }
  }

  componentDidMount() {
    const contactsInLS =
      JSON.parse(localStorage.getItem(KEY_LOCAL_STORADGE)) || [];
    this.setState({ contacts: contactsInLS });

    if (contactsInLS.length === 0) {
      setTimeout(() => {
        this.setState({ showModal: true });
      }, 1000);
    }
  }

  toggleModal = () => {
    this.setState(prevState => {
      return {
        showModal: !this.state.showModal,
      };
    });
  };

  handleInputFilter = evt => {
    const searchName = evt.target.value;
    this.setState({ filter: searchName });
  };

  handleSubmitForm = ({ id, name, number }) => {
    const isExists = this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isExists) {
      NotificationManager.info(`${name} is alredy in contacts`);
      return;
    }
    this.setState(() => {
      return {
        contacts: [...this.state.contacts, { id, name, number }],
      };
    });
  };

  handleDeleteContact = idContact => {
    this.setState(prevState => {
      return {
        ...prevState,
        contacts: prevState.contacts.filter(
          contact => contact.id !== idContact
        ),
      };
    });
  };

  loadDefaultContacts = contactsFromModal => {
    this.setState(prevState => {
      return { ...prevState, contacts: contactsFromModal };
    });
    this.toggleModal();
  };

  render() {
    const { showModal } = this.state;

    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );

    return (
      <>
        {showModal && (
          <Modal
            toggleModal={this.toggleModal}
            loadContacts={this.loadDefaultContacts}
          />
        )}
        <div className="container">
          <NotificationContainer />
          <h1>Phonebook</h1>
          <ContactForm onSubmitForm={this.handleSubmitForm} />
          <h2>Contacts</h2>
          <Filter
            onInputFilter={this.handleInputFilter}
            filter={this.state.filter}
          />
          {filteredContacts.length > 0 && (
            <Contacts
              contacts={filteredContacts}
              onClickDelBtn={this.handleDeleteContact}
            />
          )}
        </div>
      </>
    );
  }
}
