import React from 'react';
import Button from './Button';

const CountryTeaser = ({country, handlerShowCountry}) => {
  return (
    <div>{country.name.official} <Button action={handlerShowCountry} text="Show" attr={{"target-country":country.name.official}} /></div>
  );
};

export default CountryTeaser;