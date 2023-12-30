import { useContext } from "react";
import { CountryContext } from "@/context/CountryContext";

export function useCountryData() {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error("useCountryData must be used within a CountryProvider");
  }
  return context.country;
}
