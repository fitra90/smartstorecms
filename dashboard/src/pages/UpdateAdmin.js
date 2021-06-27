
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function UpdateAdmin() {
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
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" />
                        </Form.Group>
                        <Button variant="success" type="button">
                            Submit
                        </Button>
                    </Form>
                </Row>
            </Container>
        </>
    );
}