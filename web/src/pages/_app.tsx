import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Theme } from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider,createTheme } from '@mui/material/styles';
const theme: Theme = createTheme({

  palette: {
    primary: {
      main: '#1976d2', // Blue color
    },
    secondary: {
      main: '#dc004e', // Pink color
    },
    background: {
      default: '#f5f5f5', // Light gray
    },
  },
});


export default function App({ Component, pageProps }: AppProps) {
  return(
    <ThemeProvider theme={theme}>
      <CssBaseline />
  <Component {...pageProps} />
  </ThemeProvider>
);
}
