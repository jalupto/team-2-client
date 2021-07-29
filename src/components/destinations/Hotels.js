import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardHeader, CardMedia, CardContent, 
    // CardActions, IconButton, 
    Typography, Grid} from "@material-ui/core";
// import FavoriteIcon from "@material-ui/icons/Favorite";
import "../../App.css";

//====================================================================================================================
// MADE BY JARED AND CHERRON
//====================================================================================================================

const Hotels = (props) => {
    const [results, setResults] = useState([]);

    const getHotels = async () => { //receive coordinates from city fetch to search for nearby hotels
        const res = await fetch(
            `https://travel-advisor.p.rapidapi.com/hotels/list-by-latlng?latitude=${props.lat}&longitude=${props.lon}&lang=en_US&hotel_class=4,5&limit=20&distance=10`, {
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
    }

    const useStyles = makeStyles(() => ({ //allow styling inside grid components
        root: {
            minWidth: '100%',
            minHeight: '100%',
            padding: '5%',
            textAlign: 'center'
        },
        media: {
            height: 0,
            paddingTop: "56.25%", // 16:9
        },
        // links: {
        //     textAlign: 'center'
        // },
        // button: {
        //     fontSize: '0.75rem',
        // },
        gridContainer: {
            margin: '5%'
        },
        title: {
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
        let hotelResults = results.filter(result => !(result.ad_position))
        console.log(hotelResults);
        return hotelResults;
    }

    return (
        <Grid container spacing={4} direction='row' justifyContent='center' className={classes.gridContainer}>
            <Grid item xs={12} className={classes.title}>
                <h3>Hotels</h3>
            </Grid>
            <br/>
            {results.map((result, index) => {
                return(
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card className={classes.root}>
                            <CardHeader title={result.name} subheader={result.rating+' Stars'} />
                            <CardContent>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                    className={classes.links}
                                >
                                    Price:
                                    {result.price}
                                    {/* <br/> //tried getting booking links to show on condition

                                    <a href={result.business_listings.mobile_contacts[0] === null ? (<p>Unable to book at this time.</p>) : (result.business_listings.mobile_contacts[0].value)} target='blank'>Book Now!</a> */}
                                </Typography>
                            </CardContent>
                            <CardMedia className={classes.media} 
                            image={result.photo.images.original.url} 
                            />
                            {/* <CardActions disableSpacing>
                                <IconButton className={classes.button}>
                                    Save to Favs //not sure how to save result to fav table
                                    <FavoriteIcon className="fav_icon" />
                                </IconButton>
                            </CardActions> */}
                        </Card>
                    </Grid>
                )
            })}
        </Grid>
    );
};

export default Hotels;