import styled from 'styled-components';
import React, { useState, useEffect } from 'react';


const Country = () => {
      const [countryData, setCountryData] = useState([])

      const country = 'france'

      const url = `https://restcountries.com/v3.1/name/${country}`;

      useEffect(() => {
            dataLoad(url);
      },[url]);

      const dataLoad = url => {
            fetch(url)
            .then(response => response.json())
            .then(data => {
                  setCountryData(data)
            }).catch(err => console.error(err))
      };


      return(
            <>
            {countryData.map((countryData) => {
                  return  <CountryContainer key={countryData}>
                              <h6 >Country component</h6>
                              <h4>{countryData.name.common}</h4>
                              <h6>Official: {countryData.name.official}</h6>
                              <img alt={countryData.flags.alt} style={{width: "25px"}} src={countryData.flags.svg}></img>
                              <div>Capital: {countryData.capital}</div>
                              <div>Language: {countryData.languages.fra}</div>
                              <div>Population: {countryData.population}</div>
                              <div>Currency: {countryData.currencies[0]}</div>
                        </CountryContainer>
            })}
            </>
      )
}

const CountryContainer = styled.div`
      background-color: lightcyan;
      border: solid 2px goldenrod;
      border-radius: 10px;
      width: 500px;
      padding: 7px;
      @media (max-width: 568px) {
            width: 350px;
      }
`;



export default Country;



