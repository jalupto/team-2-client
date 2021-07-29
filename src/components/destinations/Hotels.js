import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardMedia, Grid } from "@material-ui/core";
import "../../App.css";

//====================================================================================================================
// MADE BY JARED AND CHERRON
//====================================================================================================================

const Hotels = (props) => {
    const [results, setResults] = useState([]);
    const [location, setLocation] = useState('');

    const getHotels = async () => { //receive coordinates from city fetch to search for nearby hotels
        const res = await fetch(
            `https://travel-advisor.p.rapidapi.com/hotels/list-by-latlng?latitude=${props.lat}&longitude=${props.lon}&lang=en_US&hotel_class=4,5&limit=8&distance=10`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": process.env.REACT_APP_TRAVEL_KEY,
                    "x-rapidapi-host": "travel-advisor.p.rapidapi.com"
                }
            })
            const response = await res.json();
            const data = response.data; //store results into array to map over
            console.log(data);
            const newHotels = filteredHotels(data); //storing data returned from filteredHotels
            setResults(newHotels);
            const location = data[0].location_string;
            setLocation(location);
    }
    const useStyles = makeStyles(() => ({ //allow styling inside grid components
        media: {
            height: 0,
            paddingTop: "56.25%", // 16:9
            borderRadius: '1rem'
        },
        gridContainer: {
            margin: '5%'
        },
        category: {
            textAlign: 'center'
        }
    }));

    const classes = useStyles();

    useEffect(() => {
        if (props.lat && props.lon) { //keep from constantly changing state and making repeat fetches
            getHotels();
        }
    }, [props.lat, props.lon]);

    const filteredHotels = (results) => { //filter returns new array without ad based off result.ad_position as false
        let hotelResults = results.filter((result) => !result.ad_position);
        console.log(hotelResults);
        return hotelResults;
    };

    return (
        <Grid container spacing={4} direction='row' justifyContent='center' className={classes.gridContainer}>
            <Grid item xs={12} className={classes.category}>
                <h1>Hotels in: {location}</h1>
            </Grid>
            <br />
            {results.map((result, index) => {
                return(
                    <Grid item xs={12} sm={6} key={index}>
                        <div id='card'>
                            <div className='card-content'>
                                <h5 className='card-title'>{result.name}</h5>
                                <p className='card-subtitle'>{result.rating+' Stars'}</p>
                                <h6>Price: {result.price}</h6>
                                {result.business_listings.mobile_contacts[0] === undefined ? (<p className='null'>Unable to book at this time.</p>) : (<a href={result.business_listings.mobile_contacts[0].value} className='link' target='blank'>Book Now!</a>)}
                                <hr/>
                            </div>
                            {result.photo === undefined ? (
                                <CardMedia
                                    className={classes.media}
                                    image="https://www.spearsandcorealestate.com/wp-content/themes/spears/images/no-image.png"
                                />
                            ) : (
                                <CardMedia
                                    className={classes.media}
                                    image={result.photo.images.original.url}
                                />
                            )}
                        </div>
                    </Grid>
                )
            })}
        </Grid>
    );
};

export default Hotels;
