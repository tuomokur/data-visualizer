import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const AddFreetext = (props) => {

    const [input, setInput] = useState("");

    const handleInput = (event) => {
        setInput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.createQuestion(input, "", "freetext");
        setInput("");
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Free text question:</Form.Label>
                    <Form.Control onChange={handleInput}
                        value={input}
                        placeholder="Write your question here and click 'Save'" />
                    <Form.Text className="text-muted">
                        Answer type will be a free text multi-line answer.
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">Save question</Button>
            </Form>
        </>
    )
};

export default AddFreetext;