import React from 'react';
import Part from './Part';

const Content = ({parts}) => {
  return (
    <div className='content'>
      {parts.map((item, i) => <Part key = {i} item = {item} />)}
    </div>
  );
};

export default Content;