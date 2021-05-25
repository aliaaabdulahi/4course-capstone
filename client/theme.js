import { createMuiTheme } from "@material-ui/core/styles";

const ourPink = "#ff99bb";
const ourCrimson = "#DC143C";

export default createMuiTheme({
  palette: {
    common: {
      pink: ourPink,
      hotPink: ourCrimson,
    },
    primary: {
      main: ourPink,
    },
    secondary: {
      main: ourCrimson,
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
      h4: {
        fontWeight: 200,
        fontFamily: "Permanent Marker",
        color: "#DC143C",
      },
    },
  },
});
