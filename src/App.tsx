import { Container } from "@mui/material";
import Dashboard from "@/components/Dashboard";
import Header from "@/components/Header";

function App() {
  return (
    <>
      <Container
        disableGutters
        sx={{ display: "flex", flexDirection: "column", maxWidth: "56.25rem" }}
      >
        <Header />
        <Dashboard />
      </Container>
    </>
  );
}

export default App;
