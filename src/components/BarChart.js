import { useSurveyContext } from '../contexts/SurveyContext.js';
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);
  
const BarChart = () => {
    const { selectedSurvey } = useSurveyContext();

    const surveyAnswers = selectedSurvey.answers ? selectedSurvey.answers.map(obj =>
        obj.answ) : (null); 
    
    const answerLabels = [...new Set(surveyAnswers)];
    
    const answerCounts = answerLabels.map(labels => {
        const filtered = surveyAnswers.filter(answer => answer === labels);
        return filtered.length;
      });
    const labels = answerLabels;
      
    const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: answerCounts,
            backgroundColor: 'rgba(55, 99, 132, 1)',
          },
        ],
      };
      
  return (
    <>
       <Bar data={data} />
    </>
  )
}

export default BarChart



