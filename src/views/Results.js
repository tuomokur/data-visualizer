import Sidebar from '../components/Sidebar.js';
import PieChart from '../components/PieChart.js';
import DoughnutChart from '../components/DoughnutChart.js';
import RadarChart from '../components/RadarChart.js';
import HorizontalChart from '../components/HorizontalChart.js';
import BarChart from '../components/BarChart.js';
import PolarAreaChart from '../components/PolarAreaChart.js';
import Freetext from '../components/Freetext.js';
import { useSurveyContext } from '../contexts/SurveyContext.js';
import "./results.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';
 
 
 
const Results = () => {
 
    const { selectedSurvey } = useSurveyContext();
    const [resultsState, setResultsState] = useState({});
 
 

    // MUUTTUJAT CHART KOMPONENTEILLE JOILLA SAADAAN KUVAAJALLE DATAA. KÄYTÄ UUDEN CHARTIN LUONNISSA!
    // const surveyAnswers = selectedSurvey.answers ? selectedSurvey.answers.map(obj =>
    //     obj.answ) : (null);
    // const questionType = selectedSurvey.questions ? selectedSurvey.questions.map(obj => obj.questionType) : (null);
    // const question = selectedSurvey.questions ? selectedSurvey.questions.map(obj => obj.questionTitle) : (null)
    // const answerLabels = [...new Set(surveyAnswers)];
    // const answerCounts = answerLabels.map(labels => {
    //     const filtered = surveyAnswers.filter(answer => answer === labels);
    //     return filtered.length;
    // });
 

    const handleSelect = (question, event) => {
        setResultsState({ ...resultsState, [question.questionId]: event});
    };
 
    return (
        <>
            <Container fluid className="mt-5 sm">
                <Row className="mr-100">
                    <Col md="auto" className="mx-5">
                        <Sidebar />
                    </Col>
                    {(selectedSurvey.surveyTitle) ?
                        <Col className="text-center resultsSheet mx-auto" md={7}>
                            <h5>Results of the <i>{selectedSurvey.surveyTitle}</i> survey</h5>
                            <p><b>Description of the survey:</b> {selectedSurvey.surveyDescription} </p>
                            {selectedSurvey.questions.map(q =>
                            { return q.questionType === 'freetext' ? null : 
                                <div key={q.questionId}>
                                    <div className="my-4">
                                        <h5>Choose chart type for answers of dropdown question; <i>{q.questionTitle}</i> </h5>
                                        <Dropdown onSelect={(event) => handleSelect(q, event)}>
                                            <Dropdown.Toggle id="dropdown-button-dark" variant="secondary">
                                                Chart type
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu variant="dark">
                                                <Dropdown.Item eventKey="pie">Pie chart </Dropdown.Item>
                                                <Dropdown.Item eventKey="doughnut">Doughnut chart</Dropdown.Item>
                                                <Dropdown.Item eventKey="polar">Polar area chart</Dropdown.Item>
                                                <Dropdown.Item eventKey="radar">Radar chart</Dropdown.Item>
                                                <Dropdown.Item eventKey="bar">Bar chart</Dropdown.Item>
                                                <Dropdown.Item eventKey="horizon">Horizontal chart</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className="w-50 mx-auto" xs={5}>
                                        {resultsState[q.questionId] === "pie" ? <PieChart question={q.questionId} /> : null}
                                        {resultsState[q.questionId] === "bar" ? <BarChart question={q.questionId} /> : null}
                                        {resultsState[q.questionId] === "polar" ? <PolarAreaChart question={q.questionId} /> : null}
                                        {resultsState[q.questionId] === "doughnut" ? <DoughnutChart question={q.questionId} /> : null}
                                        {resultsState[q.questionId] === "horizon" ? <HorizontalChart question={q.questionId} /> : null}
                                        {resultsState[q.questionId] === "radar" ? <RadarChart question={q.questionId} /> : null}
                  
                                    </div>
                                </div>
                                 }
                            )}
                            
                            <div>
                                <h5 className="mt-5">Here are the answers for freetext questions:</h5>
                                <Freetext />
                            </div>
                        </Col>
                        : <Col className="text-left"><h5>To see some results, choose a survey from the left sidebar.</h5></Col>}
                </Row>
            </Container>
        </>
    )
};
 
export default Results;
 
 
 
 
 
// jatkokehitys
// - vastausmäärät results sivulla
// - mitä tapahtuu jo vastatuille arvoille jos olemassa olevaa surveytä muutetaan?