import React from "react";
import { useLocation, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ThankYou = () => {

    const location = useLocation();

    return (
        <>
            <Container className="mt-5">
                <Row className="justify-content-md-center">
                    <Col xs={8} className="text-center">
                        <h4>{location.state}</h4>
                        <br />
                        <h4>Where next?</h4>
                        <br />
                        <Row className="mt-5 mb-5">
                            <Col>
                                <Link className="mainLink" to="/answer">
                                    <h5 className="mb-4">Answer another survey</h5>
                                </Link>
                            </Col>
                            <Col>
                                <Link className="mainLink" to="/create">
                                    <h5 className="mb-4">Create or modify survey</h5>
                                </Link>
                            </Col>
                            <Col className="mb-5">
                                <Link className="mainLink" to="/results">
                                    <h5 className="mb-4">See some results</h5>
                                </Link>
                            </Col>
                        </Row>
                        <h5>Or, if you are ready for now, have a nice day!</h5>
                    </Col>
                </Row>
            </Container>
        </>
    )
};

export default ThankYou;