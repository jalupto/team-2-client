import React, { useState } from "react";
import { Form, Label} from "reactstrap";
import FavoriteIcon from "@material-ui/icons/Favorite";
import {FormControl, FilledInput, Button} from "@material-ui/core/";
import "../../App.css";

const FavCreate = (props) => {
    
const [city, setCity] = useState("")
const [hotel, setHotel] = useState("");
const [hot_spot, setHot_Spot] = useState("");
const [restaurant, setRestaurant] = useState("");
const [activity, setActivity] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/favs/", {
            method: "POST",
            body: JSON.stringify({
                favs: {
                    city: city,
                    hotel: hotel,
                    hot_spot: hot_spot,
                    restaurant: restaurant,
                    activity: activity,
                },
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${props.token}`
            }),
        })
            .then((res) => res.json())
            .then((logData) => {
                console.log(logData);
                setCity("");
                setHotel("");
                setHot_Spot("");
                setRestaurant("");
                setActivity("");
                props.fetchFavs();
            });
    };

    return (
        <>
        
            <h3>Create a Favorite</h3>
            <Form className="create-fav-form" onSubmit={handleSubmit}>
                <FormControl>
                    <Label htmlFor="city">Add City:</Label>
                    <FilledInput
                        name="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </FormControl>
                <FormControl>
                    <Label htmlFor="hotel">Add Hotel:</Label>
                    <FilledInput
                        name="hotel"
                        value={hotel}
                        onChange={(e) => setHotel(e.target.value)}
                    ></FilledInput>
                </FormControl>
                <FormControl>
                    <Label htmlFor="hot_spot">Add Hot Spot:</Label>
                    <FilledInput
                        name="hot_spot"
                        value={hot_spot}
                        onChange={(e) => setHot_Spot(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <Label htmlFor="restaurant">Add Restaurant:</Label>
                    <FilledInput
                        name="restaurant"
                        value={restaurant}
                        onChange={(e) => setRestaurant(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <Label htmlFor="activity">Add Activity:</Label>
                    <FilledInput
                        name="activity"
                        value={activity}
                        onChange={(e) => setActivity(e.target.value)}
                    />
                </FormControl>
                <Button
                    className="save-fav"
                    type="submit"
                    variant="contained"
                    startIcon={<FavoriteIcon className="fav_icon" />}
                >
                    Save Favorite
                </Button>
            </Form>
        </>
    );
};

export default FavCreate;
