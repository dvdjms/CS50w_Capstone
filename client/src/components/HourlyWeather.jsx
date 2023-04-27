import styled from 'styled-components';


const HourlyWeather = (props) => {


      return (
            <HourlyContainer>
                  <Paragraph>24 hour forecast</Paragraph>
                  <UL>
                        {Array.from(props.oneDayData).map((oneDayData, index) => { 
                              return <List key={index}>
                                          <SpanHourly>{parseInt(oneDayData.time.substr(11, 4))}</SpanHourly>
                                          <WeatherIconHourly 
                                                alt={oneDayData.next_6_hours.summary.symbol_code} 
                                                src={`/weathericons/${oneDayData.next_1_hours.summary.symbol_code}.svg`}
                                                >
                                          </WeatherIconHourly>
                                          <SpanHourly>{parseInt(oneDayData.instant.details.air_temperature)}&deg;</SpanHourly>
                                    </List>
                        })} 
                  </UL>
            </HourlyContainer>
      )
}

const HourlyContainer = styled.section`
      height: 120px;
      padding-right: 9px;

`;

const Paragraph = styled.p`
      font-size: 12px;
      margin: 0px;
      padding: 0 0 2px 7px;
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

const List = styled.li`
      float: left;
      border: #ffef3c solid;
      border-radius: 10px;
      height: 78px;
      padding: 4px 0 0 0;
      width: 50px;
      text-align: center;
`;

const SpanHourly = styled.span`
      display: flex;
      font-size: 12px;
      height: 20px;
      justify-content: center;
      width: 100%;
`;

const WeatherIconHourly = styled.img`
      width: 30px;
`;


export default HourlyWeather;

