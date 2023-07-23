import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import customTheme from "../theme.config.js";
import ThemeToggle from "./components/ThemeToggle.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CountryInfo from "./pages/CountryInfo.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <ThemeToggle>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/country/:name" element={<CountryInfo />} />
          </Routes>
        </BrowserRouter>
      </ThemeToggle>
    </ThemeProvider>
  </React.StrictMode>
);
