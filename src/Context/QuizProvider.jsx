import { createContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query"
import PropTypes from 'prop-types'
import axios from "axios";

export const QuizContext = createContext();

export const QuizProvider = ({children}) => {
  const [quizState, setQuizState] = useState({
                                              isLoading: true,
                                              questions: [],
                                              error: null,
                                            });
  const [score, setScore] = useState(0);
  

  const { data, isLoading, error } = useQuery({
    queryKey: ["questions"],
    queryFn: () => {
      return axios.get("/questions.json");
    },
    staleTime: 30000
  })
  
  useEffect(() => {
    if(!isLoading && data) {
      setQuizState({ isLoading: false, questions: data.questions, error: null })
    }
    if(error) {
      setQuizState({ isLoading: false, questions: data.questions, error: error.message })
    }
  }, [data, isLoading, error])

  return (
   <QuizContext.Provider value={{quizState, setQuizState, score, setScore}}>
    {children}
   </QuizContext.Provider>
  )
}

QuizProvider.propTypes = {
  children: PropTypes.object
}