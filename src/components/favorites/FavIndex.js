import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import FavCreate from "./FavCreate";
import FavTable from "./FavTable";
import FavEdit from "./FavEdit";
import { makeStyles } from "@material-ui/core/styles";

//====================================================================================================================
// MADE BY CHERRON
//====================================================================================================================

import APIURL from "../../helpers/environment";

const FavIndex = (props) => {
    const [favs, setFavs] = useState([]);
    const [updateActive, setUpdateActive] = useState(false);
    const [favToUpdate, setFavToUpdate] = useState({});

    const fetchFavs = () => {
        fetch(`${APIURL}/favs/`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${props.token}`
            }),
        })
            .then((res) => res.json())
            .then((logData) => {
                setFavs(logData);
                console.log(logData);
            });
    };

    const editUpdateFav = (fav) => {
        setFavToUpdate(fav);
        console.log(fav);
    };

    const updateOn = () => {
        setUpdateActive(true);
    };

    const updateOff = () => {
        setUpdateActive(false);
    };

    useEffect(() => {
        fetchFavs();
    }, []);

    const useStyles = makeStyles(() => ({ //give content spacing from edges
        root: {
            margin: '5%'
        }
    }));

    const classes = useStyles();
    
    return (
        <Grid
            container
            direction='row'
            alignContent='center'
            spacing={3}
            className={classes.root}
        >
            <Grid item xs={12}></Grid>
            <Grid item xs={3}>
                <FavCreate fetchFavs={fetchFavs} token={props.token} />
            </Grid>
            <Grid item xs={9}>
                <FavTable favs={favs} editUpdateFav={editUpdateFav} updateOn={updateOn} fetchFavs={fetchFavs} token={props.token} />
            </Grid>
            {updateActive ? <FavEdit favToUpdate={favToUpdate} updateOff={updateOff} token={props.token} fetchFavs={fetchFavs}/> : <> </>}
        </Grid>
    )
}

export default FavIndex;