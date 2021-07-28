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

const Attractions = (props) => {
    const [results, setResults] = useState([])
    
    const getAttractions = async () => {
        const res = await fetch(
            `https://travel-advisor.p.rapidapi.com/attractions/list-by-latlng?longitude=${props.lon}&latitude=${props.lat}&lunit=mi&currency=USD&limit=4&distance=25&lang=en_US`,
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
        console.log(results)
        setResults(results)
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
                getAttractions();
            }
        },[props.lat, props.lon]);
    
return (
    <>    
        <h3>Activities</h3>
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
                                        subheader=""
                                    />

                                    {/* {result.photo.images.original.url && */}
                                    <CardMedia
                                        className={classes.media}
                                        image={result.photo.images.original.url}
                                    />

                                    {/* } */}

                                    <CardContent>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                            className={classes.links}
                                        >
                                            Address:
                                            {result.address === ""
                                                ? "No address"
                                                :  "  "  + result.address}
                                            <br />
                                            Phone: {result.phone === undefined 
                                            ? "No phone number available" 
                                            : " " + result.phone}
                                            <br />
                                            <a href={result.website}>Website</a>
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
}

export default Attractions;