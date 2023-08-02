import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();
  const countries = useCountryData();

  const getOfficialNativeName = (countryData) => {
    if (countryData.name && countryData.name.nativeName) {
      const firstNativeNameKey = Object.keys(countryData.name.nativeName)[0];
      const firstNativeNameObject =
        countryData.name.nativeName[firstNativeNameKey];
      return firstNativeNameObject.official || "N/A";
    }

    return "N/A";
  };

  const findCountryByAltSpelling = (borderValue) => {
    const countryWithAltSpelling = countries.find(
      (data) => data.cca3 && data.cca3 === borderValue
    );
    return countryWithAltSpelling;
  };

  const handleBorderButtonClick = (border) => {
    const countryWithAltSpelling = findCountryByAltSpelling(border);
    countryWithAltSpelling
      ? handleNavigate(countryWithAltSpelling.name.common)
      : console.log(`Border country '${border}' not found.`);
  };

  const handleNavigate = (countryName) => {
    navigate(`/country/${countryName}`);
  };

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));

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
        sx={{ display: "flex", flexDirection: "column", maxWidth: "1000px" }}
      >
        <Button
          component={RouterLink}
          to="/"
          sx={{
            ...classes.buttonStyle,
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.50)",

            width: "min-content",
            margin: { xs: "20px 0", sm: "20px 0", md: "75px 0" },
            gap: "5px",
          }}
        >
          <KeyboardBackspaceIcon />
          Back
        </Button>
        <Grid
          container
          spacing={{ xs: 1, md: 2 }}
          alignItems="center"
          sx={{
            gap: { xs: 1, md: 2, lg: "50px" },
            flexWrap: isMediumScreen ? "nowrap" : "wrap",
          }}
        >
          <Grid item xs={12} md={isSmallScreen ? 12 : 6}>
            <img
              src={countryData.flags.png}
              alt={
                countryData.flags.alt ||
                `The flag of ${countryData.name.common}`
              }
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
              <Typography
                sx={{ fontSize: "24px", fontWeight: "600", mb: "15px" }}
              >
                {countryName}
              </Typography>
              <Grid container sx={{ gap: { xs: 1, md: 2, lg: "50px" } }}>
                <Box>
                  <Stack gap={0.5}>
                    <Box sx={{ display: "flex", gap: "5px" }}>
                      <Typography sx={{ fontWeight: "600" }}>
                        Native Name:
                      </Typography>
                      <Typography>
                        {getOfficialNativeName(countryData)}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: "5px" }}>
                      <Typography sx={{ fontWeight: "600" }}>
                        Population:
                      </Typography>
                      <Typography>{formatPopulation(population)}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: "5px" }}>
                      <Typography sx={{ fontWeight: "600" }}>
                        Region:
                      </Typography>
                      <Typography>{region}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: "5px" }}>
                      <Typography sx={{ fontWeight: "600" }}>
                        Sub Region:
                      </Typography>
                      <Typography>{subregion}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: "5px" }}>
                      <Typography sx={{ fontWeight: "600" }}>
                        Capital:
                      </Typography>
                      <Typography>{capital}</Typography>
                    </Box>
                  </Stack>
                </Box>
                <Box>
                  <Stack gap={0.5}>
                    <Box sx={{ display: "flex", gap: "5px" }}>
                      <Typography sx={{ fontWeight: "600" }}>
                        Top Level Domain:
                      </Typography>
                      <Typography>{tld}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: "5px" }}>
                      <Typography sx={{ fontWeight: "600" }}>
                        Currencies:
                      </Typography>
                      <Typography>{currenciesList}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: "5px" }}>
                      <Typography sx={{ fontWeight: "600" }}>
                        Languages:
                      </Typography>
                      <Typography>{languagesList}</Typography>
                    </Box>
                  </Stack>
                </Box>
              </Grid>
              <Box
                direction={isSmallScreen ? "column" : "row"}
                spacing={1}
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "5px",
                  mt: "40px",
                }}
              >
                Border Countries:
                {borderCountries.map((border) => (
                  <Button
                    key={border}
                    sx={{
                      ...classes.buttonStyle,
                      boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.50)",
                    }}
                    onClick={() => handleBorderButtonClick(border)}
                  >
                    {border}
                  </Button>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CountryInfo;
