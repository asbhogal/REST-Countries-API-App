import { createContext, useState } from "react";
import { request } from "graphql-request";
import useSWR from "swr";

const CountryContext = createContext();

const fetcher = (query) => request("/api/all", query);

function CountryProvider({ children }: { children: React.ReactNode }) {
  const [country, getCountry] = useState([]);

  const { data, error, isLoading } = useSWR(
    `{
    name {
      common
      official
      nativeName {
        eng {
          official
          common
        }
      }
    }
    cca2
    ccn3
    cca3
    currencies {
      name
      symbol
    },
    capital
    altSpellings
    region
    subregion
    languages {
      eng
    }
    flag
    population
    flags {
      png
      svg
    }
  }`,
    fetcher
  );

  if (error)
    return <p>Error fetching data, please contact the website owner</p>;
  if (isLoading) return <p>Loading data...</p>;

  data.sort((a, b) => a.name.common.localeCompare(b.name.common));
  getCountry(data);

  const regions = [...new Set(country.map((data) => data.region))];

  return (
    <CountryContext.Provider value={{ country, regions }}>
      {children}
    </CountryContext.Provider>
  );
}

export { CountryProvider, CountryContext };
