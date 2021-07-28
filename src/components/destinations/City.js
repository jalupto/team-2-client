import React, { useEffect, useState } from "react";
import {
    FormControl,
    Button,
    Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Hotels from "./Hotels";
import { DebounceInput } from "react-debounce-input";
import Attractions from "./Attractions";
import Restaurants from "./Restaurants";

const CityFetch = () => {
    const [lon, setLon] = useState("");
    const [lat, setLat] = useState("");
    const [city, setCity] = useState("");
    
    const getCity = async () => {
        const res = await fetch(
            `https://api.opentripmap.com/0.1/en/places/geoname?name=${city}&apikey=${process.env.REACT_APP_OPENTRIP_KEY}`
        );

        const results = await res.json();
        console.log(results);
        const lat = results.lat;
        const lon = results.lon;
        setLat(lat);
        setLon(lon);
        setCity("");
        console.log(lat);
        console.log(lon);
    };

    const useStyles = makeStyles(() => ({
        gridContainer: {
            paddingTop: "5%",
        },
    }));

    const classes = useStyles();

    useEffect(() => {
        if (lat && lon && city) {
            getCity();
        }
    }, [lat, lon, city]);

    return (
                <Grid
                    container
                    justifyContent="center"
                    className={classes.gridContainer}
                >
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
                    <br />
                    <Hotels city={city} lat={lat} lon={lon} />
                    <Attractions city={city} lat={lat} lon={lon} />
                    <Restaurants lat={lat} lon={lon} />
                </Grid>
    );
};

export default CityFetch;
