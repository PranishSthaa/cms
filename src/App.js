import { ThemeProvider } from "@mui/material";
import { CssBaseline } from '@mui/material';
import AppRoute from "./AppRoute";
import { theme } from "./utils/theme";

function App() {


  return <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoute />
    </ThemeProvider>
  </>;
}

export default App;
