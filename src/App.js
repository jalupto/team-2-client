import React from 'react';
import Sitebar from './components/site/Navbar';
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../src/components/site/darkToggle/Global";
import { lightTheme, darkTheme } from "../src/components/site/darkToggle/Themes";
import { useDarkMode } from "../src/components/site/darkToggle/useDarkMode";

//import theme to apply to entire site

export default function App() {
  const [theme, mountedComponent] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  if (!mountedComponent) return <div />;
  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <Router>
        <Sitebar />
      </Router>
    </ThemeProvider>
  );
};