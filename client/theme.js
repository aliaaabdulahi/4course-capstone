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
      h3: {
        fontWeight: 300,
      },
    },
  },
});
