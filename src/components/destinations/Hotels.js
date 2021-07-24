import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardHeader, CardMedia, CardContent, CardActions, IconButton, Typography, Grid} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import "../../App.css";

const Hotels = (props) => {
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState(null);
    const [price, setPrice] = useState("");
    const [rating, setRating] = useState("");

    const getHotels = async (e) => {
        const res = await fetch(
        `https://travel-advisor.p.rapidapi.com/hotels/list-by-latlng?latitude=${props.lat}&longitude=${props.lon}&lang=en_US&limit=10&distance=10`,
        {
            method: "GET",
            headers: {
                "x-rapidapi-key":
                    "253f860dccmsh5a8313c5abb0c80p1ea8c4jsnd54b97e2bab2",
                "x-rapidapi-host":
                    "travel-advisor.p.rapidapi.com",
            },
        }
    )  
            const results = await res.json()
            const name = results.data[0].name;
            const photo = results.data[0].photo.images.original.url;
            const price = results.data[0].price;
            const rating = results.data[0].rating;
            setName(name);
            setPhoto(photo);
            setPrice(price);
            setRating(rating);
            console.log(results);
            console.log(name)
    } 

    const useStyles = makeStyles((theme) => ({
        root: {
            maxWidth: 345,
        },
        media: {
            height: 0,
            paddingTop: "56.25%", // 16:9
        },
    }));

    const classes = useStyles();

    
    useEffect(() => {
        if (props.lat && props.lon && props.city) {
            getHotels();
        }
    })
    
    return (
        <Grid container spacing={3}>
            <Grid container direction="row" justifyContent="center" spacing={3}>
                <Grid item direction="row" spacing={2} xs={2}>
                    <Card className={classes.root}>
                        <CardHeader title={name} subheader={rating} />
                        <CardMedia className={classes.media} image={photo} />
                        <CardContent>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                Price Range: {price}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon className="fav_icon" />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item direction="row" spacing={2} xs={2}>
                    <Card className={classes.root}>
                        <CardHeader title={name} subheader={rating} />
                        <CardMedia className={classes.media} image={photo} />
                        <CardContent>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                Price Range: {price}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon className="fav_icon" />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item direction="row" spacing={2} xs={2}>
                    <Card className={classes.root}>
                        <CardHeader title={name} subheader={rating} />
                        <CardMedia className={classes.media} image={photo} />
                        <CardContent>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                Price Range: {price}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon className="fav_icon" />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item direction="row" spacing={2} xs={2}>
                    <Card className={classes.root}>
                        <CardHeader title={name} subheader={rating} />
                        <CardMedia className={classes.media} image={photo} />
                        <CardContent>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                Price Range: {price}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon className="fav_icon" />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item direction="row" spacing={2} xs={2}>
                    <Card className={classes.root}>
                        <CardHeader title={name} subheader={rating} />
                        <CardMedia className={classes.media} image={photo} />
                        <CardContent>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                Price Range: {price}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon className="fav_icon" />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
                <div></div>
            <Grid container direction="row" justifyContent="center" spacing={3}>
                <Grid item direction="row" spacing={2} xs={2}>
                    <Card className={classes.root}>
                        <CardHeader title={name} subheader={rating} />
                        <CardMedia className={classes.media} image={photo} />
                        <CardContent>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                Price Range: {price}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon className="fav_icon" />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item direction="row" spacing={2} xs={2}>
                    <Card className={classes.root}>
                        <CardHeader title={name} subheader={rating} />
                        <CardMedia className={classes.media} image={photo} />
                        <CardContent>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                Price Range: {price}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon className="fav_icon" />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>{" "}
                <Grid item direction="row" spacing={2} xs={2}>
                    <Card className={classes.root}>
                        <CardHeader title={name} subheader={rating} />
                        <CardMedia className={classes.media} image={photo} />
                        <CardContent>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                Price Range: {price}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon className="fav_icon" />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item direction="row" spacing={2} xs={2}>
                    <Card className={classes.root}>
                        <CardHeader title={name} subheader={rating} />
                        <CardMedia className={classes.media} image={photo} />
                        <CardContent>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                Price Range: {price}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon className="fav_icon" />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item direction="row" spacing={2} xs={2}>
                    <Card className={classes.root}>
                        <CardHeader title={name} subheader={rating} />
                        <CardMedia className={classes.media} image={photo} />
                        <CardContent>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                Price Range: {price}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon className="fav_icon" />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    );

}

export default Hotels;