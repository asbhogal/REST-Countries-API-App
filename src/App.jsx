import { Container } from "@mui/material";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Container
        maxWidth="900px"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Header />
        <Dashboard />
      </Container>
    </>
  );
}

export default App;
