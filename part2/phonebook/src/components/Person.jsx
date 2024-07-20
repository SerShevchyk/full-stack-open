import React from 'react';
import Button from './Button';


const Person = ({person, handleDeleteContact}) => {
  return (
    <div>
      {person.name} 
      {person.number}
      <Button action={handleDeleteContact} text="Delete" attr={{"id" : person.id}} /> 
    </div>
  );
};

export default Person;