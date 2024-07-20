import React from 'react';

const Part = ({item}) => {
  return (
    <p key={item.key}>{item.name} {item.exercises}</p>
  );
};

export default Part;