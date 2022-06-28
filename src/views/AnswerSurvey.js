import React from "react";
import Sidebar from '../components/Sidebar.js'

import { useSurveyContext } from '../contexts/SurveyContext.js';
import "./results.css"

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const AnswerSurvey =  () => {
    
    const { selectedSurvey } = useSurveyContext();
    
    return (
        <>
            <Container fluid className="mt-5">
                <Row className="mr-100">
                    <Col md="auto" className="mx-5">
                        <Sidebar />
                    </Col>
                    <Col className="text-center resultsSheet">
                        <h5>Here you can answer the <i>{selectedSurvey.surveyTitle}</i> survey</h5>
                        <p><b>Description of the survey:</b> {selectedSurvey.surveyDescription}
                        </p>
                    </Col>
                </Row>
            </Container>
        </>

    )
};

export default AnswerSurvey