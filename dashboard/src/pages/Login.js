
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    let history = useHistory();
    
    function handleSetEmail(e) {
        setEmail(e.target.value);
    }

    function handleSetPassword(e) {
        setPassword(e.target.value);
    }


    function submit() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        };
        fetch("http://localhost:8080/login", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    // setItems(result.data); 
                    if (result.data.length > 0) {
                        window.location.href = "/product"

                    } else {
                        alert("Username / Password not found")
                    }
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    return (
        <Container>
            <Row>
                <h1>Login</h1>
            </Row>
            <Row>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" onChange={handleSetEmail} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" onChange={handleSetPassword} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={submit}>
                        Submit
                    </Button>
                </Form>
            </Row>
        </Container>
    );
}