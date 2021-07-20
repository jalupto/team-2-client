import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

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
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="city">Add City:</Label>
                    <Input
                        name="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    required/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="hotel">Add Hotel:</Label>
                    <Input
                        name="hotel"
                        value={hotel}
                        onChange={(e) => setHotel(e.target.value)}
                    ></Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="hot_spot">Add Hot Spot:</Label>
                    <Input
                        name="hot_spot"
                        value={hot_spot}
                        onChange={(e) => setHot_Spot(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="restaurant">Add Restaurant:</Label>
                    <Input
                        name="restaurant"
                        value={restaurant}
                        onChange={(e) => setRestaurant(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="activity">Add Activity:</Label>
                    <Input
                        name="activity"
                        value={activity}
                        onChange={(e) => setActivity(e.target.value)}
                    />
                </FormGroup>
                <Button type="submit">Click to Save</Button>
            </Form>
        </>
    );
};

export default FavCreate;
