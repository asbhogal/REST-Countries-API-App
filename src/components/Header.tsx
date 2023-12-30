import { Box, IconButton, Typography } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "./ThemeToggle";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const Header = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: "5.3125rem",
        padding: "0 1.25rem",
        backgroundColor: theme.custom.secondaryColor,
        boxShadow: theme.custom.boxShadow,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "100rem",
          width: "100%",
          margin: "0 auto",
        }}
      >
        <Typography
          variant="h2"
          fontSize={28}
          sx={{ marginBottom: "0" }}
          gutterBottom
        >
          Where in the world?
        </Typography>
        <IconButton
          sx={{ ml: 1 }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
          aria-labelledby="theme-toggle"
        >
          <span id="theme-toggle" style={visuallyHidden}>
            Toggle Theme
          </span>
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon aria-hidden="true" focusable="false" />
          ) : (
            <Brightness4Icon aria-hidden="true" focusable="false" />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;
