import React, {
    useEffect, 
    useState} from "react";
import { 
    // Input, 
    FormControl, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Hotels from "./Hotels";
import { DebounceInput } from 'react-debounce-input';

const CityFetch = () => {
    const [lon, setLon] = useState("");
    const [lat, setLat] = useState("");
    const [city, setCity] = useState("");
//
    const getCity = async () => {
        const res = await fetch(`https://api.opentripmap.com/0.1/en/places/geoname?name=${city}&apikey=${process.env.REACT_APP_OPENTRIP_KEY}`
        )

        const results = await res.json();
        const lat = results.lat;
        const lon = results.lon;
        setLat(lat);
        setLon(lon);
        setCity("")
    }

    const useStyles = makeStyles(() => ({
        gridContainer: {
            paddingTop: '5%'
        }
    }));

    const classes = useStyles();

    useEffect(() => {
        if (lat && lon && city) {
            getCity();
        };
    }, []);

    return (
        <Grid container justifyContent='center' className={classes.gridContainer}>
            <FormControl>
                <DebounceInput
                minLength={3}
                debounceTimeout={3000}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Search by City"
                />
                <Button onClick={getCity}>Search</Button>
            </FormControl>
            <Hotels getCity={getCity} lat={lat} lon={lon} city={city} />
        </Grid>
    );
};

export default CityFetch;