import React,{useState} from 'react';
import { Table } from 'reactstrap';
import {Button} from "@material-ui/core"
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from "@material-ui/icons/Update";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "../../App.css";
import APIURL from '../../helpers/environment';

//====================================================================================================================
// MADE BY JARED
//====================================================================================================================

const FavTable = (props) => {
    const [value, setValue] = useState(null);

    const deleteFav = (fav) => {
        fetch(`${APIURL}/favs/${fav.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.token}`
            })
        })
        .then(() => props.fetchFavs())
    };


const StyledRating = withStyles({
    iconFilled: {
        color: "#f180b0",
    },
    iconHover: {
        color: "#F05AA1",
    },
})(Rating);

const customIcons = {
    1: {
        icon: <SentimentVeryDissatisfiedIcon />,
        label: "Very Dissatisfied",
    },
    2: {
        icon: <SentimentDissatisfiedIcon />,
        label: "Dissatisfied",
    },
    3: {
        icon: <SentimentSatisfiedIcon />,
        label: "Neutral",
    },
    4: {
        icon: <SentimentSatisfiedAltIcon />,
        label: "Satisfied",
    },
    5: {
        icon: <SentimentVerySatisfiedIcon />,
        label: "Very Satisfied",
    },
};

function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
};


    const favMapper = () => {
        return props.favs.map((fav, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{fav.id}</th>
                    <td>{fav.city}</td>
                    <td>{fav.hotel}</td>
                    <td>{fav.restaurant}</td>
                    <td>{fav.activity}</td>
                    <td>
                        <Box
                            component="fieldset"
                            mb={3}
                            borderColor="transparent"
                        >
                            <Typography component="legend">
                                Interest Level
                            </Typography>
                            <StyledRating
                                name="customized-color"
                                defaultValue={0}
                                getLabelText={(value) =>
                                    `${value} Heart${value !== 1 ? "s" : ""}`
                                }
                                onChange={(e) => setValue(e.target.value)}
                                precision={0.5}
                                icon={<FavoriteIcon fontSize="inherit" />}
                            />
                        </Box>
                    </td>
                    <td>
                        <Button className= "update-btn" style={{backgroundColor:'#B2B0E2', color: '#5C70B5'}} onClick={() => {props.editUpdateFav(fav); props.updateOn()}}>Update<UpdateIcon /></Button>
                        <br />
                        <Button className="delete-btn" style={{backgroundColor:'#F05AA1', color: '#5C70B5'}} onClick={() => {deleteFav(fav)}}>Delete<DeleteIcon /></Button>
                    </td>
                </tr>
            );
        })
    };

    return (
        <>
            <h3 >Favorites</h3>
            <hr />
            <Table hover id='table-font'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>City</th>
                        <th>Hotel</th>
                        <th>Restaurant</th>
                        <th>Activity</th>
                        <th>Destination Rating</th>
                    </tr>
                </thead>
                <tbody>{favMapper()}</tbody>
            </Table>
        </>
    );
};

export default FavTable;