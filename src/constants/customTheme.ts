import { Mode } from "@/utils/types/mode";
import { blue, blueGrey, grey } from "@mui/material/colors";

const getDesignTokens = (mode: Mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          background: {
            default: grey[100],
          },
          text: {
            primary: "hsl(200, 15%, 8%)",
            secondary: grey[800],
          },
        }
      : {
          primary: blue,
          background: {
            default: "hsl(207, 26%, 17%)",
          },
          text: {
            primary: "#fff",
            secondary: grey[50],
          },
        }),
  },
  custom: {
    ...(mode === "light"
      ? {
          main: "#ffffff",
          secondaryColor: "#ffffff",
          boxShadow: "rgb(210 210 210 / 46%) 0px 0px 12px 0px",
        }
      : {
          secondaryColor: "#2b3743",
          boxShadow: "rgb(9 9 9 / 60%) 0px 0px 12px 0px",
          divider: blueGrey,
        }),
  },
});

export default getDesignTokens;
