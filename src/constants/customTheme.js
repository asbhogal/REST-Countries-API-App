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
          boxShadow: "rgb(210 210 210 / 46%) 0px 0px 12px 0px",
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
          boxShadow: "rgb(9 9 9 / 60%) 0px 0px 12px 0px",
        }),
  },
});

export default getDesignTokens;
