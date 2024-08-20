import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types'

export const QuizContext = createContext();

export const QuizProvider = ({children}) => {
  const [quizState, setQuizState] = useState({
                                              isLoading: true,
                                              questions: [],
                                              error: null,
                                            });
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/questions.json");
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();
        setQuizState({ isLoading: false, questions: data.questions });
      } catch (error) {
        setQuizState({ isLoading: false, questions: [], error: error.message });
      }
    };

    fetchQuestions();
  }, []);
  

  return (
   <QuizContext.Provider value={{quizState, setQuizState, score, setScore}}>
    {children}
   </QuizContext.Provider>
  )
}

QuizProvider.propTypes = {
  children: PropTypes.object
}