import {
  Box,
  Container,
  Grid,
  ImageListItem,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

const client = axios.create({
  baseURL: "https://restcountries.com/v3.1/all",
});

/* const Link = (props) => {
  return (
    <MuiLink underline="none" {...props}>
      {props.children}
    </MuiLink>
  );
}; */

const Dashboard = () => {
  const [country, getCountry] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await client.get();
        response.data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        getCountry(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container maxWidth="900px">
      <Grid container spacing={{ sm: 1, md: 8 }}>
        {country.map((data) => (
          <Grid item xs={12} sm={6} md={3} key={data.cca3}>
            <RouterLink to={`/country/${data.name.common}`}>
              <Box
                sx={{
                  boxShadow: "0px 0px 23px 0px rgba(0,0,0,0.55)",

                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <ImageListItem sx={{ flex: "1 0 50%" }}>
                  <img
                    src={data.flags.png}
                    alt={`${data.name.common} flag`}
                    style={{
                      display: "flex",
                      objectFit: "cover",
                      width: "100%",
                      height: "232.51px",
                    }}
                  />
                </ImageListItem>
                <Box p={4} sx={{ flex: "1 0 auto" }}>
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
                      sx={{
                        fontSize: "14px",
                        fontWeight: "600",
                        mt: "0",
                        mb: "0",
                      }}
                    >
                      Population: {data.population}
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
            </RouterLink>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
