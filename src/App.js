import { Routes, Route } from "react-router-dom";
import './App.css';

import Header from './components/Header.js'
import LandingPage from './views/LandingPage.js'
import AnswerSurvey from './views/AnswerSurvey.js'
import CreateSurvey from './views/CreateSurvey.js'
import ThankYou from './views/ThankYou.js'

import Results from './views/Results.js'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/answer" element={<AnswerSurvey />} />
          <Route path="/results" element={<Results />} />
          <Route path="/create" element={<CreateSurvey />} />
          <Route path="/thanks" element={<ThankYou />} />
        </Routes>
    </>

  );
}

export default App;
