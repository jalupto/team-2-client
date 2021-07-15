import React from 'react';
import { Table, Button } from 'reactstrap';

const FavTable = (props) => {
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

    const favMapper = () => {
        return props.favs.map((fav, index) => {
            return(
                <tr key={index}>
                    <th scope='row'>{fav.id}</th>
                    <td>{fav.city}</td>
                    <td>{fav.hotel}</td>
                    <td>{fav.hot_spot}</td>
                    <td>{fav.restaurant}</td>
                    <td>{fav.activity}</td>
                    <td>
                        <Button color='warning' onClick={() => {props.editUpdateFav(fav); props.updateOn()}}>Update</Button>
                        <Button color='danger' onClick={() => {deleteFav(fav)}}>Delete</Button>
                    </td>
                </tr>
            )
        })
    };

    return (
        <>
            <h3>Favorites</h3>
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
                    </tr>
                </thead>
                <tbody>{favMapper()}</tbody>
            </Table>
        </>
    );
};

export default FavTable;