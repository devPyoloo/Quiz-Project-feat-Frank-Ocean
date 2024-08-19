import PropTypes from 'prop-types'

export default function Button({buttonType, onClick, children, currentQuestionIndex}) {
  return (
    <button onClick={onClick} className={` uppercase font-bold text-sm md:text-lg px-6 py-3 rounded-full mb-20 text-white mt-4 flex gap-2 items-center  ${buttonType === "secondary" ? `bg-neutral-500 hover:bg-neutral-400 ${currentQuestionIndex === 0 ? 'hidden' : 'visible'}` : 'bg-orange-500 hover:bg-orange-400'}`}>
      {children}
    </button>
  )
};

Button.propTypes = {
  buttonType: PropTypes.object,
  onClick: PropTypes.object,
  children: PropTypes.node,
  currentQuestionIndex: PropTypes.number

}
