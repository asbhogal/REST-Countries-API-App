import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useCountryData } from "../hooks/useCountryData";

const CountryInfo = () => {
  const { name } = useParams();
  const countryData = useCountryData().find(
    (data) => data.name.common === name
  );

  if (!countryData) {
    return <h1>No Country Info Found</h1>;
  }
  return (
    <>
      <Button></Button>
      <div>
        <h1>{countryData.name.common}</h1>
      </div>
    </>
  );
};

export default CountryInfo;
