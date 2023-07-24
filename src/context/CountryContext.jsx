import { createContext, useEffect, useState } from "react";
import axios from "axios";

const CountryContext = createContext();

const client = axios.create({
  baseURL: "https://restcountries.com/v3.1/all",
});

function CountryProvider({ children }) {
  const [country, getCountry] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await client.get();
        response.data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        getCountry(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const regions = [...new Set(country.map((data) => data.region))];

  return (
    <CountryContext.Provider value={{ country, regions }}>
      {children}
    </CountryContext.Provider>
  );
}

export { CountryProvider, CountryContext };
