import React, { createContext, useState, useContext, useEffect } from "react";
import { DataContext } from "./DataContext.js";

const SurveyContext = createContext(undefined);

const SurveyContextProvider = (props) => {

    const dataContext = useContext(DataContext);

    const [ selectedSurvey, setSelectedSurvey ] = useState({});
    const [ allSurveys, setAllSurveys ] = useState([]);
    
    useEffect(() => {
        const getAllSurveys = async () => {
            const surveys = await dataContext.getAllSurveys();
            
            setAllSurveys(surveys);
        };
        getAllSurveys();
    }, []);

    const addSurvey = (newSurvey) => {
        setAllSurveys([...allSurveys, newSurvey]);
        dataContext.saveNewSurvey(newSurvey);
    };

    const deleteSurvey = (id) => {
        const surveysExceptDeleted = allSurveys.filter(survey => survey.id !== id);
        setAllSurveys(surveysExceptDeleted);
        
    };

    const addAnswers = (newAnswers, id) => {
        const allAnswers = selectedSurvey.answers.concat(newAnswers);
        dataContext.updateSurvey(allAnswers, id);
    };

    const getNewId = () => {
        while (true) {
            const newId = Math.floor(Math.random() * 1000);
            const foundSurvey = allSurveys.find(survey => survey.questions.id === newId);
            if (foundSurvey) continue;
            else return newId;
        }
    };

    return (
        <SurveyContext.Provider value={{allSurveys, deleteSurvey, addSurvey, getNewId, selectedSurvey, setSelectedSurvey, addAnswers}}>
            {props ? props.children : (null)}
        </SurveyContext.Provider>
    );
};

export const useSurveyContext = () => {
    const survey = useContext(SurveyContext);
    if (!survey) throw new Error("must be used within it's provider");
    return survey;
};

export default SurveyContextProvider;