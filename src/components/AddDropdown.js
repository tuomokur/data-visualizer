import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Alert from 'react-bootstrap/Alert';

import React, { useState } from "react";
 
const AddDropdown = (props) => {
 
    const [questionInput, setQuestionInput] = useState("");
    const [dropdownOption, setDropdownOption] = useState("");
    const [dropdownArray, setDropdownArray] = useState([]);
 
    const handleQuestionInput = (event) => {
        setQuestionInput(event.target.value);
    };
    
 
    const handleDropdownOption = (event) => {
        setDropdownOption(event.target.value);
    };
   
    const saveDropdown = (event) => {
        if (dropdownOption !== "") {
            const dropdownInput = dropdownArray.concat(dropdownOption);
        setDropdownArray(dropdownInput);
        event.target.form.elements.option.value = "";
        } else {
            <Alert variant="secondary">Empty input is not allowed</Alert>
        }
        
    };
 
    const handleSubmit = (event) => {
        event.preventDefault();
        props.createQuestion(questionInput, dropdownArray);
        setDropdownArray([]);
        setQuestionInput("");
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Question:</Form.Label>
                <Form.Control value={questionInput} onChange={handleQuestionInput} type="text" placeholder='Write your question here' required />
                <br />
                <Form.Label>Add new option:</Form.Label>
                <InputGroup className="mb-3">
                    <FormControl onChange={handleDropdownOption}
                        name="option"
                        placeholder='Write option here'
                        aria-label='Add question option'
                        aria-describedby='basic-addon2'
                    />
                    <OverlayTrigger key="edit" placement="top" overlay={<Tooltip id="edit">Save and add new</Tooltip>}>
                        <Button onClick={saveDropdown} variant="outline-secondary" id="button-addon2" type="button">
                            +
                        </Button>
                    </OverlayTrigger>
                </InputGroup>
                <Form.Text className="text-muted">
                    Dropdown questions allow only one answer. Multiple choice questions allow one or multiple answers.
                </Form.Text>
                <Stack className="text-center mt-3" style={{ marginRight: "200px", marginLeft: "200px" }}>
                    <Button variant="outline-dark" type="submit">Save question</Button>
                </Stack>
            </Form>
        </>
    )
};

export default AddDropdown;
