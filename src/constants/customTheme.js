import { amber, blue, blueGrey, grey } from "@mui/material/colors";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: amber,
          divider: amber[200],
          text: {
            primary: "hsl(200, 15%, 8%)",
            secondary: grey[800],
          },
        }
      : {
          primary: blue,
          divider: blueGrey,
          div: "hsl(209, 23%, 22%)",
          background: {
            default: "hsl(207, 26%, 17%)",
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
