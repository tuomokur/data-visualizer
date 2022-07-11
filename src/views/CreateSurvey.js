import 'bootstrap/dist/css/bootstrap.min.css';
import "./results.css"

import AddDropdown from '../components/AddDropdown.js';
import AddFreetext from '../components/AddFreetext.js';
import AddNewOption from '../components/AddNewOption';
import Sidebar from '../components/Sidebar.js'

import { useSurveyContext } from "../contexts/SurveyContext.js";

import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { Trash } from 'react-bootstrap-icons';

import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


const CreateSurvey = () => {

    const { getNewId, addSurvey, selectedSurvey, setSelectedSurvey, modifiedSurvey } = useSurveyContext();

    const [chosenQuestionType, setChosenQuestionType] = useState("");
    const [modifyIsActive, setModifyIsActive] = useState(false);
    const [newQuestionTitle, setNewQuestionTitle] = useState("")
    const [newDropDownOption, setNewDropdownOption] = useState("")
    const [addOptionIsActive, setAddOptionIsActive] = useState(false)
    const [questionToModify, setQuestionToModify] = useState()

    const [newSurvey, setNewSurvey] = useState({
        surveyTitle: "",
        surveyDescription: "",
        questions: [],
        answers: []
    });

    useEffect(() => {
        const surveyState = selectedSurvey.surveyTitle ? {
            surveyTitle: selectedSurvey.surveyTitle,
            surveyDescription: selectedSurvey.surveyDescription,
            questions: selectedSurvey.questions,
            answers: selectedSurvey.answers,
            id: selectedSurvey.id
        } : {
            surveyTitle: "",
            surveyDescription: "",
            questions: [],
            answers: []
        };
        setNewSurvey(surveyState)
    }, [selectedSurvey])

    const navigate = useNavigate();

    const handleQuestionType = (type) => {
        setChosenQuestionType(type);
    };

    const createSurveyTitle = (event) => {
        setNewSurvey({ ...newSurvey, surveyTitle: event.target.value });
    };

    const createSurveyDescription = (event) => {
        setNewSurvey({ ...newSurvey, surveyDescription: event.target.value });
    };

    const createQuestion = (questionTitle, dropdownQuestionOptions) => {
        const questionType = chosenQuestionType
        const newQuestion = {
            questionTitle,
            dropdownQuestionOptions,
            questionType,
            questionId: getNewId()
        };
        setNewSurvey({
            ...newSurvey,
            questions: [...newSurvey.questions, newQuestion]
        });
    };

    const createNewOption = (option) => {
        
        setNewSurvey({
            ...newSurvey,
            questions: newSurvey.questions.map(q => {
                if (q.questionId === questionToModify.questionId) {
                    q.dropdownQuestionOptions.push(option);
                };
                return q
            })

        })
        setAddOptionIsActive(false);
        setQuestionToModify();
    };

    const removeQuestion = (question) => {
        const remainingQuestions = newSurvey.questions.filter((item) => item.questionId !== question.questionId);
        setNewSurvey({
            ...newSurvey,
            questions: remainingQuestions
        });
    };

    const removeOption = (question, option) => {
        setNewSurvey({
            ...newSurvey,
            questions: newSurvey.questions.map(q => {
                if ((q.questionType === "dropdown" || q.questionType === "multiple-choice") && q.questionId === question.questionId) {
                    const remainingOptions = q.dropdownQuestionOptions.filter((opt) => opt !== option)
                    q.dropdownQuestionOptions = remainingOptions;
                };
                return q;
            })
        })
    };

    const newQuestionOption = (question) => {
        setAddOptionIsActive(true)
        setQuestionToModify(question)
    };

    const modifySurveyQuestion = (event) => {
        setNewQuestionTitle(event.target.value)
    };

    const handleModify = (question) => {
        setNewSurvey({
            ...newSurvey,
            questions: newSurvey.questions.map(q => {
                if (q.questionId === question.questionId) {
                    q.questionTitle = newQuestionTitle;
                }
                return q
            })
        })
    };

    const modifyDropDownOption = (event) => {
        setNewDropdownOption(event.target.value)
    };

    const handleModifyOption = (question, option) => {
        setNewSurvey({
            ...newSurvey,
            questions: newSurvey.questions.map(q => {
                if ((q.questionType === "dropdown" || q.questionType === "multiple-choice") && q.questionId === question.questionId) {
                    const opt = []
                    q.dropdownQuestionOptions.map(dqo => {
                        if (dqo === option) {
                            dqo = newDropDownOption;
                        }
                        opt.push(dqo)
                        q.dropdownQuestionOptions = opt;
                        return q;
                    })
                };
                return q
            })
        })
    };

    const handleSave = (newSurvey) => {
        return modifyIsActive ? modifySurvey(newSurvey) : addNewSurvey(newSurvey)
    };

    const modifySurvey = (newSurvey) => {
        modifiedSurvey(newSurvey, selectedSurvey.id)
        setSelectedSurvey({});
        navigate("/thanks", { replace: true, state: `The modified survey has now been saved succesfully.` });
    };

    const addNewSurvey = (newSurvey) => {
        addSurvey(newSurvey);
        setSelectedSurvey({});
        navigate("/thanks", { replace: true, state: `Thank you for creating the ${newSurvey.surveyTitle} survey! The survey has now been saved succesfully.` });
    };

    return (
        <>
            <Container className='mt-4 text-left'>
                <h5>To modify or delete an existing survey:</h5>
                <Button onClick={() => setModifyIsActive(true)} variant="outline-secondary">Modify/delete an existing survey</Button>{' '}
            </Container>

            <Container fluid className="mt-5">
                <Row>
                    {modifyIsActive ?
                        <Col xs={3} className="mx-4">
                            <Sidebar modifyIsActive={modifyIsActive} />
                        </Col>
                        : <Col xs={2} className="mx-4"></Col>}
                    <Col xs={6} className='text-left mx-4 resultsSheet'>
                        {modifyIsActive ?
                            <div>
                                {selectedSurvey.surveyTitle ? <h4>Modify: <i>{selectedSurvey.surveyTitle}</i></h4>
                                    : <h4>Select a survey to modify from the left sidebar by clicking a survey name. If you want to delete a survey, use the trash-icon.</h4>}
                            </div>
                            :
                            <h4>To create a question, choose what kind of a question do you want to use.
                                The question types are: dropdown, multiple choices and free text.</h4>}

                        <hr style={{ background: "#c9c8b9", height: "8px" }} />

                        <Stack gap={3}>
                            <Form>
                                <Form.Label>Give your survey a short and descriptive title:</Form.Label>
                                <Form.Control onChange={createSurveyTitle} type="text" defaultValue={newSurvey.surveyTitle} />

                                <Form.Label>Write a short description of the survey:</Form.Label>
                                <Form.Control as="textarea" onChange={createSurveyDescription} rows={3}
                                    defaultValue={newSurvey.surveyDescription} />
                            </Form>

                            {newSurvey.questions.map(question =>
                                <div key={question.questionId} style={{ borderStyle: "solid", borderColor: "#c9c8b9", borderWidth: "4px", padding: "10px" }}>
                                    <>
                                        <Form>
                                            <Form.Label><b>Question {newSurvey.questions.indexOf(question) + 1}. ({question.questionType})</b></Form.Label>
                                            <Form.Control onChange={modifySurveyQuestion} defaultValue={question.questionTitle} />
                                        </Form>

                                        <ButtonGroup aria-label="Edit tools">
                                            <OverlayTrigger key="edit" placement="top" overlay={<Tooltip id="edit">Save modified question</Tooltip>}>
                                                <Button onClick={() => handleModify(question)} size="sm" variant="outline-dark">Save changes</Button>
                                            </OverlayTrigger>
                                            <OverlayTrigger key="delete" placement="top"
                                                overlay={<Tooltip id="delete">Delete question</Tooltip>}>
                                                <Button onClick={() => removeQuestion(question)} size="sm" variant="outline-dark">
                                                    <Trash className='bi bi-trash' size={20}></Trash>
                                                </Button>
                                            </OverlayTrigger>
                                        </ButtonGroup>
                                    </>
                                    <br />
                                    {(question.questionType === "dropdown" || question.questionType === "multiple-choice") ?
                                        <>
                                            {(question.questionType === "dropdown") ?
                                                <Form.Label><b>Dropdown options: </b></Form.Label>
                                                : <Form.Label><b>Multiple choice options: </b></Form.Label>}

                                            {question.dropdownQuestionOptions.map(option =>
                                                <InputGroup key={option} className="mb-3">
                                                    <Form.Control onChange={modifyDropDownOption} style={{ width: "300px", marginLeft: "100px", marginRight: "100px" }} defaultValue={option} />
                                                    <ButtonGroup aria-label="Edit tools">
                                                        <OverlayTrigger key="edit" placement="top" overlay={<Tooltip id="edit">Save modified option</Tooltip>}>
                                                            <Button onClick={() => handleModifyOption(question, option)} size="sm" variant="outline-dark">Save changes</Button>
                                                        </OverlayTrigger>
                                                        <OverlayTrigger key="delete" placement="top"
                                                            overlay={<Tooltip id="delete">Delete option</Tooltip>}>
                                                            <Button onClick={() => removeOption(question, option)} size="sm" variant="outline-dark">
                                                                <Trash className='bi bi-trash' size={20}></Trash>
                                                            </Button>
                                                        </OverlayTrigger>
                                                    </ButtonGroup>
                                                </InputGroup>

                                            )}
                                            {addOptionIsActive ? <AddNewOption createNewOption={createNewOption} /> :
                                                <Stack className="text-center" style={{ marginRight: "200px", marginLeft: "200px" }}>
                                                    <Button onClick={() => newQuestionOption(question)} variant="outline-dark">Add new option</Button>
                                                </Stack>
                                            }
                                        </>
                                        : (null)}
                                </div>
                            )}
                            <hr style={{ background: "#c9c8b9", height: "8px" }} />
                            <p>Choose what kind of a question to add:</p>

                            <ButtonGroup gap={1} aria-label="Basic example">
                                <Button onClick={() => handleQuestionType("dropdown")} variant="outline-dark">Dropdown + </Button>
                                <Button onClick={() => handleQuestionType("multiple-choice")} variant="outline-dark">Multiple choice + </Button>
                                <Button onClick={() => handleQuestionType("freetext")} variant="outline-dark">Free text + </Button>
                            </ButtonGroup>
                            <div>
                                {(chosenQuestionType === "dropdown") ? <AddDropdown createQuestion={createQuestion} /> : null}
                                {(chosenQuestionType === "multiple-choice") ? <AddDropdown createQuestion={createQuestion} /> : null}
                                {(chosenQuestionType === "freetext") ? <AddFreetext createQuestion={createQuestion} /> : null}
                            </div>
                            <button onClick={() => handleSave(newSurvey)} type="submit">Submit survey</button>
                        </Stack>

                    </Col>
                </Row >
            </Container >
        </>
    )
};
export default CreateSurvey;
