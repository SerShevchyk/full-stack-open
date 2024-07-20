import React from 'react';
import Person from './Person'

const Persons = ({personsViewList, handleDeleteContact}) => {
  return (
    <div className="persons">
      {personsViewList.map((person) => <Person key={person.id} person={person} handleDeleteContact={handleDeleteContact} />)}
    </div>
  );
};

export default Persons;