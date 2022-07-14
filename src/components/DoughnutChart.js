import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSurveyContext } from '../contexts/SurveyContext.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = (props) => {

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
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  return(

    <Doughnut data={data} />
  )

}

export default DoughnutChart


