import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardHeader, CardMedia, CardContent, CardActions, Typography, Grid } from "@material-ui/core";
import "../../App.css";

const Hotels = (props) => {
    const [results, setResults] = useState([]);

    const getHotels = async () => {
        const res = await fetch(
            `https://travel-advisor.p.rapidapi.com/hotels/list-by-latlng?latitude=${props.lat}&longitude=${props.lon}&lang=en_US&hotel_class=4,5&limit=4&distance=25&distance=10`,
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
            console.log(results);
            setResults(results);

    };
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
            getHotels();  
        }
    },[props.lat, props.lon]);

    return (
        <>
            <Grid
                container
                spacing={4}
                direction="row"
                justifyContent="center"
                className={classes.gridContainer}
            >
                <Grid item xs={12} textAlign="center">
                    <h3>Hotels</h3>
                </Grid>
                {results.map((result, index) => {
                    return (
                        <Grid item xs={12} sm={6} md={3}>
                            <Card className={classes.root} key={index}>
                                <CardHeader
                                    title={result.name}
                                    subheader={result.rating + " Stars"}
                                />
                                <CardMedia
                                    className={classes.media}
                                    image={result.photo.images.original.url}
                                />
                                <CardContent>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="p"
                                        className={classes.links}
                                    >
                                        Price:
                                        {" " + result.price}
                                        <br />
                                        <a href={result.url} target="blank">
                                            Book Now!
                                        </a>
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing></CardActions>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};

export default Hotels;