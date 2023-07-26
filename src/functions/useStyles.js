import { useTheme } from "@mui/material";

const useStyles = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return {
    buttonStyle: {
      color: isDarkMode ? "#edf9ff" : "#3c3d3f",
      backgroundColor: isDarkMode ? "#2b3743" : "#ffffff",
    },
    textFieldStyle: {
      color: isDarkMode ? "#edf9ff" : "#3c3d3f",
      backgroundColor: isDarkMode ? "#2b3743" : "#ffffff",
    },
    filterMenuStyle: {
      color: isDarkMode ? "#edf9ff" : "#3c3d3f",
      backgroundColor: isDarkMode ? "#2b3743" : "#ffffff",
    },
  };
};

export default useStyles;
