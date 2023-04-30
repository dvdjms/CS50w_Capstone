// converts UNIX GMT to UTC timezone of choice returning '00:00:00' format
const ConvertTime = (time, timezone) => {
      const current_time = new Date(time * 1000);
      const localOffset = current_time.getTimezoneOffset() * 60;
      const timestamp = current_time.getTime() / 1000 + localOffset + timezone;
      const localTime = new Date(timestamp * 1000);
      const Time = localTime.toLocaleTimeString("en-GB");
      return Time;
};


// converts UTC GMT to UTC timezone of choice returning full UTC format
const GetLocalTime = (date, timezone) => {
      const localOffset = date.getTimezoneOffset() * 60;
      const timestamp = date.getTime() / 1000 + localOffset + timezone;
      const localTime = new Date(timestamp * 1000);
      return localTime; 
};


// converts UTC GMT to timezone of choice returning '00' hour format
const GetLocalHours = (UTCTime, timezone) => {
      const date = new Date(UTCTime);
      const unixTime = Math.round(date.getTime() / 1000)
      const localHour = ConvertTime(unixTime, timezone).slice(0, 2)
      return localHour;
};


// converts string to day of the week as per timezone returning 'Sat' format
const GetLocalDay = (stringDate, timezone) => {
      const objectDate = new Date(stringDate);
      const localTime = GetLocalTime(objectDate, timezone);
      const dayOfWeek = localTime.toLocaleString('en-GB', { weekday: 'short' });
      return dayOfWeek;
};


const ConvertTemperature = (unit, temperature) => {
      if (unit === 'celcius') {
            const result = (temperature * 9 / 5) + 32;
            return result;
      }
      else {
            const result = (temperature - 32) / 9 * 5;
            return result;
      }
};


// get weather for My Locations
const favouritesWeather = async (latitude, longitude, city_ascii, timezone, cityid) => {
      try {
            const response = await fetch('/weather', {
                  method: "POST",
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                        latitude: latitude,
                        longitude: longitude,
                  }),
                  credentials: 'include',
            });
            const data = await response.json();
            const finalFavouritesObject = {
                  'city_ascii': city_ascii,
                  'timezone': timezone,
                  'temperature': parseInt(data.oneDay.twentyfourData[0].instant.details.air_temperature),
                  'symbol': data.oneDay.twentyfourData[0].next_1_hours.summary.symbol_code,
                  'cityid': cityid
            };
            return finalFavouritesObject;
      } catch (err) {
            return console.error(err);
      }
}


export { ConvertTime, ConvertTemperature, favouritesWeather, GetLocalTime, GetLocalHours, GetLocalDay};

