import { colors, createTheme } from "@mui/material";
import { frFR as dataGridFr } from "@mui/x-data-grid";
import { frFR as datePickersFr} from "@mui/x-date-pickers";

export const getTheme = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: colors.deepPurple[400],
        light: colors.deepPurple[100],
        dark: colors.deepPurple[700],
        //contrastText: colors.white[900]
      },
      secondary: {
        main: colors.pink[600],
        light: colors.pink[300],
        dark: colors.pink[800],
        contrastText: colors.pink[50]
      },
      info: {
        main: colors.orange[500],
        light: colors.orange[300],
        dark: colors.orange[800],
        contrastText: colors.orange[50]
      },
      background: {
        default: '#fff'
      }
    },
    typography: {
    }
  })
  theme.typography.h4 = {
    fontSize: "24px",
    fontFamily: "Poppins, sans-serif",
    [theme.breakpoints.down("xl")]: { fontSize: "32px" },
    [theme.breakpoints.down("lg")]: { fontSize: "26px" },
    [theme.breakpoints.down("md")]: { fontSize: "26px" },
    [theme.breakpoints.down("sm")]: { fontSize: "18px" },
  }
  dataGridFr

  return theme
}