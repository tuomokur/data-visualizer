import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { useSurveyContext } from '../contexts/SurveyContext.js';

ChartJS.register( RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend );

const RadarChart = (props) => {

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
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(155, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      };
      

    return(
        <Radar data={data} />
    ) 
}

export default RadarChart



