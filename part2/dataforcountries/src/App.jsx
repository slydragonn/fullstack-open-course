import { useEffect, useState } from "react";

const CountryView = ({ country }) => {
  const objectToArray = (object) => {
    const array = [];
    for (const [key, value] of Object.entries(object)) {
      array.push({ key, value });
    }
    return array;
  };

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital[0]}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {objectToArray(country.languages).map((el) => (
          <li key={el.key}>{el.value}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  );
};

const Filter = ({ countries, showOneCountry }) => {
  if (countries.length === 0) return null;
  else if (countries.length > 10) {
    return <p>Too many matches. specify another filter</p>;
  } else if (countries.length < 10 && countries.length > 1) {
    return countries.map((country) => (
      <div key={country.name.common}>
        <p>{country.name.common}</p>
        <button onClick={() => showOneCountry(country.name.common)}>
          show
        </button>
      </div>
    ));
  } else {
    return <CountryView country={countries[0]} />;
  }
};

function App() {
  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    fetch("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      });
  }, []);

  useEffect(() => {
    const searchedCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(countryName.toLowerCase()),
    );
    console.log(searchedCountries);

    setFilteredCountries(searchedCountries);
  }, [countryName, countries]);

  return (
    <>
      <div>
        <label htmlFor="find">find countries</label>
        <input
          id="find"
          value={countryName}
          onChange={(event) => setCountryName(event.target.value)}
        />
      </div>
      <div>
        <Filter countries={filteredCountries} showOneCountry={setCountryName} />
      </div>
    </>
  );
}

export default App;
