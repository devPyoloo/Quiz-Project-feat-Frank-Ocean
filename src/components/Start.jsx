import { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Feedback from "./Feedbacks";
import { FcCheckmark, FcCancel } from "react-icons/fc";
import { useNavigate, useParams } from "react-router-dom";
import { QuizContext } from "../Context/QuizProvider";

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
      <div className="relative mx-10 md:mx-10 py-5 px-8 flex items-center md:gap-10 bg-wood mb-20 md:px-8 md:py-6 md:w-1/2 rounded-xl drop-shadow border-b-8 border-darkwood">
        <span className="absolute md:text-lg text-neutral-700 font-bold right-5 top-5 p-1 rounded-full hidden md:block">
          {id} / {questions.length}
        </span>
        <img
          src={img}
          className="w-48 h-auto rounded-xl hidden md:block"
          alt="Frank Ocean Photo"
        />
        <p className="font-bold text-xl font-serif text-center text-gray-800">
          {question}
        </p>
      </div>

      <div className="grid w-full md:w-auto px-5 grid-cols-1 md:grid-cols-2 gap-3 relative">
        {choices.map((choice, index) => (
          <button
            onClick={() => handleSelectedChoice(index)}
            className={`text-black font-semibold rounded-full md:text-lg md:px-10 py-4 cursor-pointer border-2 flex items-center justify-center md:justify-evenly hover:border-gray-500 ${
              selectedAnswer !== null && index === correct_index
                ? "bg-green-500 text-white"
                : ""
            } ${
              selectedAnswer !== null &&
              index === selectedAnswer &&
              index !== correct_index
                ? "bg-red-500 text-white"
                : ""
            }`}
            key={index}
            disabled={showFeedBack}
          >
            {choice}
            <div className="ml-3 w-10 flex justify-center items-center">
              <FcCheckmark
                className={`text-4xl bg-white rounded-full p-1 ${
                  selectedAnswer !== null && index === correct_index
                    ? "visible"
                    : "hidden"
                }`}
              />
              <FcCancel
                className={`text-4xl bg-white rounded-full p-1 ${
                  selectedAnswer !== null &&
                  index === selectedAnswer &&
                  index !== correct_index
                    ? "visible"
                    : "hidden"
                }`}
              />
            </div>
          </button>
        ))}
      </div>

      <Feedback
        feedbackData={feedbackData}
        onNextQuestion={handleNextQuestion}
        onPrevQuestion={handlePrevQuestion}
        resultRef={resultRef}
      />
    </motion.div>
  );
}
