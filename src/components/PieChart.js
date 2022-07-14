import { useSurveyContext } from '../contexts/SurveyContext.js';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);
 
 
const PieChart = (props) => {
 
    const { selectedSurvey } = useSurveyContext();
 
    // const surveyAnswers = selectedSurvey.answers ? selectedSurvey.answers.filter(obj => {
    //     const question = selectedSurvey.questions.find(q => q.questionId === obj[q.questionId])
    //     return question ? question.questionType === "dropdown" : false
    // }).map(obj => obj.questionId) : (null);
 
 
    const surveyAnswers = selectedSurvey.answers ? selectedSurvey.answers.map(a => a[props.question]) : (null);
           
 
    const answerLabels = [...new Set(surveyAnswers)];
 
    const answerCounts = answerLabels.map(labels => {
        const filtered = surveyAnswers.filter(answer => answer === labels);
        return filtered.length;
    });

    const data = {
        labels: answerLabels,
        datasets: [
            {
                label: '# of Votes',
                data: answerCounts,
                backgroundColor: [
                    'rgba(2, 255, 255, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(75, 232, 50, 0.7)',
                    'rgba(175, 132, 150, 0.7)',
                ],
                borderColor: [
                    'rgba(0, 0, 0, 0.8)',
                    // 'rgba(54, 162, 235, 1)',
                    // 'rgba(255, 206, 86, 1)',
                    // 'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1.5,
            },
        ],
    };
 
    return (
        <>
          <div>
            <Pie data={data} />
          </div>
        </>
    )
}
 
export default PieChart
 
 

