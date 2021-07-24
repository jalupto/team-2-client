import React, {useEffect, useState} from "react";
import { Input, FormControl, Button } from "@material-ui/core";
import Hotels from "./Hotels";

const CityFetch = () => {
    const [lon, setLon] = useState("");
    const [lat, setLat] = useState("");
    const [city, setCity] = useState("");

    const getCity = async () => {
        const res = await fetch(`https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete?query=${city}&lang=en_US&units=km`, {
            "method": "GET",
            "headers": {
            "x-rapidapi-key": "6bfd3aa317mshb3d7f9f736c2495p1b5b18jsndd1d5034882e",
            "x-rapidapi-host": "travel-advisor.p.rapidapi.com"
        }
        })

        const results = await res.json();
        const lon = results.data.Typeahead_autocomplete.results[0].detailsV2.geocode.longitude;
        const lat = results.data.Typeahead_autocomplete.results[0].detailsV2.geocode.latitude;
        setLat(lat);
        setLon(lon);
        setCity("")
        console.log(lon);
        console.log(lat);
}
    useEffect(() => {
        getCity();
    }, [])

    return (
        <>
            <FormControl>
                <Input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Search City"
                />   
                
                <Button onClick={getCity}>Click</Button>
            </FormControl>
            <Hotels getCity={getCity} lat={lat} lon={lon} city={city} />
        </>
    );

}

export default CityFetch;