import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import Wiki from "../components/Wiki";
import Weather from '../components/Weather';
import Search from '../components/Search';
import MyLocations from '../components/MyLocations';
import { favouritesWeather, GetLocalTime } from '../components/helpers.js';


const Home = () => {
      const [searchData, setSearchData] = useState([]);
      const [searchValue, setSearchValue] = useState('');
      const [latitude, setLatitude] = useState(55.953251);
      const [longitude, setLongitude] = useState(-3.188267);
      const [citySearch, setCitySearch] = useState('Edinburgh');
      const [cityWeather, setCityWeather] = useState('Edinburgh');
      const [adminNameWeather, setAdminNameWeather] = useState('EDINBURGH, CITY OF');
      const [cityIdWeather, setCityIdWeather] = useState(1826492520);
      const [countryWeather, setCountryWeather] = useState('United Kingdom');
      const [favourites, setFavourites] = useState({});
      const [oneDayData, setOneDayData] = useState({});
      const [tenDayData, setTenDayData] = useState({});
      const [openWeather, setOpenWeather] = useState({});
      const [date, setDate] = useState(new Date());
      const searchBox = useRef();

      const localTime = GetLocalTime(date, openWeather.timezone);
      const accessToken = localStorage.getItem('access_token')

      // get all city information
      useEffect(() => {
            const url = `http://localhost:8000/api/cities/${searchValue}`;
            fetch(url)
            .then(repsonse => repsonse.json())
            .then(data => {
                  setSearchData(data);
                  if(!data.length){
                        setCitySearch('');
                  }
                  else {
                        setCitySearch(data[0].city_ascii);
                  }
            })
            .catch(err => console.error(err));
      },[searchValue]);

      const handleSearchValue = (search) => {
            setSearchValue(search);
      };

      const handleKeyDown = (event) => {
            if (event.keyCode === 13) {
                  setCityWeather(citySearch)
                  setLatitude(searchData[0].lat);
                  setLongitude(searchData[0].lng);
                  setAdminNameWeather(searchData[0].admin_name);
                  setCountryWeather(searchData[0].country);
                  setCityIdWeather(searchData[0].cityid);
                  searchBox.current.value = "";
            }
      };

      const findCity = (id) => {
            const cityObject = searchData.find(searchData => searchData.cityid === (id));
            return cityObject;
      };

      
      const handleClickFromSearch = (city_id) => {   
            const CityObject = findCity(city_id);
            setCityWeather(CityObject.city);
            setLatitude(CityObject.lat);
            setLongitude(CityObject.lng);
            setAdminNameWeather(CityObject.admin_name);
            setCityIdWeather(CityObject.cityid);
            setCountryWeather(CityObject.country);
            searchBox.current.value = "";
      };


      const handleClickFromFavourites = (city_id) => {   
            const url = `http://localhost:8000/api/cities/${city_id}`;
            fetch(url)
            .then(repsonse => repsonse.json())
            .then(data => {
                  setCityWeather(data[0].city);
                  setLatitude(data[0].lat);
                  setLongitude(data[0].lng);
                  setAdminNameWeather(data[0].admin_name);
                  setCityIdWeather(data[0].cityid);
                  setCountryWeather(data[0].country);
            })
            .catch(err => console.error(err));
      };

      // get all weather information
      useEffect(() => {
            const fetchData = () => {
                  fetch('/weather', {
                        method: "POST",
                        headers: {
                              'Accept': 'application/json', 
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                              latitude: latitude,
                              longitude: longitude,
                        }),
                        credentials: 'include',
                  })
                  .then(response => response.json())
                  .then(data => {
                        setOneDayData(data.oneDay.twentyfourData);
                        setTenDayData(data.tenDay.tenDayData);
                        setOpenWeather(data.openWeather.openWeather);
                  }).catch(err => console.error(err));
            }
            fetchData();

            const timer = setInterval(() => setDate(new Date()), 1000);
            return function cleanup() {
                  clearInterval(timer);
            }
      },[latitude, longitude]);

      // get all favourites for current user
      useEffect(() => {
            handleFavourites();
            // eslint-disable-next-line
      },[]);

      // Get weather for all favourites  
      const handleFavourites = () => {
            fetch('/api/favourites/', {
                  headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                  },
            }).then(response => response.json())
            .then(data =>
                  {                           
                        const getFavourites = data.map(async (data) => {
                              const coord = [
                                    data.lat, 
                                    data.lng, 
                                    data.city_ascii, 
                                    data.timezone,
                                    data.cityid 
                              ];
                              return favouritesWeather(coord[0], coord[1], coord[2], coord[3], coord[4])
                              .then(cityData => {
                                    return cityData;
                              })
                              .catch(err => console.error(err));
                        });
                        Promise.all(getFavourites)
                              .then(result => {
                                    setFavourites(result);
                              })
                        }
            ).catch(err => console.error(err));
      };

      return (
            <>
            <DashboardContainer>
                  <ContainerMyLocations>
                        <MyLocations
                              openWeather={openWeather}
                              oneDayData={oneDayData}
                              date={date}
                              favouritesResults={favourites}
                              handleClick={handleClickFromFavourites}
                              >
                        </MyLocations>
                  </ContainerMyLocations>
                  <ContainerSearch>
                        <Search 
                              handleSearchValue={handleSearchValue}
                              handleKeyDown={handleKeyDown}
                              handleClick={handleClickFromSearch} 
                              searchData={searchData}
                              searchBox={searchBox}>
                        </Search>
                  </ContainerSearch>
                  <ContainerWeather>
                        <Weather
                              latitude={latitude}
                              longitude={longitude}
                              city={cityWeather}
                              admin_name={adminNameWeather}
                              country={countryWeather}
                              cityid={cityIdWeather}
                              tenDayData={tenDayData}
                              oneDayData={oneDayData}
                              openWeather={openWeather}
                              localTime={localTime}
                              date={date}
                              handleFavourites={handleFavourites}
                              favouritesResults={favourites}
                              >
                        </Weather>
                  </ContainerWeather>
                  <ContainerWiki>
                        <Wiki></Wiki>
                  </ContainerWiki>
            </DashboardContainer>
            <Footer>*Cities data from simplemaps.com/data/world-cities **Weather data from api.met.no and openweather.com</Footer>
            </>
      );
};


