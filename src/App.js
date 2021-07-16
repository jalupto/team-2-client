import React, { useEffect, useState } from 'react';
import Sitebar from './components/site/Navbar';
import Auth from './components/auth/Auth';
import { Grid, Typography } from '@material-ui/core';
import {ThemeProvider} from 'styled-components';
import { GlobalStyles } from './components/site/darkToggle/Global';
import { lightTheme, darkTheme } from './components/site/darkToggle/Themes';
import { useDarkMode } from './components/site/darkToggle/useDarkMode';
import Toggle from './components/site/darkToggle/Toggler';
import FavIndex from './components/favorites/FavIndex';

function App() {
  const [sessionToken, setSessionToken] = useState('');

  const [theme, themeToggler, mountedComponent] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  useEffect(() => {
    if (localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'));
    }
  }, []);

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  };

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  };
  
  const protectedViews = () => {
    return sessionToken === localStorage.getItem("token") ? (
        <FavIndex token={sessionToken} />
    ) : (
        <Auth updateToken={updateToken} />
    );
  };
  
  if(!mountedComponent) return <div/>
  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles/>
        <Grid
        container
        direction='column'
        alignItems='center'
        spacing={0}
      >
          <Grid item xs={12}>
            <Typography variant='h1'>JUNO</Typography>
          </Grid>
          <Grid item xs={12}>
          <Typography variant='h3'>Travel Yet?</Typography>
          </Grid>
          <br/>
          <Toggle theme={theme} toggleTheme={themeToggler} />
          <br/>
          <Grid item xs={12}>
            <Sitebar clickLogout={clearToken}/>
          </Grid>
          <Grid container item xs={10} direction='row'>
            {protectedViews()}
          </Grid>
        </Grid>
    </ThemeProvider>
  );
};

export default App;