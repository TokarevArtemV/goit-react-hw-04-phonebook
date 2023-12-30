import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import css from 'components/ContactForm/ContactForm.module.css';

export const ContactForm = ({ handleSubmitForm }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const onSubmitForm = evt => {
    evt.preventDefault();

    handleSubmitForm({
      id: nanoid(),
      name,
      number,
    });

    evt.target.reset();
  };

  return (
    <div>
      <form className={css.form} onSubmit={onSubmitForm}>
        <label>
          <span className={css.text}>Name</span>
          <input
            className={css.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleInputChange}
          />
        </label>
        <label>
          <span className={css.text}>Telefone</span>
          <input
            className={css.input}
            type="tel"
            name="number"
            pattern="\d{3}[\-]\d{2}[\-]\d{2}"
            title="Number may contain only numbers and dushes. For example 123-45-67"
            required
            onChange={handleInputChange}
          />
        </label>
        <button className={css.button} type="submit">
          Add contact
        </button>
      </form>
    </div>
  );
};
