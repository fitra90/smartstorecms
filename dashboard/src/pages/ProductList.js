import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

export default function ProductList() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([{}]);

    function deleteItem(id) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        };
        fetch("http://localhost:8080/product/delete", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    // setItems(result.data);
                    window.location.href="/product"
                },

                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    useEffect(() => {
        fetch("http://localhost:8080/product")
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
                        <h3>Product List</h3>
                        <Link to="/new-product">Add New</Link>
                    </Row>
                    <Row>

                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td><Image src={item.image_url} thumbnail /></td>
                                        <td>
                                            <Button variant="danger" type="button" onClick={() => { deleteItem(item.id) }}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}


                            </tbody>
                        </Table>
                    </Row>

                </Container>
            </>
        );
    }

}