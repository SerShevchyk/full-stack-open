import React from 'react';

const Button = ({action, text, attr}) => {
  return (
    <button onClick={action} {...attr} >{text}</button>
  );
};

export default Button;