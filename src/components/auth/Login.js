import React, {useState} from 'react';
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useForm } from "react-hook-form";
// import "./styles.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordShown(passwordShown ? false :true);
    }

    const { register, onSubmit } = useForm();
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("http://localhost:3000/user/login", {
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
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}> 
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" onChange={(e) => setEmail(e.target.value)} name="email" value={email} placeholder="Enter email" />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input type={passwordShown ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} name="password" value={password} placeholder="Enter password"  />
                    <i onClick={togglePasswordVisibility}>{eye}</i>{" "}
                    
                </FormGroup>
                
                <Button type="submit">Login</Button>
            </Form>
        </div>
    );
};

export default Login;