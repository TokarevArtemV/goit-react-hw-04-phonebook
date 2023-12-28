import { PureComponent } from 'react';
import css from './Modal.module.css';

export class ModalContent extends PureComponent {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
  };

  render() {
    const { toggleModal, loadContacts } = this.props;
    return (
      <div>
        <p>Would you like to download default contacts?</p>
        <div className={css.containerButtons}>
          <button
            className={css.modalButtons}
            type="button"
            onClick={() => loadContacts(this.state.contacts)}
          >
            Yes
          </button>
          <button
            className={css.modalButtons}
            type="button"
            onClick={toggleModal}
          >
            No
          </button>
        </div>
        <button
          className={css.modalButtonClose}
          type="button"
          onClick={toggleModal}
        >
          x
        </button>
      </div>
    );
  }
}
