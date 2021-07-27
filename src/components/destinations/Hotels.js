import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardHeader, CardMedia, CardContent, 
    // CardActions, IconButton, 
    Typography, Grid} from "@material-ui/core";
// import FavoriteIcon from "@material-ui/icons/Favorite";
import "../../App.css";
// import hotelDisplay from "./HotelDisplay";

const Hotels = (props) => {
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");
    const [rating, setRating] = useState("");
    const [url, setURL] = useState("");
    const [price, setPrice] = useState("");
    const [results, setResults] = useState([]);

    const getHotels = async () => {
        const res = await fetch(
            `https://travel-advisor.p.rapidapi.com/hotels/list-by-latlng?latitude=${props.lat}&longitude=${props.lon}&lang=en_US&hotel_class=4%2C5&limit=4&distance=10`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": process.env.REACT_APP_TRAVEL_KEY,
                    "x-rapidapi-host": "travel-advisor.p.rapidapi.com"
                }
            })
            const response = await res.json();
            const results = response.data;
            console.log(results);
            const name = results[0].name;
            const rating = results[0].hotel_class;
            const photo = results[0].photo.images.original.url;
            // const url = results[0].business_listings.mobile_contacts[0].value;
            const price = results[0].price;
            setName(name);
            setRating(rating);
            setPhoto(photo);
            // setURL(url);
            setPrice(price);
            setResults(response.data);
    }

    const useStyles = makeStyles((theme) => ({
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
            padding: '5%'
        }
    }));

    const classes = useStyles();

    useEffect(() => {
        // if (props.lat && props.lon && props.city) {
            getHotels();
        // }
    }, [props.lat, props.lon]);

    return (
        // <div className='main'>
        //     <div className='mainDiv'>
        //         {
        //             results.length > 0 ? <hotelDisplay results={results} classes={classes} /> : null
        //         }
        //     </div>
        // </div>
        // <></>
        <Grid container spacing={4} direction='row' justifyContent='center' className={classes.gridContainer}>
            {results.map((result, index) => {
                return(
                    <Grid item xs={12} sm={6}>
                        <Card className={classes.root} key={index}>
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
                                    {/* <br/> */}
                                    {/* <a href={result.url} target='blank'>Book Now!</a> */}
                                </Typography>
                            </CardContent>
                            <CardMedia className={classes.media} 
                            image={result.photo.images.original.url} 
                            />
                            {/* <CardActions disableSpacing>
                                <IconButton className={classes.button}>
                                    Save to Favs
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

    // return (
    //     <Grid container spacing={3}>
    //         <Grid container direction="row" justifyContent="center" spacing={3}>
    //             <Grid item direction="row" spacing={2} xs={2}>
    //                 <Card className={classes.root}>
    //                     <CardHeader title={name} subheader={rating} />
    //                     <CardMedia className={classes.media} image={photo} />
    //                     <CardContent>
    //                         <Typography
    //                             variant="body2"
    //                             color="textSecondary"
    //                             component="p"
    //                         >
    //                             Price Range: {price}
    //                         </Typography>
    //                     </CardContent>
    //                     <CardActions disableSpacing>
    //                         <IconButton aria-label="add to favorites">
    //                             <FavoriteIcon className="fav_icon" />
    //                         </IconButton>
    //                     </CardActions>
    //                 </Card>
    //             </Grid>
    //             <Grid item direction="row" spacing={2} xs={2}>
    //                 <Card className={classes.root}>
    //                     <CardHeader title={name} subheader={rating} />
    //                     <CardMedia className={classes.media} image={photo} />
    //                     <CardContent>
    //                         <Typography
    //                             variant="body2"
    //                             color="textSecondary"
    //                             component="p"
    //                         >
    //                             Price Range: {price}
    //                         </Typography>
    //                     </CardContent>
    //                     <CardActions disableSpacing>
    //                         <IconButton aria-label="add to favorites">
    //                             <FavoriteIcon className="fav_icon" />
    //                         </IconButton>
    //                     </CardActions>
    //                 </Card>
    //             </Grid>
    //             <Grid item direction="row" spacing={2} xs={2}>
    //                 <Card className={classes.root}>
    //                     <CardHeader title={name} subheader={rating} />
    //                     <CardMedia className={classes.media} image={photo} />
    //                     <CardContent>
    //                         <Typography
    //                             variant="body2"
    //                             color="textSecondary"
    //                             component="p"
    //                         >
    //                             Price Range: {price}
    //                         </Typography>
    //                     </CardContent>
    //                     <CardActions disableSpacing>
    //                         <IconButton aria-label="add to favorites">
    //                             <FavoriteIcon className="fav_icon" />
    //                         </IconButton>
    //                     </CardActions>
    //                 </Card>
    //             </Grid>
    //             <Grid item direction="row" spacing={2} xs={2}>
    //                 <Card className={classes.root}>
    //                     <CardHeader title={name} subheader={rating} />
    //                     <CardMedia className={classes.media} image={photo} />
    //                     <CardContent>
    //                         <Typography
    //                             variant="body2"
    //                             color="textSecondary"
    //                             component="p"
    //                         >
    //                             Price Range: {price}
    //                         </Typography>
    //                     </CardContent>
    //                     <CardActions disableSpacing>
    //                         <IconButton aria-label="add to favorites">
    //                             <FavoriteIcon className="fav_icon" />
    //                         </IconButton>
    //                     </CardActions>
    //                 </Card>
    //             </Grid>
    //             <Grid item direction="row" spacing={2} xs={2}>
    //                 <Card className={classes.root}>
    //                     <CardHeader title={name} subheader={rating} />
    //                     <CardMedia className={classes.media} image={photo} />
    //                     <CardContent>
    //                         <Typography
    //                             variant="body2"
    //                             color="textSecondary"
    //                             component="p"
    //                         >
    //                             Price Range: {price}
    //                         </Typography>
    //                     </CardContent>
    //                     <CardActions disableSpacing>
    //                         <IconButton aria-label="add to favorites">
    //                             <FavoriteIcon className="fav_icon" />
    //                         </IconButton>
    //                     </CardActions>
    //                 </Card>
    //             </Grid>
    //         </Grid>
    //             <div></div>
    //         <Grid container direction="row" justifyContent="center" spacing={3}>
    //             <Grid item direction="row" spacing={2} xs={2}>
    //                 <Card className={classes.root}>
    //                     <CardHeader title={name} subheader={rating} />
    //                     <CardMedia className={classes.media} image={photo} />
    //                     <CardContent>
    //                         <Typography
    //                             variant="body2"
    //                             color="textSecondary"
    //                             component="p"
    //                         >
    //                             Price Range: {price}
    //                         </Typography>
    //                     </CardContent>
    //                     <CardActions disableSpacing>
    //                         <IconButton aria-label="add to favorites">
    //                             <FavoriteIcon className="fav_icon" />
    //                         </IconButton>
    //                     </CardActions>
    //                 </Card>
    //             </Grid>
    //             <Grid item direction="row" spacing={2} xs={2}>
    //                 <Card className={classes.root}>
    //                     <CardHeader title={name} subheader={rating} />
    //                     <CardMedia className={classes.media} image={photo} />
    //                     <CardContent>
    //                         <Typography
    //                             variant="body2"
    //                             color="textSecondary"
    //                             component="p"
    //                         >
    //                             Price Range: {price}
    //                         </Typography>
    //                     </CardContent>
    //                     <CardActions disableSpacing>
    //                         <IconButton aria-label="add to favorites">
    //                             <FavoriteIcon className="fav_icon" />
    //                         </IconButton>
    //                     </CardActions>
    //                 </Card>
    //             </Grid>{" "}
    //             <Grid item direction="row" spacing={2} xs={2}>
    //                 <Card className={classes.root}>
    //                     <CardHeader title={name} subheader={rating} />
    //                     <CardMedia className={classes.media} image={photo} />
    //                     <CardContent>
    //                         <Typography
    //                             variant="body2"
    //                             color="textSecondary"
    //                             component="p"
    //                         >
    //                             Price Range: {price}
    //                         </Typography>
    //                     </CardContent>
    //                     <CardActions disableSpacing>
    //                         <IconButton aria-label="add to favorites">
    //                             <FavoriteIcon className="fav_icon" />
    //                         </IconButton>
    //                     </CardActions>
    //                 </Card>
    //             </Grid>
    //             <Grid item direction="row" spacing={2} xs={2}>
    //                 <Card className={classes.root}>
    //                     <CardHeader title={name} subheader={rating} />
    //                     <CardMedia className={classes.media} image={photo} />
    //                     <CardContent>
    //                         <Typography
    //                             variant="body2"
    //                             color="textSecondary"
    //                             component="p"
    //                         >
    //                             Price Range: {price}
    //                         </Typography>
    //                     </CardContent>
    //                     <CardActions disableSpacing>
    //                         <IconButton aria-label="add to favorites">
    //                             <FavoriteIcon className="fav_icon" />
    //                         </IconButton>
    //                     </CardActions>
    //                 </Card>
    //             </Grid>
    //             <Grid item direction="row" spacing={2} xs={2}>
    //                 <Card className={classes.root}>
    //                     <CardHeader title={name} subheader={rating} />
    //                     <CardMedia className={classes.media} image={photo} />
    //                     <CardContent>
    //                         <Typography
    //                             variant="body2"
    //                             color="textSecondary"
    //                             component="p"
    //                         >
    //                             Price Range: {price}
    //                         </Typography>
    //                     </CardContent>
    //                     <CardActions disableSpacing>
    //                         <IconButton aria-label="add to favorites">
    //                             <FavoriteIcon className="fav_icon" />
    //                         </IconButton>
    //                     </CardActions>
    //                 </Card>
    //             </Grid>
    //         </Grid>
    //     </Grid>
    // );
