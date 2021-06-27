
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
                price:price,
                image_url : imageUrl
            })
        };
        fetch("http://localhost:8080/product/add", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    // setItems(result.data); 
                    window.location.href="/"
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
                <h1>New Product</h1>
            </Row>
            <Row>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text"  onChange={handleSetName} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" onChange={handleSetPrice} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="text" onChange={handleSetImageUrl}/>
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={submit}>
                        Submit
                    </Button>
                </Form>
            </Row>
        </Container>
    );
}