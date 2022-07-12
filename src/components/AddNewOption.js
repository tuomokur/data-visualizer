import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import React, { useState } from "react";

const AddNewOption = (props, question) => {

    const [dropdownOption, setDropdownOption] = useState("");

    const handleDropdownOption = (event) => {
        setDropdownOption(event.target.value);
    };

    const saveNewOption = (event) => {
        props.createNewOption(dropdownOption);
        event.target.form.elements.option.value = "";
    };

    return (
        <>
            <Form>
                <Form.Label>Add new option:</Form.Label>
                <InputGroup className="mb-3">
                    <FormControl onChange={handleDropdownOption}
                        name="option"
                        placeholder='Write option here'
                        aria-label='Add question option'
                        aria-describedby='basic-addon1' />

                    <OverlayTrigger key="edit" placement="top" overlay={<Tooltip id="edit">Save new option</Tooltip>}>
                        <Button onClick={saveNewOption} variant="outline-secondary" id="button-addon2" type="button">
                            +
                        </Button>
                    </OverlayTrigger>
                </InputGroup>
            </Form>
        </>
    )
};

export default AddNewOption;