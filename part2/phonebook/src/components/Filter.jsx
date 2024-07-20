import React from 'react';

const Filter = ({handleAction, label}) => {
  return (
    <div className="search">
      Search: <input onChange={handleAction} />
    </div>
  );
};

export default Filter;