import { useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Block, MainTitle, Title } from './App.styled';

const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  function addContact(name, number) {
    const id = nanoid();
    const contactObj = { id, name, number };
    const newNormalizedName = name.toLowerCase();

    for (const contact of contacts) {
      const oldNormalizedName = contact.name.toLowerCase();
      if (oldNormalizedName === newNormalizedName) {
        alert(`${name} is already in contacts`);
        return;
      }
    }
    setContacts([contactObj, ...contacts]);
  }

  function deleteContact(id) {
    setContacts(contacts.filter(contact => contact.id !== id));
  }

  function changeFilter(e) {
    setFilter(e.currentTarget.value);
  }

  function getVisibleContacts() {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }

  return (
    <Block>
      <MainTitle>Phonebook</MainTitle>
      <ContactForm addContact={addContact} />
      <Title>Contacts</Title>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={getVisibleContacts()}
        onDeleteContact={deleteContact}
      />
    </Block>
  );
};

export default App;
