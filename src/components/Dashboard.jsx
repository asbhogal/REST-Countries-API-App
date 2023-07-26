import {
  Box,
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

/* const Link = (props) => {
  return (
    <MuiLink underline="none" {...props}>
      {props.children}
    </MuiLink>
  );
}; */

const Dashboard = () => {
  const theme = useTheme();
  const countries = useCountryData();
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchEvent = (event) => {
    setSearchQuery(event.target.value);
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
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <TextField
          label="Search for country"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchEvent}
          sx={{ width: "450px" }}
        />
        <FilterMenu setSelectedRegion={setSelectedRegion} />
      </Grid>
      <Grid container spacing={{ sm: 1, md: 8, lg: 10 }}>
        {(searchQuery ? filteredCountries : filteredRegion).length > 0 ? (
          (searchQuery ? filteredCountries : filteredRegion).map((data) => (
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
                    boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.39)",
                  }}
                >
                  <img
                    src={data.flags.png}
                    alt={data.flags.alt}
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
      </Grid>
    </Container>
  );
};

export default Dashboard;
