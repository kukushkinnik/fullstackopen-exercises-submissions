import axios from "axios";
import React, { useEffect, useState } from "react";

const Country = ({ country }) => {
  const [currentWeather, setWeather] = useState([]);
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${country.capital}&limit=5&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        setLat(response.data[0].lat);
        setLng(response.data[0].lon);
      });
  });

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      )
      .then((response) => {
        const apiResponse = response.data;
        setWeather([apiResponse]);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  if (currentWeather.length > 0) {
    return (
      <>
        <div key={country.name}>
          <h1>{country.name}</h1>
          <p>capital {country.capital}</p>
          <p>area {country.area}</p>
          <h2>Languages:</h2>
          <ul>
            {country.languages.map((language) => (
              <li>{language.name}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt={`${country.name} flag`} />
          <h2>Weather in {country.capital}</h2>
          <p>temperature: {currentWeather[0].main.temp}° Celcius</p>
          <img
            src={`http://openweathermap.org/img/wn/${currentWeather[0].weather[0].icon}.png`}
            alt={currentWeather[0].weather[0].description}
          />
          <p>wind: {currentWeather[0].wind.speed} mph </p>
        </div>
      </>
    );
  }

  return (
    <div key={country.name}>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h2>Languages:</h2>
      <ul>
        {country.languages.map((language) => (
          <li>{language.name}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`${country.name} flag`} />
    </div>
  );
};

export default Country;
