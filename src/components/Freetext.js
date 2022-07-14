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
                    <div className="border border-secondary border-2 rounded my-4 py-3" >
                        <h5 className=""> {q.questionTitle}</h5>
                        {answers.map(x => {
                            return <ul className="px-5"><li>{x}</li></ul>
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
 
 

