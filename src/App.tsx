import { Container } from "@mui/material";
import Dashboard from "@/components/Dashboard";
import Header from "@/components/Header";
import { useCountryData } from "./hooks/useCountryData";

function App() {
  const country = useCountryData();
  return (
    <>
      <Container
        maxWidth="56.25rem"
        disableGutters
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Header />
        <Dashboard country={country} />
      </Container>
    </>
  );
}

export default App;
