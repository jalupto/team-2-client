import React, {useState} from 'react';
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
// import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import APIURL from '../../helpers/environment';

const eye = <FontAwesomeIcon icon={faEye} />;

const Signup = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordShown(passwordShown ? false :true);
    }

    // const { register, onSubmit } = useForm();
    const handleSubmit = (event) => {    
        event.preventDefault();
        fetch(`${APIURL}/user/register`, {
            method: 'POST',
            body: JSON.stringify({user: {email: email, password: password}}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            props.updateToken(data.sessionToken)
        })
    }  

    return(
        <div>
            <h1>Sign up</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" onChange={(e) => setEmail(e.target.value)} 
                    name="email" value={email} required placeholder="Enter email here" />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input type={passwordShown ? "text" : "password"} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" onChange={(e) => setPassword(e.target.value)} required name="password" value={password} placeholder="Enter password"  />
                    <i onClick={togglePasswordVisibility}>{eye}</i>{" "}
                    </FormGroup>
                <Button type="submit">Sign Up</Button>
            </Form>
        </div>
    );
};
// pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])"

export default Signup;

