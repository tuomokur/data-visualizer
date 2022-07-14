import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSurveyContext } from '../contexts/SurveyContext.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const HorizontalChart = (props) => {

    const { selectedSurvey } = useSurveyContext();
    const surveyAnswers = selectedSurvey.answers ? selectedSurvey.answers.map(a => a[props.question]) : (null);
    const answerLabels = [...new Set(surveyAnswers)];
    const answerCounts = answerLabels.map(labels => {
        const filtered = surveyAnswers.filter(answer => answer === labels);
        return filtered.length;
    });

    const options = {
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Chart.js Horizontal Bar Chart',
          },
        },
      };
      
      
    const data = {
        labels: answerLabels,
        datasets: [
          {
            label: 'Dataset 1',
            data: answerCounts,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.7)',
          },
          {
            label: 'Dataset 2',
            data: [1,3,5,6,7,8,6,19,4],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.7)',
          },
        ],
      };


    return(
        <Bar options={options} data={data} />
    ) 
}

export default HorizontalChart





