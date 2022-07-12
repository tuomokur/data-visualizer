import React, { createContext } from "react";
import axios from "axios";

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
        return res
    },
    updateSurveyAnswers: async (allAnswers, id) => {
        const res = await axios.patch(`http://localhost:3001/surveys/${id}`, { answers: allAnswers });
        return res
    },
    modifySurvey: async (newSurvey, id) => {
        const res = await axios.put(`http://localhost:3001/surveys/${id}`, newSurvey)
        return res
    },
    removeSurvey: async (id) => {
        const res = await axios.delete(`http://localhost:3001/surveys/${id}`);
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