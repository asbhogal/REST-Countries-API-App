import { Box, Container, Grid, ImageListItem, Link } from "@mui/material";
import countriesData from "../data/data.json";

const Dashboard = () => {
  console.log(countriesData);
  return (
    <Container maxWidth="900px">
      <Link>
        <Grid container spacing={{ sm: 1, md: 8 }}>
          {countriesData.map((data) => (
            <Grid item xs={12} sm={6} md={3} key={data.alpha3Code}>
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
                    src={data.flag}
                    alt={`${data.name} flag`}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                      maxHeight: "232.51px",
                    }}
                  />
                </ImageListItem>
                <Box p={2} sx={{ flex: "1 0 auto" }}>
                  <p>{data.name}</p>
                  <p>Population: {data.population}</p>
                  <p>Region: {data.region}</p>
                  <p>Capital: {data.capital}</p>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Link>
    </Container>
  );
};

export default Dashboard;
