import React, { useState } from "react";
import { useSurveyContext } from "../contexts/SurveyContext.js";

import 'bootstrap/dist/css/bootstrap.min.css';

import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Modal from 'react-bootstrap/Modal';

import { Trash, Pencil } from 'react-bootstrap-icons';


const Sidebar = (props) => {

    const { selectedSurvey, setSelectedSurvey, deleteSurvey, allSurveys } = useSurveyContext();

    const [show, setShow] = useState(false)

    const handleClick = (survey) => {
        setSelectedSurvey(survey);
    };

    const handleDelete = (survey) => {
        deleteSurvey(survey.id);
        setSelectedSurvey({})
        setShow(false);
    };

    const surveyListDOM = allSurveys.map(survey =>
        <ListGroup key={survey.id} as="ol" variant="flush">
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
                action onClick={() => handleClick(survey)}
                > 
                <div className="ms-2 me-auto">
                    {survey.surveyTitle}
                </div>
                
                {props.modifyIsActive ? 
                <ButtonGroup aria-label="Edit tools">
                    <OverlayTrigger key="edit" placement="top" overlay={<Tooltip id="edit">Modify</Tooltip>}>
                        <Button onClick={() => handleClick(survey)} size="sm" variant="light" align="end">
                            <Pencil className='bi bi-pencil' size={20}></Pencil>
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger key="delete" placement="top" overlay={<Tooltip id="delete">Delete</Tooltip>}>
                        <Button onClick={() => setShow(true)} size="sm" variant="light" align="end">
                            <Trash className='bi bi-trash' size={20}></Trash>
                        </Button>
                    </OverlayTrigger>
                </ButtonGroup>
                : (null)
                }
            </ListGroup.Item>
        </ListGroup>
    )

    return (
        <div>
            <h5><i>List of available surveys:</i></h5>
            {surveyListDOM}
            <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {selectedSurvey.surveyTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you wan't to delete the survey?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => handleDelete(selectedSurvey)}> Yes, delete!</Button>
                    <Button variant="secondary" onClick={() => setShow(false)}>No, go back</Button>
                    <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default Sidebar;