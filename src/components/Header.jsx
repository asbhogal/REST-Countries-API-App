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
      maxWidth="75rem"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "5.3125rem",
        boxShadow: theme.palette.boxShadow,
        backgroundColor: theme.palette.secondaryColor,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography fontSize={28} sx={{ marginBottom: "0" }} gutterBottom>
          Where in the world?
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
    </Container>
  );
};

export default Header;
