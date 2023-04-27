import styled from 'styled-components';


const DailyWeather = (props) => {


      const oneDayData = props.oneDayData;

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
      // oneDayData.time.substr(11, 5)}


      return (
            <>
                  <Paragraph>10 day forecast</Paragraph>
                  <DateContainer>
                        <UL>
                        <Day>Today</Day>
                        <Day>Tue</Day>
                              {/* {Array.from(tenDayData).map((tenDayData, index) => {
                                    return <List key={index}>
                                                <ChartContainer>
                                                      <WeatherChart><Data>{tenDayData.instant.details.temperature} &deg;C</Data><Span>Temperature</Span></WeatherChart>
                                                      {/* <WeatherChart><Data>{rain} mm</Data><Span>Rain</Span></WeatherChart>
                                                      <WeatherChart><Data>{summary}</Data><Span>Weather</Span></WeatherChart>
                                                      <WeatherChart><Data>{wind} m/s</Data><Span>Wind</Span></WeatherChart>
                                                      <WeatherChart><Data>{pressure} hPa</Data><Span>Pressure</Span></WeatherChart>
                                                      <WeatherChart><Data>{humidity} %</Data><Span>Humidity</Span></WeatherChart>
                                                 </ChartContainer>
                                           </List>
                              })}*/}
                        </UL> 
                  </DateContainer>

    
            <WeatherIconOuterContainer>
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
            </WeatherIconOuterContainer>
            </>
      )
}

const Paragraph = styled.p`
      font-size: 12px;
      margin: 0px;
      padding: 0 0 2px 7px;
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
      display: grid;
      gap: 10px;
      width: 100%;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: auto;
      justify-content: center;
      padding: 7px 14px 7px 7px;
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
      border: solid #e6a84a;
      border-radius: 10px;
      background: linear-gradient(15deg,#f8e09f 60%, #f3ebb8);
      height: 100%;
      padding: 5px;
      width: 100%;
`;

const WeatherIcon = styled.img`
      width: 75%;
      margin: 5px 0 0 10px;
`;


const DateContainer = styled.div`
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
      overflow-x: scroll;
      width: 100%;
`;

const Day = styled.li`
      border-radius: 10px 10px 0 0;
      border: solid 2px goldenrod;
      font-size: 11px;
      text-align: center;
      height: 30px;
      padding: 5px;
      min-width: 67px;
      &:hover{
            cursor: pointer;
    }
`;


const UL = styled.ul`
      list-style: none;
      padding: 0 0 0 5px;
      display: grid;
      grid-template-columns: repeat(24, 1fr);
      gap: 5px;
      overflow-x: scroll;
      ::-webkit-scrollbar {
            display: none;
      }
`;

export default DailyWeather;



