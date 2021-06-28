
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState, useEffect } from 'react';

export default function UpdateAdmin() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSetName(e) {
        setName(e.target.value);
    }
    function handleSetEmail(e) {
        setEmail(e.target.value);
    }
    function handleSetPassword(e) {
        setPassword(e.target.value);
    }
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([{}]);
    useEffect(() => {
        fetch("http://localhost:8080/admin/1")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result.data);
                },

                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand href="#home">SmartStore</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="./product">Products</Nav.Link>
                        <Nav.Link href="./update-admin">Update Admin</Nav.Link>
                    </Nav>
                    <Form inline>
                        <Button variant="outline-light" onClick={() => { window.location.href = '/' }}>Logout</Button>
                    </Form>
                </Navbar>

                <Container>
                    <br />
                    <Row>
                        <h3>Update Admin</h3>
                    </Row>
                    <Row>
                        <Form>
                            <Form.Group controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" defaultValue={items[0].name}  onChange={handleSetName}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" defaultValue={items[0].email} onChange={handleSetEmail}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password"  onChange={handleSetPassword} />
                            </Form.Group>
                            <Button variant="success" type="button" onClick={submit}>
                                Submit
                            </Button>
                        </Form>
                    </Row>
                </Container>
            </>
        );
    }

    function submit() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        };
        fetch("http://localhost:8080/admin-update/1", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    window.location.href = "/update-admin"
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

}