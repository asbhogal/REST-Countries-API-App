import { Box, Grid, ImageListItem } from "@mui/material";
import countriesData from "../data/data.json";

const Dashboard = () => {
  console.log(countriesData);
  return (
    <>
      <Grid container spacing={{ sm: 1, md: 4 }}>
        {countriesData.map((data) => (
          <Grid item xs={12} sm={6} md={3} key={data.alpha3Code}>
            <Box sx={{ p: 2, border: "1px dashed grey" }}>
              <ImageListItem>
                <img src={data.flag} alt={`${data.name} flag`} />
              </ImageListItem>
              <p>{data.name}</p>
              <p>Population: {data.population}</p>
              <p>Region: {data.region}</p>
              <p>Capital: {data.capital}</p>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Dashboard;
