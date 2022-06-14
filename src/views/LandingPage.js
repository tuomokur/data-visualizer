import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as CreateLogo } from '../pictures/createLogo.svg';
import { ReactComponent as AnswerLogo } from '../pictures/answerLogo.svg';
import { ReactComponent as ResultsLogo } from '../pictures/resultsLogo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const LandingPage = () => {

  return (
    <div>
      <Container className="mt-5">
        <Row className="text-center text-md-right">
          <h2>Let´s visualize!</h2>
        </Row>
        <Row className="text-center text-md-right">
          <h4>Create a survey, answer surveys and visualize your survey data.</h4>
        </Row>
      </Container>

      <Container fluid="xl" className="mt-5">
        <Row className="justify-content-md-center">
          <Col xs={2} className="text-center text-md-right mx-5 links">
            <Link className="mainLink" to="/create">
              <h4 className="mb-4">Create a survey</h4>
              <CreateLogo className="mb-4"/>
              <p>If you want to create a new survey, this is the place to go next.</p>
            </Link>
          </Col>

          <Col xs={2} className="text-center text-md-right mx-5 links">
            <Link className="mainLink" to="/answer">
              <h4 className="mb-4">Answer a survey</h4>
              <AnswerLogo className="mb-4"/>
              <p>Here you can find all surveys and give your answer.</p>
            </Link>
          </Col>

          <Col xs={2} className="text-center text-md-right mx-5 links">
            <Link className="mainLink" to="/results">
              <h4 className="mb-4">See the results</h4>
              <ResultsLogo className="mb-4"/>
              <p>To view some results, go here!</p>
            </Link>
          </Col>

        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;