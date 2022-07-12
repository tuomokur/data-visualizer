import { Line } from 'react-chartjs-2';
import { useSurveyContext } from '../contexts/SurveyContext.js';
  

const LineChart = () => {
    const { selectedSurvey } = useSurveyContext();

    const surveyAnswers = selectedSurvey.answers ? selectedSurvey.answers.map(obj =>
        obj.answ) : (null); 
      const questionType = selectedSurvey.questions ? selectedSurvey.questions.map(obj => obj.questionType) : (null); 
      const question = selectedSurvey.questions ? selectedSurvey.questions.map(obj => obj.questionTitle) : (null)
      const answerLabels = [...new Set(surveyAnswers)];
      const answerCounts = answerLabels.map(labels => {
          const filtered = surveyAnswers.filter(answer => answer === labels);
          return filtered.length;
        });



    const data = {
        labels: answerLabels,
        datasets: [
            {
                label: 'Dataset 1',
                data: answerCounts,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
        };

  return (
    <>
        <Line data={data} />;    
    </>
  )
}

export default LineChart






