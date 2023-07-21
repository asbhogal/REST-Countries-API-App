import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import customTheme from "../theme.config.js";
import ThemeToggle from "./components/ThemeToggle.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <ThemeToggle>
        <CssBaseline />
        <App />
      </ThemeToggle>
    </ThemeProvider>
  </React.StrictMode>
);
