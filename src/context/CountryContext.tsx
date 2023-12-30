import { createContext, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { Countries, Country } from "@/utils/types/country";

const CountryContext = createContext<{ country: Countries; regions: string[] }>(
  { country: [], regions: [] }
);

function CountryProvider({ children }: { children: React.ReactNode }) {
  const [country, getCountry] = useState<Countries>([]);

  const { data, error, isLoading } = useSWR<Countries>(
    "https://restcountries.com/v3.1/all",
    fetcher
  );

  useEffect(() => {
    if (data) {
      data.sort((a: Country, b: Country) =>
        a.name.common.localeCompare(b.name.common)
      );
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
