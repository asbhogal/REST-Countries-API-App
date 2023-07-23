import { Button } from "@mui/material";
import { useParams } from "react-router-dom";

const CountryInfo = ({ country }) => {
  const { name } = useParams();
  const countryData = country.find((data) => data.name.common === name);

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
