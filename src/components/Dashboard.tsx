import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Link,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { visuallyHidden } from "@mui/utils";
import { Link as RouterLink } from "react-router-dom";
import { useCountryData } from "@/hooks/useCountryData";
import { useTheme } from "@mui/material/styles";
import formatPopulation from "@/utils/functions/formatPopulation";
import FilterMenu from "./FilterMenu";
import { useState } from "react";
import useStyles from "@/utils/functions/useStyles";

const Dashboard = () => {
  const theme = useTheme();
  const classes = useStyles();
  const { country: countries, isLoading } = useCountryData();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [countriesToDisplay, setCountriesToDisplay] = useState(20);

  const handleSearchEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    <Box
      component="main"
      sx={{
        maxWidth: "90rem",
        width: "100%",
        margin: "0 auto",
        padding: { xs: "0 1rem", sm: "0 5rem" },
      }}
    >
      <Typography variant="h1" style={visuallyHidden}>
        Where in the world? Countries search
      </Typography>
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
          aria-label="Search for a country"
          placeholder="Search for a country..."
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchEvent}
          sx={{
            ...classes.textFieldStyle,
            width: "28.125rem",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon aria-hidden="true" focusable="false" />
              </InputAdornment>
            ),
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
        {isLoading ? (
          Array(countriesToDisplay)
            .fill(null)
            .map((_, index) => (
              <Grid item xs={12} sm={6} md={3} key={`placeholder-${index}`}>
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  sx={{
                    height: "27.5rem",
                    maxWidth: "22.0625rem",
                    width: "100%",
                  }}
                />
              </Grid>
            ))
        ) : (searchQuery
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
                  display: "flex",
                  height: "100%",
                  textDecoration: "none",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: theme.custom.secondaryColor,
                    borderRadius: ".0625rem",
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
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {data.name.common}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", gap: ".3125rem" }}>
                        <Typography
                          sx={{
                            fontWeight: "600",
                            fontSize: "1rem",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          Population:
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "1rem",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {formatPopulation(data.population)}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", gap: ".3125rem" }}>
                        <Typography
                          sx={{
                            fontWeight: "600",
                            fontSize: "1rem",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
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
              }}
              onClick={handleViewMoreCountries}
            >
              View More
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
