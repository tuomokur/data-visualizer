import { useSurveyContext } from '../contexts/SurveyContext.js';
 
const Freetext = () => {
    const { selectedSurvey } = useSurveyContext();
 
    const freetextQuestions = selectedSurvey.surveyTitle ?
        selectedSurvey.questions.filter(q => q.questionType === "freetext")
        : (null);    
 
    return (
        <>
            {selectedSurvey.surveyTitle ? freetextQuestions.map(q => {
                const answers = selectedSurvey.answers.map(answ => answ[q.questionId])
 
                return (
                    <div style={{ borderStyle: "solid", borderColor: "#c9c8b9", borderWidth: "4px", padding: "10px", marginBottom: "10px"}}>
                        <h5 className="mb-4"> {q.questionTitle}</h5>
                        {answers.map(x => {
                            return <ul style={{ listStylePosition: "inside", padding: "0 1em" }}><li>{x}</li></ul>
                        })
                        }
                    </div>
                );
            })
            : (null)}
        </>
    )
}
 
export default Freetext
 
 

