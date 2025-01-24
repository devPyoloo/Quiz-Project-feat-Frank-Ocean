import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Button from "./Button";

type FeedbackProps = {
  feedbackData: {
    showFeedBack: boolean;
    showFeedbackMessage: string | null;
    selectedAnswer: number | null;
    correctIndex: number;
    fact: string;
    currentQuestionIndex: number;
  };
  onNextQuestion: () => void;
  onPrevQuestion: () => void;
  resultRef: React.RefObject<HTMLDivElement>;
};

const Feedbacks = ({
  feedbackData,
  onNextQuestion,
  onPrevQuestion,
  resultRef,
}: FeedbackProps) => {
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
        className={`w-4/5 mb-10 rounded-xl md:w-1/2 drop-shadow-2xl mt-16 bg-white shadow-sm p-5 border-b-8 ${
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

const MemoizedFedbacks = React.memo(Feedbacks);
export default MemoizedFedbacks;
