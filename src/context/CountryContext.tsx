import { createContext, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

const CountryContext = createContext<{ country: Countries; regions: string[] }>(
  { country: [], regions: [] }
);

interface Country {
  name: Name;
  tld: string;
  cca2: string;
  ccn3: string;
  cca3: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: Currency;
  idd: Idd;
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: {
    [key: string]: string;
  };
  translations: Translation;
  latlng: number[];
  landlocked: boolean;
  area: number;
  denonyms: Denonym;
  flag: [key: string];
  maps: Maps;
  population: number;
  car: Car;
  timezones: string[];
  continents: string[];
  flags: Flags;
  coatOfArms: CoatOfArms;
  startOfWeek: string;
  capitalInfo: CapitalInfo;
  postalCode: PostalCode;
}

interface Name {
  common: string;
  official: string;
  nativeName: {
    [key: string]: {
      official: string;
      common: string;
    };
  };
}

interface Currency {
  [key: string]: {
    name: string;
    symbol: string;
  };
}

interface Idd {
  root: string;
  suffixes: string[];
}

interface Translation {
  [key: string]: {
    official: string;
    common: string;
  };
}

interface Denonym {
  [key: string]: {
    f: string;
    m: string;
  };
}

interface Maps {
  googleMaps: string;
  openStreetMaps: string;
}

interface Car {
  signs: string[];
  side: string;
}

interface Flags {
  png: string;
  svg: string;
  alt: string;
}

interface CoatOfArms {
  png: string;
  svg: string;
}

interface CapitalInfo {
  latlng: number[];
}

interface PostalCode {
  format: string;
  regex: string;
}

type Countries = Country[];

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
