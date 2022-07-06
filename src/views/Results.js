import Sidebar from '../components/Sidebar.js'
import { useSurveyContext } from '../contexts/SurveyContext.js';
import "./results.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

const Results = () => {
    const { selectedSurvey } = useSurveyContext();

    const surveyAnswers = selectedSurvey.answers ? selectedSurvey.answers.map(obj =>
        obj.answ) : (null); 

    const questionType = selectedSurvey.questions ? selectedSurvey.questions.map(obj =>
      obj.questionType) : (null); 
  
      console.log(surveyAnswers);
      console.log(questionType);
    
    
    // Different unique values from survey answers
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
            <Container fluid className="mt-5">
                <Row className="mr-100">
                    <Col xs={3} className="mx-5">
                        <Sidebar />
                    </Col>
                    {(selectedSurvey === undefined) ? 
                    <Col className="text-center mx-5"><h5>To see some results, choose a survey from the left sidebar.</h5></Col> :
                    <Col className="text-center resultsSheet">
                        <h5>Results of the <i>{selectedSurvey.surveyTitle}</i> survey</h5>
                        <p><b>Description of the survey:</b> {selectedSurvey.surveyDescription} </p>
                        <Container>
                          {/* {(selectedSurvey.questionType === 'freetext' ) ? 
                            <Col className="text-center mx-5">
                              <p>{freetextAnswers}</p>
                            </Col> : <p>...results are presented here...</p> } */}

                          {/* {(selectedSurvey.questionType === 'dropdown' ) ? 
                          <Col className="text-center mx-5">
                            <Pie data={data} />
                          </Col> : <p>...results are presented here...</p>} */}

                          <Pie data={data} />


                          {/* {(selectedSurvey.questionType === 'input' ) ? 
                          <Col className="text-center mx-5">
                            <Pie data={data} />
                          </Col> : <p>...results are presented here...</p>} */}

                        </Container>
                    </Col>}
                </Row>
            </Container>
        </>
    )
};

export default Results;


