import { PropTypes } from "prop-types"

export default function QuestionCard({ id, questions, question, img }) {
  return (
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
  )
}

QuestionCard.propTypes = {
  id: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  question: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
}

