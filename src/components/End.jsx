import { useContext } from "react";
import { QuizContext } from "../Context/QuizProvider";
import { FaRedoAlt, FaThumbsUp } from "react-icons/fa";
import { GiLaurelsTrophy } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import Confetti from './Confetti'

export default function End() {
  const { quizState, score } = useContext(QuizContext);
  const totalQuestions = quizState.questions.length;
  const percentage = (score / totalQuestions) * 100;
  const radius = 16;
  const circumference = 2 * Math.PI * radius;

  const strokeDasharray = `${(percentage / 100) * circumference} ${
    circumference - (percentage / 100) * circumference}`;
    const navigate = useNavigate();

  const handleRestartButton = () => {
    navigate("/question/1")
  }

  return (
    <>
    { percentage >= 50 && <Confetti /> }
    <div className="relative mx-auto items-center justify-center flex flex-col mt-20">
      <div className="w-4/5 flex flex-col pt-10 items-center justify-center gap-6 md:gap-10 bg-lightwood mb-20 py-6 md:w-1/2 rounded-xl drop-shadow-2xl border-b-8 px-10 border-darkwood">
        {percentage >= 50 ? (
          <GiLaurelsTrophy className="text-yellow-500 text-8xl drop-shadow" />
        ) : (
          <FaThumbsUp className="text-red-500 text-8xl drop-shadow" />
        )}
        <h1 className="text-center text-gray-800 font-bold text-4xl">
          {percentage >= 50 ? "Great Job!" : "Good try!"}
        </h1>
        <div className="relative w-[192px] h-[192px] rounded-full">
          <svg
            className="rotate-[135deg] w-full h-full"
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className={`stroke-current ${
                score >= 5 ? "text-green-200" : "text-red-200"
              }`}
              strokeWidth="4"
              strokeDasharray="75 100"
            ></circle>

            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className={`stroke-current ${
                score >= 5 ? "text-green-600" : "text-red-600"
              }`}
              strokeWidth="4"
              strokeDasharray={strokeDasharray}
              strokeLinecap="round"
            ></circle>
          </svg>

          {/* Value Text */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <p
              className={`text-5xl font-bold ${
                score >= 5 ? "text-green-600" : "text-red-600"
              }`}
            >
              {score}
            </p>
            <p className={`${score >= 5 ? "text-green-600" : "text-red-600"}`}>
              out of {totalQuestions}
            </p>
          </div>
        </div>
          
          <p className="text-lg font-semibold mb-8 md:text-2xl">Quiz completed succesfully.</p>
        <button onClick={handleRestartButton} className="flex mb-5 gap-3 justify-center items-center text-2xl text-white font-semibold bg-orange-500 px-8 py-3 rounded-full hover:bg-orange-400">
          Restart <FaRedoAlt />{" "}
        </button>
      </div>
    </div>
    </>
  );
};
