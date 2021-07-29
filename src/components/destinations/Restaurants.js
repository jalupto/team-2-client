import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardMedia, Grid } from "@material-ui/core";
import "../../App.css";

const Restaurants = (props) => {
    const [results, setResults] = useState([]);
    const [location, setLocation] = useState('');

    const getRestaurants = async () => {

        const res = await fetch(
            `https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=${props.lat}&longitude=${props.lon}&limit=8&distance=10&currency=USD&open_now=false&lunit=mi&lang=en_US`,
            {
                method: "GET",
                headers: {
                    "x-rapidapi-key": process.env.REACT_APP_TRAVEL_KEY,
                    "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
                },
            }
        );
            const response = await res.json();
            const data = response.data; //store results into array to map over
            console.log(data);
            const newRest = filteredRestaurants(data); //storing data returned from filteredHotels
            setResults(newRest);
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
        if (props.lat && props.lon) {
            getRestaurants();
        }
            
    },[props.lat, props.lon]);

    const filteredRestaurants = (results) => {
        //filter returns new array without ad based off result.ad_position as false
        let restResults = results.filter((result) => !result.ad_position);
        console.log(restResults);
        return restResults;
    };

    return (
        <Grid container spacing={4} direction='row' justifyContent='center' className={classes.gridContainer}>
            <Grid item xs={12} className={classes.category}>
                <h1>Restaurants in: {location}</h1>
            </Grid>
            <br />
            {results.map((result, index) => {
                return (
                    <Grid item xs={12} sm={6} key={index}>
                        <div id='card'>
                            <div className='card-content'>
                                <h5 className='card-title'>{result.name}</h5>
                                <p className='card-subtitle'>{
                                    result.rating === undefined ? (
                                        <p className='null'>No rating available</p>
                                    ) : (
                                        <p>{result.rating} Stars</p>
                                    )
                                }</p>
                                <h4>Address: </h4>
                                {result.address === "" ? (
                                    <p className='null'>Address unavailable</p>
                                ) : (
                                    <h6>{result.address}</h6>
                                )}
                                <hr />
                                <h4>Phone: </h4>
                                {result.phone === undefined ? (
                                    <p className='null'>Phone number unavailable</p>
                                ) : (
                                    <h6>{result.phone}</h6>
                                )}
                                <hr />
                                <h4>Website: </h4>
                                {result.website === undefined ? (
                                    <p className='null'>Website unavailable</p>
                                ) : (
                                    <a href={result.website}className='link' target='blank'>Book Now!</a>
                                )}
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
                );
            })}
        </Grid>
    );
};

export default Restaurants;