import { createContext, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/functions/fetcher";
import { Countries, Country } from "@/utils/types/country";

const CountryContext = createContext<{
  country: Countries;
  regions: string[];
  isLoading: boolean;
}>({ country: [], regions: [], isLoading: true });

function CountryProvider({ children }: { children: React.ReactNode }) {
  const [country, getCountry] = useState<Countries>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data, error } = useSWR<Countries>(
    "https://restcountries.com/v3.1/all",
    fetcher
  );

  useEffect(() => {
    if (data) {
      data.sort((a: Country, b: Country) =>
        a.name.common.localeCompare(b.name.common)
      );
      getCountry(data);
      setIsLoading(false);
    }
  }, [data]);

  if (error)
    return <p>Error fetching data, please contact the website owner</p>;

  const regions = [...new Set(country.map((data) => data.region))];

  return (
    <CountryContext.Provider value={{ country, regions, isLoading }}>
      {children}
    </CountryContext.Provider>
  );
}

export { CountryProvider, CountryContext };
