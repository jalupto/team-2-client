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

    const getRestaurants = async () => {

        const res = await fetch(
            `https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=${props.lat}&longitude=${props.lon}&limit=2&distance=25&currency=USD&distance=2&open_now=false&lunit=km&lang=en_US`,
            {
                method: "GET",
                headers: {
                    "x-rapidapi-key": `${process.env.REACT_APP_TRAVEL_KEY}`,
                    "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
                },
            }
        );

        const response = await res.json();
        const results = response.data;
        setResults(results)
        console.log(results)

    }
            const useStyles = makeStyles(() => ({
                root: {
                    maxWidth: 345,
                    minWidth: 150,
                },
                media: {
                    height: 0,
                    paddingTop: "56.25%", // 16:9
                },
                gridContainer: {
                    padding: "5%",
                },
                links: {
                    textAlign: "center",
                },
                button: {
                    fontSize: "0.75rem",
                },
            }));

    const classes = useStyles();

    useEffect(() => {
        if (props.lat && props.lon) {
            getRestaurants();
        }
            
    },[props.lat, props.lon]);

        return (
            <>
                <h3>Restaurants</h3>
                    <Grid
                        container
                        spacing={4}
                        direction="row"
                        justifyContent="center"
                        className={classes.gridContainer}
                        >
                        {results.map((result, index) => {
                            return (
                                <Grid item xs={12} sm={6} md={3}>
                                    <Card className={classes.root} key={index}>
                                        <CardHeader
                                            title={result.name}
                                            subheader={result.rating} />
                                                <CardMedia
                                            className={classes.media}
                                            image={result.photo.images.original.url} />
                                        <CardContent>
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                                component="p"
                                                className={classes.links}
                                            >
                                                Address:
                                                {result.address === undefined ? ("No address") : " " + result.address}
                                                <br />
                                                Phone: {" " + result.phone}
                                                <br />
                                                <a href={result.website}>Website</a>
                                            </Typography>
                                        </CardContent>
                                        <CardActions disableSpacing>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            );
                        })}
                </Grid>
            </>
        );


}

export default Restaurants;