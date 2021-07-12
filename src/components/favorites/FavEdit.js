import React, {useState} from 'react';
import { Button, Form, FormGroup, Label, Input, 
    // Modal, ModalHeader, ModalBody 
} from 'reactstrap';

const FavEdit = (props) => {
    const [editCity, setEditCity] = useState(props.favToUpdate.city);
    const [editHotel, setEditHotel] = useState(props.favToUpdate.hotel);
    const [editHot_Spot, setEditHot_Spot] = useState(props.favToUpdate.hot_spot);
    const [editRest, setEditRest] = useState(props.favToUpdate.restaurant);
    const [editAct, setEditAct] = useState(props.favToUpdate.activity);
    const [isDisabled, setIsDisabled] = useState(true);

    const handleDis = () => {
        setIsDisabled(!isDisabled);
    };

    const favUpdate = (event, fav) => {
        event.preventDefault();
        fetch(`http://localhost:3000/favs/${props.favToUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({fav: {
                city: editCity, hotel: editHotel, hot_spot: editHot_Spot, restaurant: editRest, activity: editAct
            }}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.token}`
            })
        }).then((res) => {
            props.fetchFavs();
            props.updateOff();
        })
    };

    return(
        // <Modal isOpen={true}>
        //     <ModalHeader>Update your favorite destination</ModalHeader>
        //     <ModalBody>
                <Form onSubmit={favUpdate}>
                    <Button type='button' onClick={handleDis}>UPDATE</Button>
                    <FormGroup>
                        <Label htmlFor='city'>Edit City:</Label>
                        <Input disabled={isDisabled} name='city' value={editCity} onChange={(e) => setEditCity(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='hotel'>Edit Hotel:</Label>
                        <Input disabled={isDisabled} name='hotel' value={editHotel} onChange={(e) => setEditHotel(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='hot_spot'>Edit Hot Spot:</Label>
                        <Input disabled={isDisabled} name='hot_spot' value={editHot_Spot} onChange={(e) => setEditHot_Spot(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='restaurant'>Edit Restaurant:</Label>
                        <Input disabled={isDisabled} name='restaurant' value={editRest} onChange={(e) => setEditRest(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='activity'>Edit Activity:</Label>
                        <Input disabled={isDisabled} name='activity' value={editAct} onChange={(e) => setEditAct(e.target.value)}/>
                    </FormGroup>
                    <Button type='submit'>SAVE</Button>
                </Form>
            // </ModalBody>
        // </Modal>
    );
};

export default FavEdit;