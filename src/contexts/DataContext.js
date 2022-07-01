import React, { createContext } from "react";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';


export const DataContext = createContext(undefined);

const dataHandling = {

    getAllSurveys: async () => {
        const { data } = await axios.get("http://localhost:3001/surveys");
        return data;
    },

    getOneSurvey: async (id) => {
        const { data } = await axios.get("http://localhost:3001/surveys/", id);
        return data;
    },

    saveNewSurvey: async (survey) => {
        const res = await axios.post("http://localhost:3001/surveys/", survey);
        <Alert variant="info">The survey was saved successfully!</Alert>;
        return res
    },
    updateSurvey: async (allAnswers, id) => {
        const res = await axios.patch(`http://localhost:3001/surveys/${id}`, { answers: allAnswers });
        return res
    }
};

const DataContextProvider = (props) => {

    const data = dataHandling;

    return (
        <DataContext.Provider value={ data }>
            {props ? props.children : (null)}
        </DataContext.Provider>
    )
};


export default DataContextProvider;