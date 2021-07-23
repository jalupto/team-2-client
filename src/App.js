import React, { useEffect, useState, useRef, useCallback } from 'react';
import Sitebar from './components/site/Navbar';
import Auth from './components/auth/Auth';
import { Grid, Typography } from '@material-ui/core';
import {ThemeProvider} from 'styled-components';
import { GlobalStyles } from './components/site/darkToggle/Global';
import { lightTheme, darkTheme } from './components/site/darkToggle/Themes';
import { useDarkMode } from './components/site/darkToggle/useDarkMode';
import Toggle from './components/site/darkToggle/Toggler';
import FavIndex from './components/favorites/FavIndex';
import ReactMapGL from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
// import config from './config';
import Flipboard from './components/react-split-flap-effect/Flipboard';

export default function App() {
  const [sessionToken, setSessionToken] = useState('');

  //dark mode toggler
  const [theme, themeToggler, mountedComponent] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  //interactive map from mapbox
  const [viewport, setViewport] = useState({
    latitude: 39.7684,
    longitude: -86.1581,
    width: '75vw',
    height: '100vh',
    zoom: 10
  });
  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport), []);

  //search function for map
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 5000 };
      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      });
    }, [handleViewportChange]);

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
            <Sitebar clickLogout={clearToken}/>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h1'>JUNO</Typography>
          </Grid>
          <Grid item xs={12}>
          <Typography variant='h3'>Travel Yet?</Typography>
          </Grid>
          <br/>
          <Toggle theme={theme} toggleTheme={themeToggler} />
          <br/>
          <Flipboard/>
          <br/>
          <Grid container item xs={10} direction='row'>
            {protectedViews()}
          </Grid>
          <br/>
          <ReactMapGL
            ref={mapRef}
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAP_KEY}
            mapStyle='mapbox://styles/jalupto/ckr8e20861jjx17mxsxf434yp'
            onViewportChange={handleViewportChange}
          >
            Longitude: {viewport.longitude} | Latitude: {viewport.latitude} | Zoom: {viewport.zoom}
            <Geocoder
              mapRef={mapRef}
              onViewportChange={handleGeocoderViewportChange}
              mapboxApiAccessToken={process.env.REACT_APP_MAP_KEY}
              position='top-right'
            />
          </ReactMapGL>
        </Grid>
    </ThemeProvider>
  );
};