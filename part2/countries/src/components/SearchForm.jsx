import React from 'react';

const SearchForm = ({handlerSearchForm, notification}) => {
  return (
    <div>
      <label htmlFor="search">Find counries:</label>
      <input id="search" type="text" onChange={handlerSearchForm}/>
      <div>{notification}</div>
    </div>
  );
};

export default SearchForm;