const DashboardContainer = styled.div`
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(3, 1fr);
      grid-template-rows: auto;
      gap: 1.8vw;
      justify-content: center;
      align-content: center;
      justify-items: center;
      margin: auto;
      margin-top: 100px;
      width: 75vw;
      @media (max-width: 1020px) {
            grid-template-columns: repeat(1, 1fr);
      }
`;

const ContainerMyLocations = styled.div`
      grid-row-start: span  1 / 2;
      grid-column-start: 2 span;
      @media (max-width: 1020px) {
            grid-column: 1 / 1;
      }
`;

const ContainerSearch = styled.div`
      grid-row-start: span 1;
      grid-column: 1 / 2;
      @media (max-width: 1020px) {
            grid-column: 1 / 1;
      }
`;

const ContainerWiki = styled.div`
      grid-row-start: span 2;
      grid-column: 1 / 1;
      @media (max-width: 1020px) {
            grid-column: 1 / 1;
      }
`;

const ContainerWeather = styled.div`
      grid-row-start: span 2;
      grid-column: 2 / 2;
      @media (max-width: 1020px) {
            grid-column: 1 / 1;
      }
`;

const Footer = styled.footer`
      text-align: center; 
      font-size: 9px; 
      padding: 50px 0 15px 0;
      margin: auto;
      width: 1000px;
      @media (max-width: 1020px) {
            width: 500px;
      }
      @media (max-width: 568px) {
            width: 350px;
      }
`;


export default Home;
