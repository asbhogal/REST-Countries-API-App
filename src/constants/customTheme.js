import { amber, blue, blueGrey, grey } from "@mui/material/colors";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          main: "#ffffff",
          primary: amber,
          divider: amber[200],
          text: {
            primary: "hsl(200, 15%, 8%)",
            secondary: grey[800],
          },
          secondaryColor: "#ffffff",
        }
      : {
          primary: blue,
          divider: blueGrey,
          div: "hsl(209, 23%, 22%)",
          background: {
            default: "hsl(207, 26%, 17%)",
          },
          text: {
            primary: "#fff",
            secondary: grey,
          },
          secondaryColor: "#2b3743",
        }),
  },
});

export default getDesignTokens;
