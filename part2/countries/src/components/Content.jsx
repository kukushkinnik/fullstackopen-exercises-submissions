import React, { useState } from "react";
import Country from "./Country";

const Content = ({ countries }) => {
  const [showCountry, setShowCountry] = useState(false);
  const [currCountry, setCurrCountry] = useState([]);

  if (countries.length > 10) {
    return <p>Please make more specific selection</p>;
  }

  if (countries.length > 2 && countries.length < 10) {
    return (
      <>
        {showCountry && <Country country={currCountry} />}
        {countries.map((resul) => (
          <div key={resul.name}>
            <p>{resul.name}</p>
            <button
              onClick={() => {
                setShowCountry(true);
                setCurrCountry(resul);
              }}
            >
              show
            </button>
          </div>
        ))}
      </>
    );
  }

  if (countries.length === 1) {
    return <Country country={countries[0]} />;
  }
};

export default Content;
