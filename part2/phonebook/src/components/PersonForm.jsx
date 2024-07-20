import React from 'react';

const PersonForm = ({hundleFormSubmit, handleNewNameChange, handleNewNumberChange, person}) => {
  return (
    <form onSubmit={hundleFormSubmit}>
    <div>
      Name: <input onChange={handleNewNameChange} value={person.name} />
    </div>
    <div>
      Number: <input onChange={handleNewNumberChange} value={person.number} />
    </div>
    <div>
      <button type="submit">Add</button>
    </div>
  </form>
  );
};

export default PersonForm;