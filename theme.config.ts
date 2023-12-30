import { createTheme } from "@mui/material/styles";
import "@fontsource/nunito-sans/300.css";
import "@fontsource/nunito-sans/400.css";
import "@fontsource/nunito-sans/600.css";

const theme = createTheme({
  typography: {
    fontFamily: "Nunito Sans, Arial",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      @font-face {
        font-family: 'Nunito Sans';
        font-style: normal;
        font-display: swap;
        font-weight: 300;
        src: url(node_modules/@fontsource/nunito-sans/300.css) format('woff2');
      }
      @font-face {
        font-family: 'Nunito Sans';
        font-style: normal;
        font-display: swap;
        font-weight: 400;
        src: url(node_modules/@fontsource/nunito-sans/400.css) format('woff2');
      }
      @font-face {
        font-family: 'Nunito Sans';
        font-style: normal;
        font-display: swap;
        font-weight: 600;
        src: url(node_modules/@fontsource/nunito-sans/600.css) format('woff2');
      }`,
    },
  },
});

export default theme;
