import React from 'react';

const Total = ({parts}) => {
  let total = 0;

  parts.map((item) => {
    total = total + item.exercises
  })

  return (
    <p>
      <span>Number of exercises: </span>
      <span>{total}</span>
    </p>
  );
};

export default Total;