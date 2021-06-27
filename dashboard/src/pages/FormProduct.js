
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';



export default function FormProduct() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [name, setName] = useState([]);
    const [price, setPrice] = useState([]);
    const [imageUrl, setImageUrl] = useState([]);

    function handleSetName(e) {
        setName(e.target.value);
    }
    function handleSetPrice(e) {
        setPrice(e.target.value);
    }
    function handleSetImageUrl(e) {
        setImageUrl(e.target.value);
    }

    function submit() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                price: price,
                image_url: imageUrl
            })
        };
        fetch("http://localhost:8080/product/add", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    window.location.href = "/product"
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

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
                    <h3>New Product</h3>
                </Row>
                <Row>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" onChange={handleSetName} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" onChange={handleSetPrice} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="text" onChange={handleSetImageUrl} />
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