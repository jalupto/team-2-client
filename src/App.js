import React, { useEffect, useState } from 'react';
import Sitebar from './components/site/Navbar';
import Auth from './components/auth/Auth';
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
      <>
      <GlobalStyles/>
        <div className="App">
          <Toggle theme={theme} toggleTheme={themeToggler} />
          <Sitebar clickLogout={clearToken}/>
          {protectedViews()}
        </div>
      </>
    </ThemeProvider>   
  );
};

export default App;