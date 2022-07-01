import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import AddInput from '../components/AddInput.js';
import AddDropdown from '../components/AddDropdown.js';
import AddFreetext from '../components/AddFreetext.js';
import { useSurveyContext } from "../contexts/SurveyContext.js";

import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { Trash, Pencil } from 'react-bootstrap-icons';

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const CreateSurvey = () => {

    const { getNewId } = useSurveyContext();
    const { addSurvey } = useSurveyContext();

    const [surveyTitle, setSurveyTitle] = useState("");
    const [surveyDescription, setSurveyDescription] = useState("");

    const [newSurvey, setNewSurvey] = useState({ surveyTitle: "", surveyDescription: "", questions: [], answers: [] });
    const [questionType, setQuestionType] = useState("");

    const navigate = useNavigate();

    const handleClick = (type) => {
        setQuestionType(type);
    };

    const createSurveyTitle = (event) => {
        setSurveyTitle(event.target.value);
    };

    const createSurveyDescription = (event) => {
        setSurveyDescription(event.target.value);
    };

    const createQuestion = (questionTitle, dropdownQuestionOptions, questionType) => {
        const newQuestion = {
            questionTitle,
            dropdownQuestionOptions,
            questionType,
            questionId: getNewId()
        };
        setNewSurvey({
            ...newSurvey,
            surveyTitle: surveyTitle, surveyDescription: surveyDescription,
            questions: [...newSurvey.questions, newQuestion]
        });
    };

    const removeQuestion = (question) => {
        const remainingQuestions = newSurvey.questions.filter((item) => item.id !== question.id);
        setNewSurvey({
            ...newSurvey,
            questions: remainingQuestions
        });
    };

    const handleSave = (event) => {
        addSurvey(newSurvey);
        navigate("/thanks", { replace: true, state: `Thank you for creating the ${surveyTitle} survey! The survey has now been saved succesfully.` });
    };

    return (
        <div className='createSurvey'>
            <Container className='col-md-8 mx-auto my-4'>
                <h4>To create a question, choose what kind of a question do you want to use. The question types are: drop-down list, input field and free text area.</h4>
            </Container>
            <Container>
                <Stack gap={2} className='col-sm-6 mx-auto'>

                    <label htmlFor="">Give your survey a short and descriptive title:</label>
                    <input onChange={createSurveyTitle} type="text" placeholder='write title here' />
                    <label htmlFor="">Write a short description of the survey:</label>
                    <textarea onChange={createSurveyDescription} name="surveyDescription" id="surveyDescription" cols="30" rows="5"></textarea>

                    {newSurvey.questions.map((question) => (
                        <Container fluid>
                            <Row>
                                <Col className="text-left">
                                    <p><b>Question {newSurvey.questions.indexOf(question) + 1}, </b> ({question.questionType}): {question.questionTitle}</p>

                                    <p>{(question.dropdownQuestionOptions) ? `Dropdown options: ${question.dropdownQuestionOptions}` : ""}</p>
                                </Col>
                                <Col xs={1} className="text-center">
                                    <ButtonGroup aria-label="Edit tools">
                                        <OverlayTrigger key="edit" placement="top" overlay={
                                                <Tooltip id="edit">Edit</Tooltip>
                                            }>
                                            <Button size="sm" variant="light">
                                                <Pencil className='bi bi-pencil' size={20}></Pencil>
                                            </Button>
                                        </OverlayTrigger>
                                        <OverlayTrigger key="delete" placement="top"
                                            overlay={
                                                <Tooltip id="delete">Delete</Tooltip>
                                            }>
                                            <Button onClick={() => removeQuestion(question)} size="sm" variant="light">
                                                <Trash className='bi bi-trash' size={20}></Trash>
                                            </Button>
                                        </OverlayTrigger>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                        </Container>
                    ))}

                    <p>Choose  what kind of a question to add.</p>

                    <ButtonGroup gap={1} aria-label="Basic example">
                        <Button onClick={() => handleClick("dropdown")} variant="primary">Dropdown + </Button>
                        <Button onClick={() => handleClick("input")} variant="primary">Input + </Button>
                        <Button onClick={() => handleClick("freetext")} variant="primary">Free text + </Button>
                    </ButtonGroup>
                    <div>
                        {(questionType === "dropdown") ? <AddDropdown createQuestion={createQuestion} /> : null}
                        {(questionType === "input") ? <AddInput /> : null}
                        {(questionType === "freetext") ? <AddFreetext createQuestion={createQuestion} /> : null}
                    </div>
                    <button onClick={handleSave} type="submit">Submit survey</button>
                </Stack>

            </Container>

        </div>
    )
};
export default CreateSurvey;
