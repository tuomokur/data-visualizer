import { Routes, Route } from "react-router-dom";
import './App.css';

import Header from './components/Header.js'
import LandingPage from './views/LandingPage.js'
import AnswerSurvey from './views/AnswerSurvey.js'
import CreateSurvey from './views/CreateSurvey.js'
import Results from './views/Results.js'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />} >
        <Route index element={<LandingPage />} />
				<Route path="answer" element={<AnswerSurvey />} />
				<Route path="results" element={<Results />} />
				<Route path="create" element={<CreateSurvey />} />
      </Route>
    </Routes>
    
  );
}

export default App;
