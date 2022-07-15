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
        setResultsState({ ...resultsState, [question.questionId]: event });
    };

    return (
        <>
            <Container fluid className="mt-5 sm">
                <Row>
                    <Col xs={3} className="mx-4">
                        <Sidebar />
                    </Col>
                    {(selectedSurvey.surveyTitle) ?
                        <Col className="text-center resultsSheet" xs={7}>
                            <h4 className="mb-4"><i>{selectedSurvey.surveyTitle}</i></h4>
                            <p><b>Description of the survey:</b> {selectedSurvey.surveyDescription} </p>
                            <hr style={{ background: "#c9c8b9", height: "8px" }} />
                            {selectedSurvey.questions.map(q => {
                                return q.questionType === 'freetext' || q.questionType === "multiple-choice" ? null :
                                    <div key={q.questionId} style={{ borderStyle: "solid", borderColor: "#c9c8b9", borderWidth: "4px", padding: "10px", marginBottom: "10px" }}>
                                        <div className="my-4">
                                            <h5>Choose a chart type for question; <i>{q.questionTitle}</i> </h5>
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
                                        <div>
                                            <p>Total number of answers: {(selectedSurvey.answers.map(a => a[q.questionId])).length} </p>
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
                                <h5 className="mt-5">Answers for freetext questions:</h5>
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





