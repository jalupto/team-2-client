import React from 'react';
import { Table, Button } from 'reactstrap';
import "../../App.css";
import APIURL from '../../helpers/environment';

//====================================================================================================================
// MADE BY JARED
//====================================================================================================================

const FavTable = (props) => {
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

    const favMapper = () => {
        return props.favs.map((fav, index) => {
            return(
                <tr key={index}>
                    <th scope='row'>{fav.id}</th>
                    <td>{fav.city}</td>
                    <td>{fav.hotel}</td>
                    <td>{fav.restaurant}</td>
                    <td>{fav.activity}</td>
                    <td>
                        <Button style={{backgroundColor:'#B2B0E2', color: '#5C70B5'}} onClick={() => {props.editUpdateFav(fav); props.updateOn()}}>Update</Button>
                        <Button style={{backgroundColor:'#F05AA1', color: '#5C70B5'}} onClick={() => {deleteFav(fav)}}>Delete</Button>
                    </td>
                </tr>
            )
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
                    </tr>
                </thead>
                <tbody>{favMapper()}</tbody>
            </Table>
        </>
    );
};

export default FavTable;