import axios from "axios";
import React, { useEffect, useState } from "react";
import Content from "./components/Content";
import Filter from "./components/Filter";

function App() {
  const [filter, setFilter] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v2/all`)
      .then((response) => setAllCountries(response.data));
  }, []);

  const handleChange = (e) => {
    setFilter(e.target.value);
    const regex = new RegExp(filter, "i");
    const filteredResult = allCountries.filter((resu) =>
      resu.name.match(regex)
    );
    setFilteredCountries(filteredResult);
  };

  return (
    <div className="App">
      <p>find countries</p>
      <Filter filter={filter} handleChange={handleChange} />
      <Content
        countries={filteredCountries}
        setFilteredCountries={setFilteredCountries}
      />
    </div>
  );
}
export default App;
