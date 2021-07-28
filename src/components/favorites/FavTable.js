import React,{useState} from 'react';
import { Table, Button, } from 'reactstrap';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const FavTable = (props) => {

    const [value, setValue] = useState(null);

    const deleteFav = (fav) => {
        fetch(`http://localhost:3000/favs/${fav.id}`, {
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
        color: "#ff6d75",
    },
    iconHover: {
        color: "#ff3d47",
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
                    <td>{fav.hot_spot}</td>
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
                        <Button
                            color="warning"
                            onClick={() => {
                                props.editUpdateFav(fav);
                                props.updateOn();
                            }}
                        >
                            Update
                        </Button>
                        <Button
                            color="danger"
                            onClick={() => {
                                deleteFav(fav);
                            }}
                        >
                            Delete
                        </Button>
                    </td>
                </tr>
            );
        })
    };

    return (
        <>
            <h3 >Favorites</h3>
            <hr />
            <Table striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>City</th>
                        <th>Hotel</th>
                        <th>Hot Spot</th>
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

/*
==================================================================================================================================
ORIGINAL
==================================================================================================================================
*/

// import React from 'react';
// import { Table, Button, 
//     // Input 
// } from 'reactstrap';
// // import FavEdit from './FavEdit';

// const FavTable = (props) => {
//     const deleteFav = (fav) => {
//         fetch(`http://localhost:3000/favs/${fav.id}`, {
//             method: 'DELETE',
//             headers: new Headers({
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${props.token}`
//             })
//         })
//         .then(() => props.fetchFavs())
//     };

//     const favMapper = () => {
//         return props.favs.map((fav, index) => {
//             return(
//                 <tr key={index}>
//                     <th scope='row'>{fav.id}</th>
//                     <td>{fav.city}</td>
//                     <td>{fav.hotel}</td>
//                     <td>{fav.hot_spot}</td>
//                     <td>{fav.restaurant}</td>
//                     <td>{fav.activity}</td>
//                     <td>
//                         <Button color='warning' onClick={() => {props.editUpdateFav(fav); props.updateOn()}}>Update</Button>
//                         <Button color='danger' onClick={() => {deleteFav(fav)}}>Delete</Button>
//                     </td>
//                 </tr>
//             )
//         })
//     };

//     return (
//         <>
//             <h3>Favorites</h3>
//             <hr />
//             <Table striped>
//                 <thead>
//                     <tr>
//                         <th>#</th>
//                         <th>City</th>
//                         <th>Hotel</th>
//                         <th>Hot Spot</th>
//                         <th>Restaurant</th>
//                         <th>Activity</th>
//                     </tr>
//                 </thead>
//                 <tbody>{favMapper()}</tbody>
//             </Table>
//         </>
//     );
// };

// export default FavTable;