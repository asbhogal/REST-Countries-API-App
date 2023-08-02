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
        boxShadow: "0rem 0rem .625rem 0rem rgba(0,0,0,0.50)",
        backgroundColor: theme.palette.secondaryColor,
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
  );
};

export default Header;
