import { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Feedback from "../components/Feedbacks";
import { useNavigate, useParams } from "react-router-dom";
import { QuizContext } from "../Context/QuizProvider";
import QuestionCard from "../components/QuestionCard";
import QuestionChoices from "../components/QuestionChoices";

const transitionVariants = {
  initial: { opacitu: 0, x: 100 },
  enter: { opacitu: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacitu: 0, x: 100, transition: { duration: 0.3 } },
};

export default function StartQuiz() {
  const [showFeedBack, setShowFeedback] = useState(false);
  const [showFeedbackMessage, setShowFeedbackMessage] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const { quizState, setScore } = useContext(QuizContext);
  const resultRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const currentQuestionIndex = quizState.questions.findIndex(
    (q) => q.id === parseInt(id)
  );

  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showFeedBack]);

  const handleSelectedChoice = (choiceIndex) => {
    const correctIndex =
      quizState.questions[currentQuestionIndex].correct_index;
    if (correctIndex === undefined) return;

    setScore((prevScore) => {
      return correctIndex === choiceIndex ? prevScore + 1 : prevScore;
    });

    const feedbackType =
      correctIndex === choiceIndex ? "correct_feedback" : "wrong_feedback";
    const feedbackArray =
      quizState.questions[currentQuestionIndex][feedbackType];
    const randomIndex = Math.floor(Math.random() * feedbackArray.length);
    const feedback = feedbackArray[randomIndex];

    setShowFeedback(true);
    setShowFeedbackMessage(feedback);

    setSelectedAnswers((prevAnswer) => {
      const updatedAnswers = [...prevAnswer];
      updatedAnswers[currentQuestionIndex] = choiceIndex;
      return updatedAnswers;
    });
  };

  const handleNextQuestion = () => {
    const nextQuestion = quizState.questions[currentQuestionIndex + 1];
    if (nextQuestion) {
      navigate(`/question/${nextQuestion.id}`);
    } else {
      navigate("/end");
    }

    if (selectedAnswers[currentQuestionIndex + 1] === undefined) {
      setShowFeedback(false);
      setShowFeedbackMessage(null);
    }
  };

  const handlePrevQuestion = () => {
    const prevQuestion = quizState.questions[currentQuestionIndex - 1];
    if (prevQuestion) {
      navigate(`/question/${prevQuestion.id}`);
    }

    setShowFeedback(true);
  };

  const { isLoading, questions, error } = quizState;
  if (isLoading || error) {
    return <p>{isLoading ? `Loading...` : `Error: ${error}`}</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) return <p>No question available.</p>;

  const { img, question, choices, correct_index, fact } = currentQuestion;
  const selectedAnswer = selectedAnswers[currentQuestionIndex] ?? null;

  const feedbackData = {
    selectedAnswer,
    showFeedBack,
    showFeedbackMessage,
    correctIndex: correct_index,
    fact,
    currentQuestionIndex,
  };

  return (
    <motion.div
      className="relative mx-auto items-center justify-center flex flex-col mt-32"
      initial="initial"
      animate="enter"
      exit="exit"
      variants={transitionVariants}
      key={id}
    >
      <QuestionCard
        id={id}
        questions={questions}
        question={question}
        img={img}
      />

      <QuestionChoices choices={choices} handleSelectedChoice={handleSelectedChoice} selectedAnswer={selectedAnswer} correctIndex={correct_index} showFeedBack={showFeedBack} />

      <Feedback
        feedbackData={feedbackData}
        onNextQuestion={handleNextQuestion}
        onPrevQuestion={handlePrevQuestion}
        resultRef={resultRef}
      />
    </motion.div>
  );
}
