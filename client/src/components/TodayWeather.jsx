import styled from 'styled-components';
import React, { useRef } from 'react';
import { ConvertTime } from './helpers.js';

const TodayWeather = (props) => {
      const expand = useRef();

      const oneDayData = props.oneDayData;
      const openWeather = props.openWeather;
      const tempNow = oneDayData.length > 0 ? parseInt(oneDayData[0].instant.details.air_temperature) : null;
      const feelsLike = openWeather?.main?.feels_like? parseInt(openWeather.main.feels_like -273.15) : null;
      const temperatureMax = openWeather?.main?.temp_max? parseInt(openWeather.main.temp_max -273.15) : null;
      const temperatureMin = openWeather?.main?.temp_min? parseInt(openWeather.main.temp_min -273.15) : null;
      const windSpeed = openWeather?.main?.temp_min? openWeather.wind.speed: null;
      const pressure = openWeather?.main?.pressure? openWeather.main.pressure: null;
      const humidity = openWeather?.main?.humidity? openWeather.main.humidity: null;
      const sunrise = openWeather?.sys?.sunrise? openWeather.sys.sunrise: null;
      const sunset = openWeather?.sys?.sunset? openWeather.sys.sunset: null;
      const visibility = openWeather?.visibility? openWeather.visibility: null;
      const symbol = oneDayData.length > 0 ? oneDayData[0].next_1_hours.summary.symbol_code : null;

      const sunriseTime = ConvertTime(sunrise, openWeather.timezone);
      const sunsetTime = ConvertTime(sunset, openWeather.timezone);

      const handleOnClick = () => {
            if (expand.current.style.width === '60%'){
                  expand.current.style.width = "0";
                  expand.current.style.opacity = "0";
            } else {
                  expand.current.style.width = "60%";
                  expand.current.style.opacity = ".95";
            }
      }

      return (
            <>
            <TodayContainer>
                  <TodayInnerContainer>
                  <WeatherIcon alt={symbol} src={`/weathericons/${symbol}.svg`}></WeatherIcon>
                  <TodayMax>{tempNow}&deg;</TodayMax>
                  <TodayFeelsLike>Feels like {feelsLike}&deg;</TodayFeelsLike>
                  </TodayInnerContainer>
                  <TodayDetails onClick={handleOnClick} ref={expand}>
                        <WeatherChart><Span1>Maximum</Span1> <Data>{temperatureMax}&deg;c</Data></WeatherChart>
                        {/* <WeatherChart><Span1>Rain</Span1> <Data>{rain}mm</Data></WeatherChart> */}
                        <WeatherChart><Span1>Minimum</Span1> <Data>{temperatureMin}&deg;c</Data></WeatherChart>
                        <WeatherChart><Span1>Wind Speed</Span1> <Data>{windSpeed}m/s</Data></WeatherChart>
                        <WeatherChart><Span1>Pressure</Span1> <Data>{pressure}hPa</Data></WeatherChart>
                        <WeatherChart><Span1>Humidity</Span1> <Data>{humidity}%</Data></WeatherChart>
                        <WeatherChart><Span1>Visibility</Span1> <Data>{visibility}</Data></WeatherChart>
                        <WeatherChart><Span1>Sunrise</Span1> <Data>{sunriseTime}</Data></WeatherChart>
                        <WeatherChart><Span1>Sunset</Span1> <Data>{sunsetTime}</Data></WeatherChart>
                        <WeatherChart><Span1>Latitude</Span1> <Data>{props.latitude}</Data></WeatherChart>
                        <WeatherChart><Span1>Longitude</Span1> <Data>{props.longitude}</Data></WeatherChart>
                  </TodayDetails>
                  <Ellipsis onClick={handleOnClick}></Ellipsis>
            </TodayContainer>
            </>
      )
}

const Ellipsis = styled.div`
      margin-top: 10%;
      float: right;
      width: 20px;
      height: 40px;
      background-image: radial-gradient(circle, #99902b 5px, transparent 5px);
      background-size: 100% 33.33%;
      opacity: 0.5;
      &:hover {
            background-image: radial-gradient(circle, #99902b 5px, transparent 6.3px);
            cursor: pointer;
      }
`;

const WeatherChart = styled.div`
      transition: all .5s ease;
`;

const Data = styled.span`
      font-size: 12px;
      font-weight: 800;
`;

const Span1 = styled.span`
      font-size: 12px;
`;

const TodayInnerContainer = styled.div`
      background: linear-gradient(15deg,#feffd3 60%, #faf8c8);
      box-shadow: 1px 1px 1.5px 1.5px #9d9f83;
      border-radius: 15px;
      height: 140px;
      margin: 5px 15px 5px 25px;
      width: 80%;
      border: 1px solid #e6a84a;
      float: left;
      @media (max-width: 568px) {
            height: 130px;
            font-size: 12px;
      }
`

const WeatherIcon = styled.img`
      width: 30%;
      margin: 10px 38px 0 15px;
      float: left;
      text-align: right;
      z-index: 3;
`;

const TodayMax = styled.div`
      float: left;
      font-size: 42px;
      padding-top: 32px;
      text-align: right;
      width: 15%;
`;

const TodayFeelsLike = styled.div`
      float: left;
      font-size: 18px;
      padding-top: 59px;
      padding-left: 10px;
      text-align: left;
      width: 35%;
      @media (max-width: 568px) {
            width: 30%;
            font-size: 12px;
      }
`;

const TodayDetails = styled.div`
      background-color: #99902b;
      border-radius: 5px 0 0 5px;;
      color: white;
      height: 163px;
      padding: 10px;
      position: absolute;
      right: 0;
      opacity: .95;
      text-align: left;
      transition: all .5s ease;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
      grid-template-rows: repeat(auto-fit, minmax(30px, 1fr));
      opacity: 0;
      width: 0;
      overflow-y: auto;
      @media (max-width: 568px) {
            /* height: 15vh; */
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            grid-template-rows: repeat(10, auto);
            ::-webkit-scrollbar {
                  display: none;
            }
      }
`;

const TodayContainer = styled.div`
      padding: 5px 0px 5px 5px;
      width: 100%;
      position: relative;
      margin-top: 25px;
      z-index: 1;
`;


export default TodayWeather;
