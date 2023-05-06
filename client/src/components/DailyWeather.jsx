import React, { useState } from 'react';
import styled from 'styled-components';
import { GetLocalDay, ConvertStringTimezone } from '../components/helpers.js';


const DailyWeather = (props) => {
      const [activeDay, setActiveDay] = useState('day1')

      const oneDayData = props.oneDayData;
      const tenDayData = props.tenDayData;
      const timezone = props.openWeather.timezone;

      // get first 24 hour data
      const temperatureMax1 = parseInt(oneDayData.length > 0 ? oneDayData[0].instant.details?.air_temperature: null);
      const temperatureMax2 = parseInt(oneDayData.length > 0 ? oneDayData[5].next_6_hours?.details?.air_temperature_max : null);
      const temperatureMax3 = parseInt(oneDayData.length > 0 ? oneDayData[11].next_6_hours?.details?.air_temperature_max : null);
      const temperatureMax4 = parseInt(oneDayData.length > 0 ? oneDayData[17].next_6_hours?.details?.air_temperature_max : null);
      const temperatureMin1 = parseInt(oneDayData.length > 0 ? oneDayData[0].next_6_hours?.details?.air_temperature_min : null);
      const temperatureMin2 = parseInt(oneDayData.length > 0 ? oneDayData[5].next_6_hours?.details?.air_temperature_min : null);
      const temperatureMin3 = parseInt(oneDayData.length > 0 ? oneDayData[11].next_6_hours?.details?.air_temperature_min : null);
      const temperatureMin4 = parseInt(oneDayData.length > 0 ? oneDayData[17].next_6_hours?.details?.air_temperature_min : null);
      const symbol = oneDayData.length > 0 ? oneDayData[0].next_1_hours?.summary?.symbol_code : null;
      const symbol1 = oneDayData.length > 0 ? oneDayData[5].next_6_hours?.summary?.symbol_code : null;
      const symbol2 = oneDayData.length > 0 ? oneDayData[11].next_6_hours?.summary?.symbol_code : null;
      const symbol3 = oneDayData.length > 0 ? oneDayData[17].next_6_hours?.summary?.symbol_code : null;
      const time_1 = oneDayData.length > 0 ? oneDayData[0].time : null;
      const time1 = ConvertStringTimezone(time_1, timezone).substr(16, 5);
      const time_2 = oneDayData.length > 0 ? oneDayData[5].time : null;
      const time2 = ConvertStringTimezone(time_2, timezone).substr(16, 5);
      const time_3 = oneDayData.length > 0 ? oneDayData[11].time : null;
      const time3 = ConvertStringTimezone(time_3, timezone).substr(16, 5);
      const time_4 = oneDayData.length > 0 ? oneDayData[17].time : null;
      const time4 = ConvertStringTimezone(time_4, timezone).substr(16, 5);
      const day = oneDayData.length > 0 ? oneDayData[0].time : null;
 
      // function to change day when clicked on
      const handleDayClick = (day) => {
            const activeElement = document.getElementById(activeDay);
            const newElement = document.getElementById(day);
            if (activeElement) {
                  activeElement.style.backgroundColor = '#edecd4';
                  activeElement.style.borderBottom = '1px solid #e6a84a';
            }
            if (newElement) {
                  newElement.style.borderBottom = 'none';
                  newElement.style.backgroundColor = '#fcfcce';
            }
            setActiveDay(day);
      };

      // create new object with specific data
      const summaryForecast = (sixHourly) => {
            const newSixHourlyArray = [];
            const sixHourlyObject = sixHourly.map((tenDay) => {
                  const time = tenDay.time ?? null;
                  const newTime = ConvertStringTimezone(time, timezone);
                  const weatherObject = {
                        'tempMax': parseInt(tenDay.next_6_hours?.details?.air_temperature_max ?? null),
                        'tempMin': parseInt(tenDay.next_6_hours?.details?.air_temperature_min ?? null),
                        'windspeed': tenDay.instant?.details.wind_speed ?? null,
                        'precipitation': tenDay.next_6_hours?.details?.precipitation_amount ?? null,
                        'symbol': tenDay.next_6_hours?.summary?.symbol_code ?? null,
                        'time': newTime.substr(16, 5),
                  };
                  newSixHourlyArray.push(weatherObject);
                  return newSixHourlyArray;
            });
            return sixHourlyObject;
      };
   
      // pass tenDayData through summaryForecast function
      const tempList = [];
      const getTenDayForecast = () => {
            if(Array.isArray(tenDayData)) {
                  for (let i = 0; i < tenDayData.length; i++){
                        tempList.push(summaryForecast(tenDayData[i]));
                      
                  };
                  return tempList;
            }
            else {
                  return;
            };
      };
      const finalGroupObject = getTenDayForecast();

      return (
            <>
                  <Paragraph>10 day forecast</Paragraph>

                  <DaysOuterContainer>
                        <DaysInnerContainer>
                              <Day1 id="day1" className={activeDay === 'day1' ? 'active': ''} onClick={() => handleDayClick('day1')}>
                                    Today</Day1>
                              <Day id="day2" className={activeDay === 'day2' ? 'active': ''} onClick={() => handleDayClick('day2')}>
                                    {GetLocalDay(day, timezone + 86400)}</Day>
                              <Day id="day3" className={activeDay === 'day3' ? 'active': ''} onClick={() => handleDayClick('day3')}>
                                    {GetLocalDay(day, timezone + 172800)}</Day>
                              <Day id="day4" className={activeDay === 'day4' ? 'active': ''} onClick={() => handleDayClick('day4')}>
                                    {GetLocalDay(day, timezone + 259200)}</Day>
                              <Day id="day5" className={activeDay === 'day5' ? 'active': ''} onClick={() => handleDayClick('day5')}>
                                    {GetLocalDay(day, timezone + 345600)}</Day>
                              <Day id="day6" className={activeDay === 'day6' ? 'active': ''} onClick={() => handleDayClick('day6')}>
                                    {GetLocalDay(day, timezone + 432000)}</Day>
                              <Day id="day7" className={activeDay === 'day7' ? 'active': ''} onClick={() => handleDayClick('day7')}>
                                    {GetLocalDay(day, timezone + 518400)}</Day>
                              <Day id="day8" className={activeDay === 'day8' ? 'active': ''} onClick={() => handleDayClick('day8')}>
                                    {GetLocalDay(day, timezone + 604800)}</Day>
                              <Day id="day9" className={activeDay === 'day9' ? 'active': ''} onClick={() => handleDayClick('day9')}>
                                    {GetLocalDay(day, timezone + 691200)}</Day>
                              <Day id="day10" className={activeDay === 'day10' ? 'active': ''} onClick={() => handleDayClick('day10')}>
                                    {GetLocalDay(day, timezone + 777600)}</Day>
                        </DaysInnerContainer>
                  </DaysOuterContainer>


                  {activeDay === 'day1' && 
                        <WeatherIconOuterContainer>
                              <WeatherIconInnerContainer>
                                    <SpanTime>{time1}</SpanTime>
                                    <WeatherIcon alt={symbol} src={`/weathericons/${symbol}.svg`}></WeatherIcon>
                                    <SpanTempMax>{temperatureMax1}&deg;</SpanTempMax>
                                    <SpanTempMin>{temperatureMin1}&deg;</SpanTempMin>
                              </WeatherIconInnerContainer>
                              <WeatherIconInnerContainer>
                              <SpanTime>{time2}</SpanTime>
                                    <WeatherIcon alt={symbol1} src={`/weathericons/${symbol1}.svg`}></WeatherIcon>
                                    <SpanTempMax>{temperatureMax2}&deg;</SpanTempMax>
                                    <SpanTempMin>{temperatureMin2}&deg;</SpanTempMin>
                              </WeatherIconInnerContainer>
                              <WeatherIconInnerContainer>
                                    <SpanTime>{time3}</SpanTime>
                                    <WeatherIcon alt={symbol2} src={`/weathericons/${symbol2}.svg`}></WeatherIcon>
                                    <SpanTempMax>{temperatureMax3}&deg;</SpanTempMax>
                                    <SpanTempMin>{temperatureMin3}&deg;</SpanTempMin>
                              </WeatherIconInnerContainer>
                              <WeatherIconInnerContainer>
                                    <SpanTime>{time4}</SpanTime>
                                    <WeatherIcon alt={symbol3} src={`/weathericons/${symbol3}.svg`}></WeatherIcon>
                                    <SpanTempMax>{temperatureMax4}&deg;</SpanTempMax>
                                    <SpanTempMin>{temperatureMin4}&deg;</SpanTempMin>
                              </WeatherIconInnerContainer>
                        </WeatherIconOuterContainer>
                  }

                  {activeDay === 'day2' && 
                        <WeatherIconOuterContainer>
                              {Array.isArray(finalGroupObject[1][1]) && finalGroupObject[1][1].length > 0 && finalGroupObject[1][1].map((object, index) => {
                                    return ( 
                                          <WeatherIconInnerContainer key={index}>
                                                <SpanTime>{object.time}</SpanTime>
                                                <WeatherIcon alt={object.symbol} src={`/weathericons/${object.symbol}.svg`}></WeatherIcon>
                                                <SpanTempMax>{object.tempMax}&deg;</SpanTempMax>
                                                <SpanTempMin>{object.tempMin}&deg;</SpanTempMin>
                                          </WeatherIconInnerContainer>
                                          )
                              })}
                        </WeatherIconOuterContainer>
                  }
   
                  {activeDay === 'day3' &&                         
                        <WeatherIconOuterContainer>
                              {Array.isArray(finalGroupObject[2][1]) && finalGroupObject[2][1].length > 0 && finalGroupObject[2][1].map((object, index) => {
                                    return ( 
                                          <WeatherIconInnerContainer key={index}>
                                                <SpanTime>{object.time}</SpanTime>
                                                <WeatherIcon alt={object.symbol} src={`/weathericons/${object.symbol}.svg`}></WeatherIcon>
                                                <SpanTempMax>{object.tempMax}&deg;</SpanTempMax>
                                                <SpanTempMin>{object.tempMin}&deg;</SpanTempMin>
                                          </WeatherIconInnerContainer>
                                          )
                              })}
                        </WeatherIconOuterContainer>}

                  {activeDay === 'day4' && 
                        <WeatherIconOuterContainer>
                              {Array.isArray(finalGroupObject[3][1]) && finalGroupObject[3][1].length > 0 && finalGroupObject[3][1].map((object, index) => {
                                    return ( 
                                          <WeatherIconInnerContainer key={index}>
                                                <SpanTime>{object.time}</SpanTime>
                                                <WeatherIcon alt={object.symbol} src={`/weathericons/${object.symbol}.svg`}></WeatherIcon>
                                                <SpanTempMax>{object.tempMax}&deg;</SpanTempMax>
                                                <SpanTempMin>{object.tempMin}&deg;</SpanTempMin>
                                          </WeatherIconInnerContainer>
                                          )
                              })}
                        </WeatherIconOuterContainer>}

                  {activeDay === 'day5' && 
                        <WeatherIconOuterContainer>
                              {Array.isArray(finalGroupObject[4][1]) && finalGroupObject[4][1].length > 0 && finalGroupObject[4][1].map((object, index) => {
                                    return ( 
                                          <WeatherIconInnerContainer key={index}>
                                                <SpanTime>{object.time}</SpanTime>
                                                <WeatherIcon alt={object.symbol} src={`/weathericons/${object.symbol}.svg`}></WeatherIcon>
                                                <SpanTempMax>{object.tempMax}&deg;</SpanTempMax>
                                                <SpanTempMin>{object.tempMin}&deg;</SpanTempMin>
                                          </WeatherIconInnerContainer>
                                          )
                              })}
                        </WeatherIconOuterContainer>}

                  {activeDay === 'day6' && 
                        <WeatherIconOuterContainer>
                              {Array.isArray(finalGroupObject[5][1]) && finalGroupObject[5][1].length > 0 && finalGroupObject[5][1].map((object, index) => {
                                    return ( 
                                          <WeatherIconInnerContainer key={index}>
                                                <SpanTime>{object.time}</SpanTime>
                                                <WeatherIcon alt={object.symbol} src={`/weathericons/${object.symbol}.svg`}></WeatherIcon>
                                                <SpanTempMax>{object.tempMax}&deg;</SpanTempMax>
                                                <SpanTempMin>{object.tempMin}&deg;</SpanTempMin>
                                          </WeatherIconInnerContainer>
                                          )
                              })}
                        </WeatherIconOuterContainer>}

                  {activeDay === 'day7' && 
                        <WeatherIconOuterContainer>
                              {Array.isArray(finalGroupObject[6][1]) && finalGroupObject[6][1].length > 0 && finalGroupObject[6][1].map((object, index) => {
                                    return ( 
                                          <WeatherIconInnerContainer key={index}>
                                                <SpanTime>{object.time}</SpanTime>
                                                <WeatherIcon alt={object.symbol} src={`/weathericons/${object.symbol}.svg`}></WeatherIcon>
                                                <SpanTempMax>{object.tempMax}&deg;</SpanTempMax>
                                                <SpanTempMin>{object.tempMin}&deg;</SpanTempMin>
                                          </WeatherIconInnerContainer>
                                          )
                              })}
                        </WeatherIconOuterContainer>}

                  {activeDay === 'day8' && 
                        <WeatherIconOuterContainer>
                              {Array.isArray(finalGroupObject[7][1]) && finalGroupObject[7][1].length > 0 && finalGroupObject[7][1].map((object, index) => {
                                    return ( 
                                          <WeatherIconInnerContainer key={index}>
                                                <SpanTime>{object.time}</SpanTime>
                                                <WeatherIcon alt={object.symbol} src={`/weathericons/${object.symbol}.svg`}></WeatherIcon>
                                                <SpanTempMax>{object.tempMax}&deg;</SpanTempMax>
                                                <SpanTempMin>{object.tempMin}&deg;</SpanTempMin>
                                          </WeatherIconInnerContainer>
                                          )
                              })}
                        </WeatherIconOuterContainer>}

                  {activeDay === 'day9' && 
                        <WeatherIconOuterContainer>
                              {Array.isArray(finalGroupObject[8][1]) && finalGroupObject[8][1].length > 0 && finalGroupObject[8][1].map((object, index) => {
                                    return ( 
                                          <WeatherIconInnerContainer key={index}>
                                                <SpanTime>{object.time}</SpanTime>
                                                <WeatherIcon alt={object.symbol} src={`/weathericons/${object.symbol}.svg`}></WeatherIcon>
                                                <SpanTempMax>{object.tempMax}&deg;</SpanTempMax>
                                                <SpanTempMin>{object.tempMin}&deg;</SpanTempMin>
                                          </WeatherIconInnerContainer>
                                          )
                              })}
                        </WeatherIconOuterContainer>}

                  {activeDay === 'day10' && 
                        <WeatherIconOuterContainer>
                              {Array.isArray(finalGroupObject[9][1]) && finalGroupObject[9][1].length > 0 && finalGroupObject[9][1].map((object, index) => {
                                    return ( 
                                          <WeatherIconInnerContainer key={index}>
                                                <SpanTime>{object.time}</SpanTime>
                                                <WeatherIcon alt={object.symbol} src={`/weathericons/${object.symbol}.svg`}></WeatherIcon>
                                                <SpanTempMax>{object.tempMax}&deg;</SpanTempMax>
                                                <SpanTempMin>{object.tempMin}&deg;</SpanTempMin>
                                          </WeatherIconInnerContainer>
                                          )
                              })}
                        </WeatherIconOuterContainer>}
            </>
      );
};

