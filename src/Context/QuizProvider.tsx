import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Define the types for quizState
interface Question {
  id: number;
  text: string;
  question: string;
  choices: string[];
  correct_index: number;
  correct_feedback: string[];
  wrong_feedback: string[]
  fact: string;
  img: string;

}

interface QuizState {
  isLoading: boolean;
  questions: Question[];
  error: string | null;
}

interface QuizContextProps {
  quizState: QuizState;
  setQuizState: React.Dispatch<React.SetStateAction<QuizState>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

// Create QuizContext with a default value
export const QuizContext = createContext<QuizContextProps | undefined>(undefined);

interface QuizProviderProps {
  children: ReactNode;
}

export const QuizProvider = ({ children }: QuizProviderProps) => {
  const [quizState, setQuizState] = useState<QuizState>({
    isLoading: true,
    questions: [],
    error: null,
  });
  const [score, setScore] = useState<number>(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ["questions"],
    queryFn: () => axios.get("/questions.json"),
    staleTime: 30000,
  });

  useEffect(() => {
    if (!isLoading && data) {
      setQuizState({
        isLoading: false,
        questions: data.data.questions,
        error: null,
      });
    }
    if (error instanceof Error) {
      setQuizState({
        isLoading: false,
        questions: [],
        error: error.message,
      });
    }
  }, [data, isLoading, error]);

  return (
    <QuizContext.Provider value={{ quizState, setQuizState, score, setScore }}>
      {children}
    </QuizContext.Provider>
  );
};
