import { Container, IconButton, Typography } from "@mui/material";
import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "./ThemeToggle";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const Header = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <Container
      height={6}
      maxWidth="1200px"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "85px",
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
      }}
    >
      <Typography variant="h1" fontSize={28} gutterBottom>
        Countries Dashboard
      </Typography>
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Container>
  );
};

export default Header;
