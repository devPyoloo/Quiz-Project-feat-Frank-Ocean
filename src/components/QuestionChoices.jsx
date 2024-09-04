import { FcCheckmark, FcCancel } from "react-icons/fc";

export default function QuestionChoices({ choices, handleSelectedChoice, selectedAnswer, correct_index, showFeedBack }) {
  return (
    <div className="grid w-full md:w-auto px-5 grid-cols-1 md:grid-cols-2 gap-3 relative">
        {choices.map((choice, index) => (
          <button
            onClick={() => handleSelectedChoice(index)}
            className={`text-black font-semibold rounded-full gap-10 md:text-lg md:px-10 py-4 cursor-pointer border-2 flex items-center justify-center md:justify-evenly hover:border-gray-500 ${
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
  )
}
