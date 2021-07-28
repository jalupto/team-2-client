
import React, { useEffect, useState } from "react";
import { FormControl, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { DebounceInput } from "react-debounce-input";
import Hotels from "./Hotels";
import Attractions from "./Attractions";
import Restaurants from "./Restaurants";

//====================================================================================================================
// MADE BY JARED AND CHERRON
//====================================================================================================================

const CityFetch = () => {
    const [lon, setLon] = useState("");
    const [lat, setLat] = useState("");
    const [city, setCity] = useState("");

    const getCity = async () => { //fetch coordinates from city search to plug into other fetch categories (ex: hotels)
        const res = await fetch(`https://api.opentripmap.com/0.1/en/places/geoname?name=${city}&apikey=${process.env.REACT_APP_OPENTRIP_KEY}`
        )

        const results = await res.json();
        const lat = results.lat;
        const lon = results.lon;
        setLat(lat);
        setLon(lon);
        setCity("");
    };

    const useStyles = makeStyles(() => ({
        gridContainer: {
            paddingTop: '5%' //give search bar a little space from the navbar
        }
    }));

    const classes = useStyles();
  
      useEffect(() => {
        if (lat && lon && city) { //keep from constantly changing state and making repeat fetches
            getCity();
          }
        }, [lat, lon, city]);

    return (
        <Grid container justifyContent='center' className={classes.gridContainer}>
            <FormControl>
                <DebounceInput //prevent fetch request per keystroke
                minLength={3}
                debounceTimeout={3000}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Search by City"
                />
                <Button onClick={getCity}>Search</Button>
            </FormControl>
            <Hotels getCity={getCity} lat={lat} lon={lon} city={city} />
            <Attractions city={city} lat={lat} lon={lon} />
            <Restaurants lat={lat} lon={lon} />
        </Grid>
    );
};

export default CityFetch;

