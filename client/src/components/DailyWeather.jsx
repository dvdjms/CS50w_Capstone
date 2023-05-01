import React, { useState } from 'react';
import styled from 'styled-components';
import { GetLocalDay } from '../components/helpers.js';


const DailyWeather = (props) => {
      const [activeDay, setActiveDay] = useState('day1')

      const oneDayData = props.oneDayData;
      // const tenDayData = props.TenDayData;
      const timezone = props.openWeather.timezone;

      const temperatureMax1 = parseInt(oneDayData.length > 0 ? oneDayData[0].instant.details.air_temperature : null);
      // const temperatureMin1 = parseInt(oneDayData.length > 0 ? oneDayData[0].next_6_hours.details.air_temperature_min : null);
      const temperatureMax2 = parseInt(oneDayData.length > 0 ? oneDayData[5].instant.details.air_temperature : null);
      const temperatureMax3 = parseInt(oneDayData.length > 0 ? oneDayData[11].instant.details.air_temperature : null);
      const temperatureMax4 = parseInt(oneDayData.length > 0 ? oneDayData[17].instant.details.air_temperature : null);
      const symbol = oneDayData.length > 0 ? oneDayData[0].next_1_hours.summary.symbol_code : null;
      const symbol1 = oneDayData.length > 0 ? oneDayData[5].next_1_hours.summary.symbol_code : null;
      const symbol2 = oneDayData.length > 0 ? oneDayData[11].next_1_hours.summary.symbol_code : null;
      const symbol3 = oneDayData.length > 0 ? oneDayData[17].next_1_hours.summary.symbol_code : null;
      const time1 = oneDayData.length > 0 ? oneDayData[5].time.substr(11, 5) : null;
      const time2 = oneDayData.length > 0 ? oneDayData[11].time.substr(11, 5) : null;
      const time3 = oneDayData.length > 0 ? oneDayData[17].time.substr(11, 5) : null;
      const day = oneDayData.length > 0 ? oneDayData[0].time : null;
 
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


                  {activeDay === 'day1' && <WeatherIconOuterContainer>
                        <WeatherIconInnerContainer>
                              <SpanTime>Now</SpanTime>
                              <WeatherIcon alt={symbol} src={`/weathericons/${symbol}.svg`}></WeatherIcon>
                              <Span>{temperatureMax1}&deg;</Span>
                        </WeatherIconInnerContainer>
                        <WeatherIconInnerContainer>
                        <SpanTime>{time1}</SpanTime>
                              <WeatherIcon alt={symbol1} src={`/weathericons/${symbol1}.svg`}></WeatherIcon>
                              <Span>{temperatureMax2}&deg;</Span>
                        </WeatherIconInnerContainer>
                        <WeatherIconInnerContainer>
                              <SpanTime>{time2}</SpanTime>
                              <WeatherIcon alt={symbol2} src={`/weathericons/${symbol2}.svg`}></WeatherIcon>
                              <Span>{temperatureMax3}&deg;</Span>
                        </WeatherIconInnerContainer>
                        <WeatherIconInnerContainer>
                              <SpanTime>{time3}</SpanTime>
                              <WeatherIcon alt={symbol3} src={`/weathericons/${symbol3}.svg`}></WeatherIcon>
                              <Span>{temperatureMax4}&deg;</Span>
                        </WeatherIconInnerContainer>
                  </WeatherIconOuterContainer>}

                  {activeDay === 'day2' && <div> weather day 2 </div>}
                  {activeDay === 'day3' && <div> weather day 3 </div>}
                  {activeDay === 'day4' && <div> weather day 4 </div>}
                  {activeDay === 'day5' && <div> weather day 5 </div>}
                  {activeDay === 'day6' && <div> weather day 6 </div>}
                  {activeDay === 'day7' && <div> weather day 7 </div>}
                  {activeDay === 'day8' && <div> weather day 8 </div>}
                  {activeDay === 'day9' && <div> weather day 9 </div>}
                  {activeDay === 'day10' && <div> weather day 10 </div>}
            </>
      )
}

const Paragraph = styled.p`
      font-size: 12px;
      margin: 0px;
      padding: 3px 0 3px 7px;
`;

const SpanTime = styled.span`
      float: left;
      font-size: 12px;
      text-align: center;
      width: 100%;
`;

const Span = styled.span`
      float: left;
      font-size: 12px;
      padding-top: 5px;
      text-align: center;
      width: 100%;
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
            width: 65%;
            margin: auto;
      }
      @media (max-width: 400px) {
            grid-template-columns: repeat(1, 1fr);
            grid-template-rows: auto;
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
`;

const WeatherIcon = styled.img`
      width: 55%;
      margin: 3px 0 0 20px;

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