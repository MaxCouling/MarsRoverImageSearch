import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import App from "./App";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function Wrapper() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}

export default Wrapper;
