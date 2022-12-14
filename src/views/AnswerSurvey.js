import React, { useState } from "react";
import Sidebar from '../components/Sidebar.js'
import { useNavigate } from 'react-router-dom';

import { useSurveyContext } from '../contexts/SurveyContext.js';

import "./results.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


const AnswerSurvey = () => {

    const { addAnswers, selectedSurvey, setSelectedSurvey } = useSurveyContext();

    const [answerState, setAnswerState] = useState({});
    const [checkOptions, setCheckOptions] = useState({ options: [] });

    const navigate = useNavigate();

    const handleInput = (question, event) => {
        setAnswerState({ ...answerState, [question]: event.target.value });
    };

    const handleDropdown = (question, option) => {
        setAnswerState({ ...answerState, [question]: option });
    };
    
    const handleMultipleChoices = (question, event) => {

        const { value, checked } = event.target;
        const { options } = checkOptions;

        if (checked) {
            setCheckOptions({
                options: [...options, { id: question.questionId, opt: value }]
                //options: [...options, value]
            });
        }
        //Tämä ei toimi vielä oikein, error: opt.filter is not a function
        else {
            
            setCheckOptions({
                
                options: options.map(opt => {const arr = opt.filter(item => item[1].opt !== value); return arr})
                //options: [options.filter(opt => opt !== value)]
            });
        };
    };    

    const handleSave = (event) => {
        event.preventDefault();
        const surveyId = selectedSurvey.id;

        addAnswers(answerState, surveyId);
        setSelectedSurvey({});
        navigate("/thanks", { replace: true, state: `Thank you for answering the ${selectedSurvey.surveyTitle} survey! Your answers have now been saved succesfully. ` });
    };

    let number = 0;
    const listSurveyQuestionsDOM = selectedSurvey.questions ? selectedSurvey.questions.map((question) => {
        number += 1;
        return (
            <Form.Group key={question.questionid} className="mb-3" style={{ borderStyle: "solid", borderColor: "#c9c8b9", borderWidth: "4px", padding: "10px" }} >
                <Form.Label>{number}. {question.questionTitle}</Form.Label>

                {(question.questionType === "freetext") ? <div>
                    <Form.Control as="textarea" onChange={(event) => handleInput(question.questionId, event)} placeholder="Write your answer here" />
                </div> : (null)}

                {(question.questionType === "dropdown") ? <div>
                    <Dropdown className="mb-2" as={ButtonGroup}>
                        <Button variant="light" type="button">{answerState.hasOwnProperty(question.questionId) ? answerState[question.questionId] : "Answer options"}</Button>
                        <Dropdown.Toggle variant="secondary" id="dropdown-split-basic" />
                        <Dropdown.Menu>

                            {question.dropdownQuestionOptions.map((option) => (
                                <Dropdown.Item onClick={() => handleDropdown(question.questionId, option)}>{option}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div> : (null)}
                {(question.questionType === "multiple-choice") ?
                    <div>
                        {question.dropdownQuestionOptions.map(opt => (
                            <div key={opt} className="mx-4">
                                <Form.Check
                                    type="checkbox"
                                    name="option"
                                    value={opt}
                                    id={opt}
                                    label={opt}
                                    onChange={(event) => handleMultipleChoices(question, event)}
                                />
                            </div>
                        ))}
                    </div> : (null)}
            </Form.Group>
        )
    }) : (null);

    return (
        <Container fluid className="my-5">
            <Row>
                <Col xs={3} className="mx-4">
                    <Sidebar />
                </Col>
                {selectedSurvey.surveyTitle ?
                    <Col xs={7} className="text-left resultsSheet">
                        <div>
                            <h4 className="text-center mb-3"><i>{selectedSurvey.surveyTitle}</i></h4>
                            <p className="text-center mb-4"><b>Description of the survey:</b> {selectedSurvey.surveyDescription}</p>
                        </div>
                        <hr style={{ background: "#c9c8b9", height: "8px" }} />
                        <Form>
                            {listSurveyQuestionsDOM}
                            <Button onClick={handleSave} variant="outline-dark" type="submit" style={{ width: "100%"}}>Submit Answers</Button>
                        </Form>
                    </Col>
                    : <Col ><h5>First, choose a survey from the left sidebar to give your answer.</h5></Col>}
            </Row>
        </Container>

    )
};
export default AnswerSurvey;
