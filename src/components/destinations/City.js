import React, {
    useEffect, 
    useState} from "react";
import { FormControl, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Hotels from "./Hotels";
import { DebounceInput } from 'react-debounce-input';

import Flipboard from "../react-split-flap-effect/Flipboard";

//====================================================================================================================
// MADE BY JARED AND CHERRON
//====================================================================================================================

const CityFetch = () => {
    const [lon, setLon] = useState("");
    const [lat, setLat] = useState("");
    const [city, setCity] = useState("");
    const [flipname, setFlipname] = useState("");

    const getCity = async () => { //fetch coordinates from city search to plug into other fetch categories (ex: hotels)
        const res = await fetch(`https://api.opentripmap.com/0.1/en/places/geoname?name=${city}&apikey=${process.env.REACT_APP_OPENTRIP_KEY}`
        )

        const results = await res.json();
        const lat = results.lat;
        const lon = results.lon;
        setLat(lat);
        setLon(lon);
        setFlipname(`Welcome to ${city}`);
        setCity("")
    
    }

    const useStyles = makeStyles(() => ({
        gridContainer: {
            paddingTop: '5%' //give search bar a little space from the navbar
        }
    }));

    const classes = useStyles();

    useEffect(() => {
        if (lat && lon && city) { //keep from constantly changing state and making repeat fetches
            getCity();
        };
    }, []);

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
{/* //====================================================================================================================
// MADE BY ARIANNE
//==================================================================================================================== */}
            <div className="flip-effect">
            <Flipboard name={flipname} number={flipname.length} />
            </div>
            
            <Hotels getCity={getCity} lat={lat} lon={lon} city={city} />
        </Grid>
    );
};

export default CityFetch;