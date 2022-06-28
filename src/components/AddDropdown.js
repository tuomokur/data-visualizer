import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/button';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';

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
        let dropdownInput = dropdownArray.concat(dropdownOption);
        setDropdownArray(dropdownInput);
        event.target.form.elements.option.value = "";
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.createQuestion(questionInput, dropdownArray, "dropdown");
        setDropdownArray([]);
        setQuestionInput("");
    };

        return (
            <>
                <Form onSubmit={handleSubmit}>
                    <Stack gap={2} className='col-sm-6 mx-auto'>
                        <Form.Label>Dropdown question:</Form.Label>
                        <Form.Control value={questionInput} onChange={handleQuestionInput} type="text" placeholder='Write your question here' />
                        <InputGroup>
                            <FormControl onChange={handleDropdownOption}
                                name="option"
                                placeholder='Add question option'
                                aria-label='Add question option'
                                aria-describedby='basic-addon2'
                            />
                            <Button onClick={saveDropdown} variant="outline-secondary" id="button-addon2" type="button">
                                +
                            </Button>
                        </InputGroup>
                        <Button variant="primary" type="submit">Save question</Button>
                    </Stack>
                </Form>
            </>
        )
    };

    export default AddDropdown;