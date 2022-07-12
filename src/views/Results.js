import Sidebar from '../components/Sidebar.js';
import PieChart from '../components/PieChart.js';
import  BarChart  from '../components/BarChart.js';
import LineChart from '../components/LineChart.js';
import Freetext from '../components/Freetext.js';
import { useSurveyContext }  from '../contexts/SurveyContext.js';
import "./results.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Dropdown  from 'react-bootstrap/Dropdown';
import { useState }  from 'react';



const Results = () => {
    const { selectedSurvey } = useSurveyContext();
    const [ chart, setChart] = useState();

    const surveyAnswers = selectedSurvey.answers ? selectedSurvey.answers.map(obj =>
      obj.answ) : (null); 
    const questionType = selectedSurvey.questions ? selectedSurvey.questions.map(obj => obj.questionType) : (null); 
    const question = selectedSurvey.questions ? selectedSurvey.questions.map(obj => obj.questionTitle) : (null)
    const answerLabels = [...new Set(surveyAnswers)];
    const answerCounts = answerLabels.map(labels => {
        const filtered = surveyAnswers.filter(answer => answer === labels);
        return filtered.length;
      });

      const handleSelect = (e) => {
        setChart(e);
      };

    
return (
  <>
    <Container fluid className="mt-5 sm">
      <Row className="mr-100">
        <Col md="auto" className="mx-5">
          <Sidebar />
        </Col>
        {(selectedSurvey === undefined) ? 
          <Col className="text-center mx-5"><h5>To see some results, choose a survey from the left sidebar.</h5></Col> :
            <Col className="text-center resultsSheet" xs={7}>
              <h5>Results of the <i>{selectedSurvey.surveyTitle}</i> survey</h5>
              <p><b>Description of the survey:</b> {selectedSurvey.surveyDescription} </p>

                <Dropdown onSelect={handleSelect}>
                  <Dropdown.Toggle id="dropdown-button-dark" variant="secondary">
                    Chart type
                  </Dropdown.Toggle>
                  <Dropdown.Menu variant="dark">
                    <Dropdown.Item eventKey="pie">Pie chart </Dropdown.Item>
                    <Dropdown.Item eventKey="bar">Bar chart </Dropdown.Item>
                    <Dropdown.Item eventKey="line">Line chart </Dropdown.Item>
                    <Dropdown.Item>---</Dropdown.Item>
                    <Dropdown.Item>----</Dropdown.Item>
                    <Dropdown.Item eventKey="text">Free text</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item >All Charts</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown> 

                <div>
                  {chart === "pie" ?  <PieChart/> : null}
                  {chart === "bar" ?  <BarChart/> : null}
                  {chart === "text" ?  <Freetext/> : null}
                  {/* {chart === "line" ?  <LineChart/> : null} */}
                </div>
              </Col>}
          </Row>
      </Container>
  </>
    )
};

export default Results;


