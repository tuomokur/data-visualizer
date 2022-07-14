import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import { useSurveyContext } from '../contexts/SurveyContext.js';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PolarAreaChart = (props) => {

    const { selectedSurvey } = useSurveyContext();
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
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 12, 235, 0.5)',
              'rgba(255, 20, 86, 0.5)',
              'rgba(75, 192, 12, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',
            ],
            borderWidth: 1,
          },
        ],
      };
      
      return (
        <PolarArea data={data} />
      ) 
}

export default PolarAreaChart






