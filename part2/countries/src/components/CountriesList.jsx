import React from 'react';
import Country from "./Country"
import CountryTeaser from './CountryTeaser';

const CountriesList = ({countries, handlerShowCountry}) => {
  return (
    <div className='countries-list'>
      {countries.length == 1 ? (
        <Country country={countries[0]} />
      ) : (
        countries.map(country => <CountryTeaser key={country.name.common} country={country} handlerShowCountry={handlerShowCountry} />)
      )}
    </div>
  );
};

export default CountriesList;