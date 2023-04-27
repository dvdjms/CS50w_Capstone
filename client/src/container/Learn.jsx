import React, { useState, useEffect } from "react";
import styled from 'styled-components';

const Learn = () => {

      const [countryData, setCountryData] = useState([])

      const url = 'https://restcountries.com/v3.1/all';

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



      return (
            <>
            <H1>Flag-it</H1>
            <CountryContainer>
                  <GridBox >
                        {countryData.map((countryData) => {
                              if (countryData.unMember === true){
                                    return <ImageContainer key={countryData.flags.svg}><P>{countryData.name.common}</P><Img alt={countryData.flags.alt} src={countryData.flags.svg}></Img></ImageContainer>
                              }
                              return null
                        })}
                  </GridBox>
            </CountryContainer>
            </>
      )
}

const H1 = styled.h1`
      color: red;
      text-align: center;
      margin-bottom: 1%;
      margin-top: 100px;
`;

const CountryContainer = styled.div`
      margin: auto;
      margin-bottom: 50px;
      margin-top: 20px;
      width: 70vw;
      display: flex;
`;


const GridBox = styled.div`
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: auto;
      grid-gap: 5px;
      padding: 10px;
`;

const P = styled.p`
      border-radius: 3px;
      position: absolute;
      z-index: 2;
      background-color: white;
      margin: 3px;
      padding: 3px 7px 3px 7px;
      border: solid goldenrod;
      transition: opacity .5s ease-out;
      opacity: 0;

`;

const Img = styled.img`
      width: 100%;
      height: 100%;
      max-height: 130px;
      border: solid goldenrod;
      display: flex;
      position: relative;
      border-radius: 3px;
`;

const ImageContainer = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover ${P} {
            transition: opacity .5s ease-out;
            opacity: 1;
      }
      /* &:active ${Img} {
            border: solid goldenrod 2px;
      } */
`;


export default Learn;