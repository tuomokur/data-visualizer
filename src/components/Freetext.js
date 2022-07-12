import { useSurveyContext } from '../contexts/SurveyContext.js';

const Freetext = () => {
        const { selectedSurvey } = useSurveyContext();

return (
        <>
                {selectedSurvey.surveyTitle ? 
                selectedSurvey.questions.map(q => {
                  const answers = selectedSurvey.answers.filter(answ => answ.id === q.questionId);
                  console.log(answers[0].answ);

                return (
                <div className="border border-secondary border-2 rounded my-4 py-3" >
                  <h5 className=""> {q.questionTitle}</h5>
                  {answers.map(x => {
                     return <ul><li>{x.answ}</li></ul>})
                    }
                </div>
               );
              })
                : null }
        </>
  )
}

export default Freetext