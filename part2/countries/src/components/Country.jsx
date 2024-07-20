import React from 'react';
import Weather from './Weather';

const Country = ({country}) => {

  let languages = Object.values(country.languages)

  return (
    <div>
      <h1>{country.name.official}</h1>
      <div className='info'>
        <div className="capital">Capital: {country.capital}</div>
        <div className="area">Area: {country.area}</div>
        <div className="flag">
          <img src={country.flags.svg} alt={country.flags.alt} width="200" height="100"/>
        </div>
        <div className="languages">
          <h3>Languages:</h3>
          {languages.map((lang) =>  <div key={lang}>{lang}</div>)}
        </div>
        <Weather country={country}/>
      </div>
    </div>
  );
};

export default Country;