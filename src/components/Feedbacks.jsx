import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import PropTypes from "prop-types";
import React from "react";
import Button from "./Button";

const Feedbacks = ({
  feedbackData,
  onNextQuestion,
  onPrevQuestion,
  resultRef,
}) => {
  const {
    showFeedBack,
    showFeedbackMessage,
    selectedAnswer,
    correctIndex,
    fact,
    currentQuestionIndex,
  } = feedbackData;
  if (!showFeedBack) return null;

  return (
    <>
      <div
        ref={resultRef}
        className={`w-3/4 mb-10 rounded-xl md:w-1/2 drop-shadow-2xl mt-16 bg-white shadow-sm p-5 border-b-8 ${
          selectedAnswer === correctIndex
            ? "border-b-green-600"
            : "border-b-red-600"
        }`}
      >
        <p
          className={`mb-2 text-2xl font-serif font-bold ${
            selectedAnswer === correctIndex ? "text-green-600" : "text-red-600"
          }`}
        >
          {showFeedbackMessage}
        </p>
        <p className="text-lg">{fact}</p>
      </div>

      <div className="px-5 gap-5 flex justify-evenly items-center md:gap-20">
        <Button
          buttonType="secondary"
          onClick={onPrevQuestion}
          currentQuestionIndex={currentQuestionIndex}
        >
          <FaArrowLeft /> Prev Question
        </Button>
        <Button onClick={onNextQuestion}>
          Next Question <FaArrowRight />
        </Button>
      </div>
    </>
  );
};

Feedbacks.propTypes = {
  feedbackData: PropTypes.object,
  onNextQuestion: PropTypes.func,
  onPrevQuestion: PropTypes.func,
  resultRef: PropTypes.object,
};

const MemoizedFedbacks = React.memo(Feedbacks);
export default MemoizedFedbacks;
