import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  LabelName,
  LabelNumber,
  Text,
  Input,
  Button,
  Span,
} from './ContactForm.styled';

const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  function handleChange(e) {
    const inputName = e.currentTarget.name;

    switch (inputName) {
      case 'name':
        setName(e.currentTarget.value);
        break;

      case 'number':
        setNumber(e.currentTarget.value);
        break;

      default:
        throw new Error('No input with that name');
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    addContact(name, number);
    setName('');
    setNumber('');
  }

  return (
    <Form onSubmit={handleSubmit}>
      <LabelName>
        <Text>Name</Text>
        <Input
          type="text"
          name="name"
          required
          value={name}
          onChange={handleChange}
        />
      </LabelName>
      <LabelNumber>
        <Text>Number</Text>
        <Input
          type="tel"
          name="number"
          required
          value={number}
          onChange={handleChange}
        />
      </LabelNumber>
      <Button type="submit">
        Add contact<Span></Span>
      </Button>
    </Form>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};
