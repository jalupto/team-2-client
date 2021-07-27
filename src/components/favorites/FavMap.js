import React, {useState, useRef, useCallback} from "react";
import ReactMapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder"; //===================== search box
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { Grid, Typography } from "@material-ui/core";
import Flipboard from "../site/Header";

//===============================================================================================================
// Map by Jared
//===============================================================================================================

const FavMap = () => {
    const [viewport, setViewport] = useState({ //refresh viewport of map when user zooms and scrolls
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
            const geocoderDefaultOverrides = { transitionDuration: 5000 }; //how long map zooms out and in to searched location
            return handleViewportChange({
                ...newViewport,
                ...geocoderDefaultOverrides,
            });
        },
        [handleViewportChange]
    );

    return (
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
            </Grid>
            <Flipboard />
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
                    mapStyle="mapbox://styles/jalupto/ckr8e20861jjx17mxsxf434yp" //custom map styling
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
    );
};

export default FavMap;