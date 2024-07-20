import React from 'react';

const Total = ({parts}) => {

  let total = parts.reduce((sum, item) => sum + item.exercises, 0)

  return (
    <p>
      <b>Total of {total} exercises</b>
    </p>
  );
};

export default Total;