const Paragraph = styled.p`
      font-size: 12px;
      height: 20px;
      margin: 0px;
      padding: 0 0 6px 7px;
`;

const SpanTime = styled.span`
      float: left;
      font-size: 12px;
      text-align: center;
      width: 100%;
`;

const SpanTempMax = styled.span`
      float: left;
      font-size: 12px;
      font-weight: 600;
      height: 23px;
      padding-top: 3px;
      text-align: right;
      width: 50%;
`;

const SpanTempMin = styled(SpanTempMax)`
      font-size: 10px;
      text-align: left;
      padding-left: 5px;
      padding-top: 5.2px;
`;

const WeatherIconOuterContainer = styled.div`
      background-color:#fcfcce;
      border-right: 1px solid #e6a84a;
      border-bottom: 1px solid #e6a84a;
      border-left: 1px solid #e6a84a;
      border-radius: 0 0 10px 10px;
      box-shadow: 1px 1px gray;
      min-height: 140px;
      display: grid;
      margin: 0px 10px 0px 5px;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: auto;
      padding: 14px 7px 3px 12px;
      @media (max-width: 568px) {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: auto;
            width: 95.3%;
            min-height: 300px;
      }
`;

const WeatherIconInnerContainer = styled.div`
      list-style: none;
      border: 1px solid #e6a84a;
      border-radius: 10px;
      background: linear-gradient(15deg,#f8e09f 60%, #f3ebb8);
      box-shadow: 1px 1px gray;
      height: 90%;
      padding: 5px;
      width: 95%;
      @media (max-width: 568px) {
            padding: 3px;
      }
`;

const WeatherIcon = styled.img`
      width: 55%;
      margin: 3px 0 0 20px;
      @media (max-width: 568px) {
            width: 40%;
            margin: 3px 0 0 38px;
      }
`;

const Day = styled.li`
      background-color:#edecd4;
      border-radius: 10px 10px 0 0;
      border: 1px solid goldenrod;
      font-size: 11px;
      text-align: center;
      height: 30px;
      padding: 5px;
      min-width: 67px;
      &:hover{
            cursor: pointer;
      }
`;

const Day1 = styled(Day)`
      background-color: #fcfcce;
      border-bottom: 0px;
`;

const DaysOuterContainer = styled.div`
      display: flex;
      margin: 0px 9px 0 5px;
`;

const DaysInnerContainer = styled.ul`
      list-style: none;
      float: left;
      padding: 0 0 0 4px;
      margin: 0;
      display: flex;
      overflow-x: scroll;
      ::-webkit-scrollbar {
            display: none;
      }
      scroll-snap-type: inline mandatory;
      ${Day} {
            scroll-snap-align: start;
      }
`;


export default DailyWeather;