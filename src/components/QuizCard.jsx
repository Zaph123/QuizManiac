import { motion } from "framer-motion";


export const OPTIONS = {
  1: "A",
  2: "B",
  3: "C",
  4: "D",
};

const QuizCard = ({ quiz, dispatch, setValue, value }) => {
  
  if(!quiz){
    return <div></div>
  }
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 100, scale: .9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 100, scale: .9 }}
      transition={{duration: .025}}
      className="w-full space-y-6"
    >
      <div>
        <h1 className="text-2xl font-semibold">{quiz.question}</h1>
      </div>
      <div className="options w-full flex flex-col gap-3 items-start">
        {quiz.options.map((a, index) => {
          return (
            <motion.span
              key={index}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                dispatch({
                  type: "handleSelectedAnswer",
                  payload: {
                    option: index + 1,
                    answer: a,
                    question: quiz.question,
                    correctAnswer: quiz.answer,
                    isCorrect: quiz.answer === a,
                  },
                });
                setValue(index + 1);
              }}
              className={`${
                index + 1 === value
                  ? "bg-violet-500 text-white"
                  : "bg-transparent hover:bg-violet-50 text-gray-600  hover:text-gray-700 border  hover:border-violet-100"
              } w-full cursor-pointer transition duration-200 p-3 rounded-xl`}
            >
              {OPTIONS[index + 1]}. {a}
            </motion.span>
          );
        })}
      </div>
    </motion.section>
  );
};

export default QuizCard;
