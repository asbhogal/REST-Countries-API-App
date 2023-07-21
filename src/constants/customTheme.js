import { amber, blue, blueGrey, grey } from "@mui/material/colors";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: amber,
          divider: amber[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          primary: blue,
          divider: blueGrey,
          background: {
            default: blueGrey[900],
            paper: blueGrey[800],
          },
          text: {
            primary: "#fff",
            secondary: grey,
          },
        }),
  },
});

export default getDesignTokens;
