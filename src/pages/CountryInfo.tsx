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
import { useTheme } from "@mui/material/styles";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import { useCountryData } from "@/hooks/useCountryData";
import formatPopulation from "@/functions/formatPopulation";
import Header from "@/components/Header";
import useStyles from "@/functions/useStyles";

const CountryInfo = () => {
  const theme = useTheme();
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
    return countryWithAltSpelling ? countryWithAltSpelling.name.common : "N/A";
  };

  const handleBorderButtonClick = (border) => {
    const countryName = findCountryByAltSpelling(border);

    if (countryName != "N/A") {
      handleNavigate(countryName);
    } else {
      console.log(`Border country '${border}' not found.`);
    }
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
        sx={{ display: "flex", flexDirection: "column", maxWidth: "62.5rem" }}
      >
        <Button
          component={RouterLink}
          to="/"
          sx={{
            ...classes.buttonStyle,
            boxShadow: theme.palette.boxShadow,

            width: "min-content",
            margin: { xs: "1.25rem 0", sm: "1.25rem 0", md: "4.6875rem 0" },
            gap: ".3125rem",
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
            gap: { xs: 1, md: 2, lg: "3.125rem" },
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
                height: isSmallScreen ? "100%" : "24.375rem",
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
                padding: isSmallScreen ? ".625rem" : "0",
              }}
            >
              <Typography
                sx={{ fontSize: "1.5rem", fontWeight: "600", mb: ".9375rem" }}
              >
                {countryName}
              </Typography>
              <Grid container sx={{ gap: { xs: 1, md: 2, lg: "3.125rem" } }}>
                <Box>
                  <Stack gap={0.5}>
                    <Box sx={{ display: "flex", gap: ".3125rem" }}>
                      <Typography sx={{ fontWeight: "600" }}>
                        Native Name:
                      </Typography>
                      <Typography>
                        {getOfficialNativeName(countryData)}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: ".3125rem" }}>
                      <Typography sx={{ fontWeight: "600" }}>
                        Population:
                      </Typography>
                      <Typography>{formatPopulation(population)}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: ".3125rem" }}>
                      <Typography sx={{ fontWeight: "600" }}>
                        Region:
                      </Typography>
                      <Typography>{region}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: ".3125rem" }}>
                      <Typography sx={{ fontWeight: "600" }}>
                        Sub Region:
                      </Typography>
                      <Typography>{subregion}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: ".3125rem" }}>
                      <Typography sx={{ fontWeight: "600" }}>
                        Capital:
                      </Typography>
                      <Typography>{capital}</Typography>
                    </Box>
                  </Stack>
                </Box>
                <Box>
                  <Stack gap={0.5}>
                    <Box sx={{ display: "flex", gap: ".3125rem" }}>
                      <Typography sx={{ fontWeight: "600" }}>
                        Top Level Domain:
                      </Typography>
                      <Typography>{tld}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: ".3125rem" }}>
                      <Typography sx={{ fontWeight: "600" }}>
                        Currencies:
                      </Typography>
                      <Typography>{currenciesList}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: ".3125rem" }}>
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
                  gap: ".3125rem",
                  mt: "2.5rem",
                }}
              >
                Border Countries:
                {borderCountries.map((border) => (
                  <Button
                    key={border}
                    sx={{
                      ...classes.buttonStyle,
                      boxShadow: theme.palette.boxShadow,
                    }}
                    onClick={() => handleBorderButtonClick(border)}
                  >
                    {findCountryByAltSpelling(border)}
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
