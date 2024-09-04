import { Link } from 'react-router-dom';
import FrontImg from "/assets/frank ocean menu.png";

export default function Home() {
 return (
  <>
  <h1 className="text-center font-extrabold text-3xl mt-10 md:text-5xl">
    Frank Ocean Quiz
  </h1>
<div className="text-left font-sans mt-14 mx-10 md:mx-20">
  <h2 className="font-bold text-2xl mb-5">
    Welcome to the Ultimate Frank Ocean Quiz!
  </h2>
  <p className="text-justify text-md md:text-xl">
    Immerse yourself in the captivating world of Frank Ocean, the
    enigmatic American singer, and see how well you know his life and
    music. This thrilling quiz will take you on a journey through 10
    questions, ranging from well-known facts to the most obscure details.
    Do you have what it takes to score a perfect 100%? Challenge your
    knowledge, sharpen your skills, and ride the tide to victory. Dive in
    and find out if you are a true Frank Ocean aficionado!
  </p>

  <div className="items-center justify-center flex mt-20">
    <Link to="question/1">
    <button className="text-2xl md:text-4xl text-gray-200 font-bold bg-greenish px-8 py-4 rounded-full text-center outline-none drop-shadow-lg hover:bg-green-800">
      Start the Quiz!
    </button>
    </Link>
  </div>
</div>

<img
  className="md:w-1/3 h-auto fixed bottom-0 -left-14 w-6/12 drop-shadow-2xl"
  src={FrontImg}
  alt="Frank Ocean Photo"
  loading='lazy'
  />
  
 </>
 )
}