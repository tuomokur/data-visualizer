import React, { useState } from "react";
import Sidebar from '../components/Sidebar.js'
import { useNavigate } from 'react-router-dom';

import { useSurveyContext } from '../contexts/SurveyContext.js';

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


const AnswerSurvey = () => {

    const { selectedSurvey, setSelectedSurvey } = useSurveyContext();
    const { addAnswers } = useSurveyContext();

    const [answerState, setAnswerState] = useState({})

    const navigate = useNavigate();

    const handleInput = (question, event) => {
        setAnswerState({ ...answerState, [question]: event.target.value });
    };

    const handleDropdown = (question, option) => {
        setAnswerState({ ...answerState, [question]: option });
    };

    const handleSave = () => {
        const surveyId = selectedSurvey.id;

        addAnswers(answerState, surveyId);
        setSelectedSurvey({});
        navigate("/thanks", { replace: true, state: `Thank you for answering the ${selectedSurvey.surveyTitle} survey! Your answers have now been saved succesfully. ` });
    };

    let number = 0;
    const listSurveyQuestions = selectedSurvey.questions ? selectedSurvey.questions.map((question) => {
        number += 1;
        return (
            <Form.Group className="mb-3" controlId="question">
                <Form.Label>{number}. {question.questionTitle}</Form.Label>

                {(question.questionType === "freetext") ? <div>
                    <Form.Control onChange={(event) => handleInput(question.questionId, event)} placeholder="Write your answer here" />
                    <Form.Text className="text-muted"></Form.Text></div> : (null)}

                {(question.questionType === "dropdown") ? <div>
                    <Dropdown className="mb-2" as={ButtonGroup}>
                        <Button variant="light">{answerState.hasOwnProperty(question.questionId) ? answerState[question.questionId] : "Answer options"}</Button>
                        <Dropdown.Toggle variant="secondary" id="dropdown-split-basic" />
                        <Dropdown.Menu>
                            {question.dropdownQuestionOptions.map((option) => (
                                <Dropdown.Item onClick={() => handleDropdown(question.questionId, option)}>{option}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div> : (null)}
            </Form.Group>
        )
    }) : (null);

    return (
        <>
            <Container fluid className="mt-5 mb-5">
                <Row className="mr-100">
                    <Col md="auto" className="mx-5">
                        <Sidebar />
                    </Col>
                    {selectedSurvey.surveyTitle ?
                        <Col xs={7} className="text-left">
                            <div className="mb-5">
                                <h4><i>{selectedSurvey.surveyTitle}</i></h4>
                                <br />
                                <p><b>Description of the survey:</b> {selectedSurvey.surveyDescription}</p>
                            </div>
                            <Form>
                                {listSurveyQuestions}
                                <button onClick={handleSave} type="submit">Submit Answers</button>
                            </Form>
                        </Col>
                        : <Col className="text-center"><h5>First, choose a survey from the left sidebar to give your answer.</h5></Col>}
                </Row>
            </Container>
        </>
    )
};
export default AnswerSurvey;