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
import formatPopulation from "../functions/formatPopulation";
import Header from "../components/Header";

const CountryInfo = () => {
  const { name } = useParams();
  const countryData = useCountryData().find(
    (data) => data.name.common === name
  );

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
      <Container
        maxWidth="900px"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Button
          variant="contained"
          component={RouterLink}
          to="/"
          sx={{ width: "min-content" }}
        >
          Back
        </Button>
        <Grid container spacing={{ xs: 1, md: 2 }} columns={16}>
          <Grid item xs={isSmallScreen ? 16 : 8} md={8}>
            <img
              src={countryData.flags.png}
              alt={countryData.flags.alt}
              style={{
                width: isSmallScreen ? "100%" : "auto",
                height: isSmallScreen ? "100%" : "390px",
                objectFit: "cover",
              }}
            />
          </Grid>
          <Grid item xs={16} md={8}>
            <Typography sx={{ fontSize: "24px", fontWeight: "600" }}>
              {countryName}
            </Typography>
            <Grid container>
              <Box>
                <Stack>
                  <Typography>Native Name: TBA</Typography>
                  <Typography>
                    Population: {formatPopulation(population)}
                  </Typography>
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
        </Grid>
      </Container>
    </>
  );
};

export default CountryInfo;
