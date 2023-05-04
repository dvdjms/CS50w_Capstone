import styled from 'styled-components';
import { GetLocalHours } from '../components/helpers.js';


const HourlyWeather = (props) => {


      return (
            <HourlyContainer>
                  <Paragraph>24 hour forecast</Paragraph>
                  <UL>
                        {Array.from(props.oneDayData).map((oneDayData, index) => { 
                              return <List key={index}>
                                          <SpanHourly>{GetLocalHours(oneDayData.time, props.openWeather.timezone)}</SpanHourly>
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
      padding-right: 2px;
      margin-right: 7px;
      border-top: #faf1cf solid;
      border-bottom: #faf1cf solid;
`;

const Paragraph = styled.p`
      font-size: 12px;
      margin: 0px;
      padding: 3px 0 3px 7px;
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
      background: linear-gradient(15deg,#f7f8c3 80%, #fffbab);
      float: left;
      border: #e6a84a solid;
      border-radius: 10px;
      box-shadow: 1px 1px #9c9c9c;
      height: 78px;
      padding: 4px 0 0 0;
      margin-bottom: 1px;
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
