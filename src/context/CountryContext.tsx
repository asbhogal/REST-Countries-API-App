import { createContext, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

const CountryContext = createContext();

function CountryProvider({ children }: { children: React.ReactNode }) {
  const [country, getCountry] = useState([]);

  const { data, error, isLoading } = useSWR(
    "https://restcountries.com/v3.1/all",
    fetcher
  );

  useEffect(() => {
    if (data) {
      data.sort((a, b) => a.name.common.localeCompare(b.name.common));
      getCountry(data);
    }
  }, [data]);

  if (error)
    return <p>Error fetching data, please contact the website owner</p>;
  if (isLoading) return <p>Loading data...</p>;

  const regions = [...new Set(country.map((data) => data.region))];

  return (
    <CountryContext.Provider value={{ country, regions }}>
      {children}
    </CountryContext.Provider>
  );
}

export { CountryProvider, CountryContext };
