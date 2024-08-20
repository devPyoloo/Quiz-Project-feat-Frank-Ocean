import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import StartQuiz from "./components/Start";
import Home from './components/Home';
import { QuizProvider } from './Context/QuizProvider';
import { End } from './components/End';

export default function App() {
  return (
    <QuizProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/question/:id" element={<StartQuiz />} />
          <Route path="/end" element={<End />} />
        </Routes>
      </Router>
    </QuizProvider>

  );
}
