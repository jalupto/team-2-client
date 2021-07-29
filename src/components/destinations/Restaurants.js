import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Grid,
} from "@material-ui/core";
import "../../App.css";

const Restaurants = (props) => {
    const [results, setResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);

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
            const newHotels = filteredHotels(data); //storing data returned from filteredHotels
            setResults(newHotels);
    }
    const useStyles = makeStyles(() => ({
        //allow styling inside grid components
        root: {
            minWidth: "100%",
            minHeight: "100%",
            padding: "5%",
            textAlign: "center",
        },
        media: {
            height: 0,
            paddingTop: "56.25%", // 16:9
        },
        gridContainer: {
            padding: "5%",
        },
        // links: {
        //     textAlign: 'center'
        // },
        // button: {
        //     fontSize: '0.75rem',
        // },
        gridContainer: {
            margin: "5%",
        },
    }));

                const classes = useStyles();

    useEffect(() => {
        if (props.lat && props.lon) {
            getRestaurants();
        }
            
    },[props.lat, props.lon]);

    const filteredHotels = (results) => {
        //filter returns new array without ad based off result.ad_position as false
        let hotelResults = results.filter((result) => !result.ad_position);
        console.log(hotelResults);
        return hotelResults;
    };  


    return (
        <Grid
            container
            spacing={4}
            direction="row"
            justifyContent="center"
            className={classes.gridContainer}
        >
            <Grid item xs={12} className={classes.title}>
                <h3>Restaurants</h3>
            </Grid>
            <br />
            {results.map((result, index) => {
                return (
                    <Grid item xs={12} sm={6} md={3}>
                        <Card className={classes.root} key={index}>
                            <CardHeader
                                title={result.name}
                                subheader={
                                    result.rating === undefined ? (
                                        <em>No rating available</em>
                                    ) : (
                                        <strong>{result.rating} Stars</strong>
                                    )
                                }
                            />
                            <CardContent>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                    className={classes.links}
                                >
                                    <strong>Address:</strong>
                                    {result.address === "" ? (
                                        <em> Address unavailable</em>
                                    ) : (
                                        "  " + result.address
                                        )}
                                    <br />
                                    <strong>Phone:</strong>
                                    {result.phone === undefined ? (
                                        <em> Phone number unavailable</em>
                                    ) : (
                                        " " + result.phone
                                        )}
                                    <br />
                                    <strong>Website: </strong>
                                    {result.website === undefined ? (
                                        <em>Website unavailable</em>
                                    ) : (
                                        <a href={result.website}>Link</a>
                                        )}
                                </Typography>
                            </CardContent>
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
                            <CardActions disableSpacing></CardActions>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    );
}

export default Restaurants;