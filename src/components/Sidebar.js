import React from "react";
import { useSurveyContext } from "../contexts/SurveyContext.js";

import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';


const Sidebar = () => {

    const { setSelectedSurvey } = useSurveyContext();
    const { allSurveys } = useSurveyContext();
    
    const handleClick = (survey) => {
        setSelectedSurvey(survey);
    };
        
    const surveyListDOM = allSurveys.map(survey =>
        <ListGroup key={survey.id} variant="flush">
            <ListGroup.Item action onClick={() => handleClick(survey)}>
                {survey.surveyTitle}
            </ListGroup.Item>
        </ListGroup>
    )

    return (
        <div>
            <h5><i>List of available surveys:</i></h5>
            {surveyListDOM}
        </div>

    )
}
export default Sidebar;