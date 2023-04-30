import styled from 'styled-components';
import React from 'react';
import moment from 'moment';
import { ConvertTime } from './helpers.js';


const MyLocations = (props) => {

      const time_now = String(moment.now());
      const timeNow = parseInt(time_now.slice(0,10));

      return (
            <>
            {props.favouritesResults < 1 ? <MyLocationsContainer><H4>My Locations</H4></MyLocationsContainer> :
            <MyLocationsContainer>
                  {Array.isArray(props.favouritesResults) && props.favouritesResults.map((favouritesResults, index) => { 
                  return <Location onClick={event => props.handleClick(favouritesResults.cityid)} key={index}>
                              <CityName o>{favouritesResults.city_ascii}</CityName>
                              <WeatherIcon alt={favouritesResults.symbol} src={`/weathericons/${favouritesResults.symbol}.svg`}></WeatherIcon>
                              <Temperature>{favouritesResults.temperature}&deg;</Temperature>
                              <Time>{ConvertTime(timeNow, favouritesResults.timezone)}</Time>
                        </Location>
                 })} 
            </MyLocationsContainer>
            }
            </>
      );
};


const CityName = styled.span`
      font-size: 12px;
      font-weight: 600;
      text-align: center;
      width: 100%;
      height: 20%;
      display: inline-block;
      overflow-x: scroll;
`;

const WeatherIcon = styled.img`
      float: left;
      height: 40%;
      width: 60%;
`;

const Temperature = styled.span`
      align-items: center;
      display: flex;
      float: right;
      font-size: 16px;
      font-weight: 600;
      height: 50%;
      justify-content: center;
      padding-bottom: 8px;
      width: 40%;
`;

const Time = styled.span`
      font-size: 12px;
      font-weight: 600;
      text-align: center;
      width: 100%;
      height: 20%;
      display: inline-block;
`;

const Location = styled.div`
      cursor: pointer;
      border: solid #e6a84a;
      border-radius: 10px;
      background: linear-gradient(15deg,#f8e09f 60%, #f3ebb8);
      float: left;
      height: 100px;
      padding: 3px;
      width: 97px;
      min-width: 90px;
`;

const MyLocationsContainer = styled.div`
      /* transform: {display: block};
      transition: transform 2s ease-in; */

      background-color: #fcceef;
      border: solid 2px goldenrod;
      border-radius: 10px;
      height: 115px;
      width: 1030px; // max-width ??
      overflow-x: auto;
      padding: 5px 5px 5px 5px;
      @media (max-width: 1020px) {
            width: 500px;
      }
      @media (max-width: 568px) {
            width: 350px;
      }
      display: flex;
      gap: 5px;
`;

const H4 = styled.h1`
      margin: auto;
      color: #f8bfe7;
      font-family: 'Lucida Sans', 'Lucida Sans Regular', Verdana, sans-serif;
      font-weight: 800;
`;


export default MyLocations;



