import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useCountryData } from "../hooks/useCountryData";
import { useTheme } from "@mui/material/styles";
import formatPopulation from "../functions/formatPopulation";
import FilterMenu from "./FilterMenu";
import { useState } from "react";
import useStyles from "../functions/useStyles";

const Dashboard = () => {
  const theme = useTheme();
  const classes = useStyles();
  const countries = useCountryData();
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [countriesToDisplay, setCountriesToDisplay] = useState(20);

  const handleSearchEvent = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleViewMoreCountries = () => {
    setCountriesToDisplay((prevCount) => prevCount + 20);
  };

  const filteredRegion = selectedRegion
    ? countries.filter((country) => country.region === selectedRegion)
    : countries;

  const filteredCountries = searchQuery
    ? filteredRegion.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <Container maxWidth="900px">
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <TextField
          label="Search for country"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchEvent}
          sx={{
            ...classes.textFieldStyle,
            width: "450px",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.50)",
          }}
        />
        <FilterMenu setSelectedRegion={setSelectedRegion} />
      </Grid>
      <Grid
        container
        spacing={{ sm: 2, md: 3, lg: 10 }}
        sx={{
          "@media (max-width: 600px)": {
            gap: "20px",
          },
        }}
      >
        {(searchQuery
          ? filteredCountries.slice(0, countriesToDisplay)
          : filteredRegion.slice(0, countriesToDisplay)
        ).length > 0 ? (
          (searchQuery
            ? filteredCountries.slice(0, countriesToDisplay)
            : filteredRegion.slice(0, countriesToDisplay)
          ).map((data) => (
            <Grid item xs={12} sm={6} md={3} key={data.name.common}>
              <Link
                component={RouterLink}
                to={`/country/${data.name.common}`}
                color="text.primary"
                sx={{
                  textDecoration: "none",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    backgroundColor: theme.palette.secondaryColor,
                    borderRadius: "1px",
                    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.50)",
                  }}
                >
                  <img
                    src={data.flags.png}
                    alt={data.flags.alt || `The flag of ${data.name.common}`}
                    style={{
                      display: "flex",
                      flex: "1 0 50%",
                      objectFit: "cover",
                      width: "100%",
                      height: "232.51px",
                    }}
                  />

                  <Box p={3} sx={{ flex: "1 0 auto" }}>
                    <Stack spacing={1}>
                      <Box sx={{ textDecoration: "none" }}>
                        <Typography
                          sx={{
                            fontSize: "21px",
                            fontWeight: "600",
                            mt: "0",
                            mb: "5px",
                            textDecoration: "none",
                          }}
                        >
                          {data.name.common}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body"
                        sx={{
                          fontSize: "14px",
                          fontWeight: "600",
                          mt: "0",
                          mb: "0",
                        }}
                      >
                        Population: {formatPopulation(data.population)}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "600",
                          mt: "0",
                          mb: "0",
                        }}
                      >
                        Region: {data.region}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "600",
                          mt: "0",
                          mb: "0",
                        }}
                      >
                        Capital: {data.capital}
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
              </Link>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h5">No country found</Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <Button
              sx={{
                ...classes.buttonStyle,
                height: "56px",
                padding: "0 20px",
                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.50)",
              }}
              onClick={handleViewMoreCountries}
            >
              View More
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
