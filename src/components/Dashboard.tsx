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
import { useCountryData } from "@/hooks/useCountryData";
import { useTheme } from "@mui/material/styles";
import formatPopulation from "@/functions/formatPopulation";
import FilterMenu from "./FilterMenu";
import { useState } from "react";
import useStyles from "@/functions/useStyles";

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
    <Container maxWidth="lg">
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1.25rem",
          paddingTop: "1.25rem",
          paddingBottom: "1.25rem",
        }}
      >
        <TextField
          label="Search for country"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchEvent}
          sx={{
            ...classes.textFieldStyle,
            width: "28.125rem",
            boxShadow: theme.palette.boxShadow,
          }}
        />
        <FilterMenu setSelectedRegion={setSelectedRegion} />
      </Grid>
      <Grid
        container
        spacing={{ sm: 3, md: 3, lg: 4 }}
        sx={{
          "@media (max-width: 37.5rem)": {
            gap: "1.25rem",
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
                    borderRadius: ".0625rem",
                    boxShadow: theme.palette.boxShadow,
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
                      height: "14.5319rem",
                    }}
                  />

                  <Box p={3} sx={{ flex: "1 0 auto" }}>
                    <Stack spacing={1}>
                      <Box sx={{ textDecoration: "none" }}>
                        <Typography
                          sx={{
                            fontSize: "1.3125rem",
                            fontWeight: "600",
                            mt: "0",
                            mb: ".3125rem",
                            textDecoration: "none",
                          }}
                        >
                          {data.name.common}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", gap: ".3125rem" }}>
                        <Typography
                          sx={{ fontWeight: "600", fontSize: "1rem" }}
                        >
                          Population:
                        </Typography>
                        <Typography sx={{ fontSize: "1rem" }}>
                          {formatPopulation(data.population)}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", gap: ".3125rem" }}>
                        <Typography
                          sx={{ fontWeight: "600", fontSize: "1rem" }}
                        >
                          Region:
                        </Typography>
                        <Typography sx={{ fontSize: "1rem" }}>
                          {data.region}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", gap: ".3125rem" }}>
                        <Typography
                          sx={{ fontWeight: "600", fontSize: "1rem" }}
                        >
                          Capital:
                        </Typography>
                        <Typography sx={{ fontSize: "1rem" }}>
                          {data.capital}
                        </Typography>
                      </Box>
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
                height: "3.5rem",
                padding: "0 1.25rem",
                boxShadow: theme.palette.boxShadow,
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
