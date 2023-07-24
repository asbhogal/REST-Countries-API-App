import {
 Box,
 Button,
 Container,
 Grid,
 Stack,
 Typography,
 useMediaQuery,
} from "@mui/material";
import { useParams, Link as RouterLink } from "react-router-dom";
import { useCountryData } from "../hooks/useCountryData";
import Header from "../components/Header";

const CountryInfo = () => {
 const { name } = useParams();
 const countryData = useCountryData().find((data) => data.name.common === name);

 const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

 const {
  name: { official: countryName } = {},
  capital,
  currencies,
  languages,
  population,
  region,
  subregion,
  tld,
 } = countryData || {};

 const currenciesList = currencies ? Object.values(currencies)[0].name : "";
 const languagesList = languages ? Object.values(languages).join(", ") : "";

 if (!countryData) {
  return <h1>No Country Info Found</h1>;
 }
 return (
  <>
   <Header />
   <Container maxWidth="900px">
    <Button variant="contained" component={RouterLink} to="/">
     Back
    </Button>
    <Grid container spacing={{ xs: 1, md: 2 }} columns={16}>
     <Grid item xs={isSmallScreen ? 16 : 8} md={8}>
      <img
       src={countryData.flags.png}
       alt={`${countryData.name.common} flag`}
      />
     </Grid>
     <Grid item xs={16} md={8}>
      <Typography variant="h2">{countryName}</Typography>
      <Box>
       <Stack>
        <Typography>Native Name: TBA</Typography>
        <Typography>Population: {population}</Typography>
        <Typography>Region: {region}</Typography>
        <Typography>Sub Region:{subregion}</Typography>
        <Typography>Capital: {capital}</Typography>
       </Stack>
      </Box>
      <Box>
       <Stack>
        <Typography>Top Level Domain: {tld}</Typography>
        <Typography>Currencies: {currenciesList}</Typography>
        <Typography>Languages: {languagesList}</Typography>
       </Stack>
      </Box>
     </Grid>
    </Grid>
   </Container>
  </>
 );
};

export default CountryInfo;
