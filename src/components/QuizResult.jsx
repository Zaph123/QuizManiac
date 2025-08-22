import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { HiX } from "react-icons/hi";
import Button from "./button/Button";
import { resultStyles } from "../utilis/remarkUtilis";
import { motion } from "framer-motion";
import ModalLoader from "./loaders/ModalLoader";

const QuizResult = ({ quiz, dispatch }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  const handleRestart = async () => {
    toggleModal();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toggleModal();
    dispatch({ type: "restart" });
  };

  return (
    <>
      <ModalLoader isOpen={showModal} toggleModal={toggleModal} />
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="flex flex-col border max-w-[1000px] w-full bg-white rounded-lg gap-10 items-center md:px-36 px-5 py-12 justify-center"
      >
        <h1 className="self-center font-bold text-3xl">Your Results</h1>

        <div className="flex flex-col items-center justify-center mx-auto">
          {quiz.passedHighScore ? (
            <div className="space-y-5 flex flex-col items-center">
              <p>
                Congratulation🍹👍 You have a new <b>High Score of</b>
              </p>
              <b
                className={`${
                  resultStyles(quiz.totalScore).style
                } rounded-full size-32 grid place-content-center text-4xl`}
              >
                {quiz.totalScore}
              </b>
              <p>points.</p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="space-y-5 flex flex-col items-center">
                <p>You scored</p>
                <b
                  className={`${
                    resultStyles(quiz.totalScore).style
                  } rounded-full size-32 grid place-content-center text-4xl`}
                >
                  {quiz.totalScore}
                </b>
                <p>points.</p>
              </div>
              <Remark quiz={quiz} />
            </div>
          )}
        </div>
        {quiz.highScore > 0 && (
          <p className="text-sm self-start">
            Current High Score:{" "}
            <span className="font-bold">{quiz.highScore}pts</span>
          </p>
        )}
        {quiz.selectedAnswers.length === 0 ? (
          <div className="text-center p-3 rounded-lg bg-red-100">
            <h1 className="font-semibold text-xl mb-2">NO ATTEMPT</h1>
            <p className="text-sm">You did not even try to attempt any question 😒</p>
          </div>
        ) : (
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th>Questions</th>
                <th>Your Answers</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {quiz.selectedAnswers.map((ans, i) => {
                return (
                  <tr key={i}>
                    <td className="p-2">{ans.question}</td>
                    <td className="p-2">
                      <div
                        className={`${
                          ans.isCorrect
                            ? "text-green-500 bg-green-50"
                            : "text-red-500 bg-red-50"
                        } p-2 rounded-md flex gap-2 items-center`}
                      >
                        <div
                          className={`size-5 shrink-0 rounded-full grid place-content-center ${
                            ans.isCorrect ? "bg-green-100" : "bg-red-100"
                          }`}
                        >
                          {ans.isCorrect ? <FaCheck /> : <HiX />}
                        </div>
                        <p>{ans.answer}</p>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <Button onClick={handleRestart}>Restart Quiz</Button>
        <h1 className="text-gray-500 text-sm">
          <i>
            Note this is the work of <b>Einstein Tech PLC</b>, cloning is not
            allowed
          </i>
        </h1>
      </motion.section>
    </>
  );
};

const Remark = ({ quiz }) => {
  const { message, icon, color, bg, grade } = resultStyles(quiz.totalScore);
  console.log(quiz);
  return (
    <div className={`text-sm flex items-center gap-2 ${color}`}>
      <div
        className={`size-8 text-white text-sm rounded-full grid place-content-center ${bg} `}
      >
        {icon}
      </div>
      <span className="text-center">{message}</span>
    </div>
  );
};

export default QuizResult;
