import styled from 'styled-components';
import React from 'react';
import HourlyWeather from './HourlyWeather';
import DailyWeather from './DailyWeather';
import TodayWeather from './TodayWeather';


const Weather = (props) => {

      const dateOptions = {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
      };

      const handleMyLocation = () => {
            favourites(() => {
                  props.handleFavourites();
            })
      };

      const favourites = (callback) => {
            const accessToken = localStorage.getItem('access_token');
            fetch('/api/favourites/', {
                  method: "POST",
                  headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                  },
                  body: JSON.stringify({
                        city_ascii: props.city,
                        latitude: props.latitude,
                        longitude: props.longitude,
                        timezone: props.openWeather.timezone,
                        cityid: props.cityid,
                  }),
            }).then(response => response.json())
            .then(data => {
                  callback();
            })
            .catch(err => console.error(err));
      };

      const isFavourite = ()=>  {
            if(Array.isArray(props.favouritesResults) && props.favouritesResults.find((favouritesResults => favouritesResults.cityid === props.cityid))) {
                  return 'Remove';
            }
            else {
                  return 'Add';
            }
      };

      return (
            <>
            <WeatherContainer>
                  <TitleContainer>
                        <H5>{props.city}&nbsp;&nbsp;</H5> 
                        <SpanAdmin>{props.admin_name.toUpperCase()},&nbsp;&nbsp;</SpanAdmin>
                        <SpanCountry>{props.country.toUpperCase()}</SpanCountry>
                  </TitleContainer>
                  <MyLocations onClick={handleMyLocation}>{isFavourite()}</MyLocations>
 
                  <TodayWeather 
                        oneDayData={props.oneDayData}
                        openWeather={props.openWeather}
                        latitude={props.latitude}
                        longitude={props.longitude}
                  ></TodayWeather>
                  
                  <DateContainer>
                        <h6>{props.localTime.toLocaleDateString("en-UK", dateOptions)}</h6>
                        <h6>{props.localTime.toLocaleTimeString()}</h6>
                  </DateContainer>

                  <HourlyWeather 
                        oneDayData={props.oneDayData}
                        openWeather={props.openWeather}
                  ></HourlyWeather>
                  <DailyWeather 
                        oneDayData={props.oneDayData}
                        tenDayData={props.tenDayData}
                        openWeather={props.openWeather}
                  ></DailyWeather>
            </WeatherContainer>
            </>
      )
}

const MyLocations = styled.button`
      border-radius: 5px;
      border: solid #fecb14;
      background-color: #f3db78;
      float: right;
      font-size: 12px;
      font-weight: 600;
      margin: 4px 10px 0 0;
      &:hover {
            cursor: pointer;
            border: solid #624f08 1px;
      }
      &:focus {
            cursor: pointer;
            border: solid #624f08 2px;
            outline: orange;
      }
`;

const TitleContainer = styled.div`
      float: left;
      height: 35px;
      margin: 0 0 5px 0;
      text-align: center;
      width: 85%;
      overflow-x: scroll;
      padding-left: 5px;
      position: relative;
`;

const H5 = styled.h5`
      height: 30px;
      float: left;
`;

const SpanAdmin = styled.span`
      height: 30px;
      float: left;
      font-size: 14px;
      font-style: italic;
      padding-top: 3px;
`;

const SpanCountry = styled.span`
      height: 30px;
      float: left;
      font-size: 14px;
      padding-top: 3px;
`;

const WeatherContainer = styled.div`
      background-color: #fcfcce;
      border: solid 2px goldenrod;
      border-radius: 10px;
      width: 500px;
      padding: 7px 0px 12px 7px;
      @media (max-width: 568px) {
            width: 350px;
      }
`;

const DateContainer = styled.div`
      display: flex;
      justify-content: space-between;
      padding: 20px 10px 7px 6px;
      overflow-x: scroll;
      width: 100%;
`;


export default Weather;



