import { createMuiTheme } from "@material-ui/core/styles";

const arcPink = "#ff99bb";
const arcCrimson = "#DC143C";

export default createMuiTheme({
  palette: {
    common: {
      pink: arcPink,
      hotPink: arcCrimson,
    },
    primary: {
      main: arcPink,
    },
    secondary: {
      main: arcCrimson,
    },
    typography: {
      button: {
        fontFamily: "Permanent Marker",
        color: "#fff100",
      },
      h5: {
        fontWeight: 300,
        fontFamily: "Permanent Marker",
        color: "#fff100",
      },
    },
  },
});
