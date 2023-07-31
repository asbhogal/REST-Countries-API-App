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
import useStyles from "../functions/useStyles";

const CountryInfo = () => {
  const classes = useStyles();
  const { name } = useParams();
  const countryData = useCountryData().find(
    (data) => data.name.common === name
  );

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const {
    name: { official: countryName } = {},
    borders,
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

  const borderCountries = borders || [];

  if (!countryData) {
    return <h1>No Country Info Found</h1>;
  }
  return (
    <>
      <Header />
      <Container
        sx={{ display: "flex", flexDirection: "column", maxWidth: "1195px" }}
      >
        <Button
          variant="contained"
          component={RouterLink}
          to="/"
          sx={{
            ...classes.buttonStyle,
            width: "min-content",
            margin: "20px 0",
          }}
        >
          Back
        </Button>
        <Grid container spacing={{ xs: 1, md: 2 }}>
          <Grid item xs={12} md={isSmallScreen ? 12 : 6}>
            <img
              src={countryData.flags.png}
              alt={countryData.flags.alt}
              style={{
                width: "100%",
                height: isSmallScreen ? "100%" : "390px",
                objectFit: "cover",
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={isSmallScreen ? 12 : 6}
            sx={{ justifyContent: "space-between" }}
          >
            <Box
              sx={{
                padding: isSmallScreen ? "10px" : "0",
              }}
            >
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
              <Stack direction={isSmallScreen ? "column" : "row"} spacing={1}>
                Border Countries:
                {borderCountries.map((border) => (
                  <Button
                    key={border}
                    component={RouterLink}
                    to={`/country/${encodeURIComponent(border)}`}
                    variant="contained"
                    sx={{
                      ...classes.buttonStyle,
                      width: "min-content",
                    }}
                  >
                    {border}
                  </Button>
                ))}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CountryInfo;
