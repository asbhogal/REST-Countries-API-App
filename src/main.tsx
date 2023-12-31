import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline, ThemeProvider } from "@mui/material";
import customTheme from "../theme.config.ts";
import ThemeToggle from "@/components/ThemeToggle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CountryInfo from "@/pages/CountryInfo";
import { CountryProvider } from "@/context/CountryContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <ThemeToggle>
        <CssBaseline />
        <BrowserRouter>
          <CountryProvider>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/country/:name" element={<CountryInfo />} />
            </Routes>
          </CountryProvider>
        </BrowserRouter>
      </ThemeToggle>
    </ThemeProvider>
  </React.StrictMode>
);
