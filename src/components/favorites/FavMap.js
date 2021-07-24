import React, {useState, useRef, useCallback} from "react";
import ReactMapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { Grid, Typography } from "@material-ui/core";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../../components/site/darkToggle/Global";
import { lightTheme, darkTheme } from "../../components/site/darkToggle/Themes";
import { useDarkMode } from "../../components/site/darkToggle/useDarkMode";
import Toggle from "../../components/site/darkToggle/Toggler"

const FavMap = () => {
    const [theme, themeToggler, mountedComponent] = useDarkMode();
    const themeMode = theme === "light" ? lightTheme : darkTheme;

    const [viewport, setViewport] = useState({
        latitude: 39.7684,
        longitude: -86.1581,
        width: "75vw",
        height: "100vh",
        zoom: 10,
    });
    const mapRef = useRef();
    const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport),
        []
    );

    const handleGeocoderViewportChange = useCallback(
        (newViewport) => {
            const geocoderDefaultOverrides = { transitionDuration: 5000 };
            return handleViewportChange({
                ...newViewport,
                ...geocoderDefaultOverrides,
            });
        },
        [handleViewportChange]
    );

    if (!mountedComponent) return <div />;
    return (
        <ThemeProvider theme={themeMode}>
            <GlobalStyles />
            <Grid container direction="column" alignItems="center">
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    spacing={0}
                >
                    <Grid item xs={12}>
                        <Typography variant="h1">JUNO</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h3">Travel Yet?</Typography>
                    </Grid>
                    <br />
                    <Toggle theme={theme} toggleTheme={themeToggler} />
                    <br />
                </Grid>
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    item
                    xs={12}
                >
                    <ReactMapGL
                        ref={mapRef}
                        {...viewport}
                        mapboxApiAccessToken={process.env.REACT_APP_MAP_KEY}
                        mapStyle="mapbox://styles/jalupto/ckr8e20861jjx17mxsxf434yp"
                        onViewportChange={handleViewportChange}
                    >
                        Longitude: {viewport.longitude} | Latitude:{" "}
                        {viewport.latitude} | Zoom: {viewport.zoom}
                        <Geocoder
                            mapRef={mapRef}
                            onViewportChange={handleGeocoderViewportChange}
                            mapboxApiAccessToken={process.env.REACT_APP_MAP_KEY}
                            position="top-right"
                        />
                    </ReactMapGL>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default FavMap;
