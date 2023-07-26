import { blue, blueGrey, grey } from "@mui/material/colors";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          main: "#ffffff",
          text: {
            primary: "hsl(200, 15%, 8%)",
            secondary: grey[800],
          },
          secondaryColor: "#ffffff",
        }
      : {
          primary: blue,
          divider: blueGrey,
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
