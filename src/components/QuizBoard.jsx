import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import QuizResult from "./QuizResult";
import QuizCard, { OPTIONS } from "./QuizCard";
import SubmitConfirmationModal from "./modal/SubmitConfirmationModal";
import {
  FaAngleDown,
  FaCircleArrowLeft,
  FaCircleArrowRight,
} from "react-icons/fa6";
import Button from "./button/Button";
import QuestionsNav from "./navbar/QuestionsNav";
import { Link, useParams } from "react-router-dom";
import useQuizContext from "../context/QuizContext"

const QuizBoard = () => {
  const [value, setValue] = useState(0);
  const { quiz, dispatch } = useQuizContext();
  const [showModal, setShowModal] = useState(false);

  const { categoryName } = useParams();

  useEffect(() => {
    const fetchCategoryQuizzes = async () => {
      dispatch({ type: "start"});
      try {
        const response = await fetch(
          `http://localhost:5000/quiz?category=${encodeURIComponent(categoryName)}&_sort=plays&_order=desc`
        );
        const data = await response.json();
        dispatch({type: "success", payload: data});
      } catch (error) {
        console.error('Error fetching category quizzes:', error);
        dispatch({type: "error", payload: error.message});
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryQuizzes();
  }, [categoryName]);

  const handleSubmit = () => {
    if (quiz.activeStep + 1 === quiz.questions.length) {
      setShowModal(true);
    } else {
      dispatch({ type: "submit" });
    }

    setValue(0);
  };

  if (quiz.showResult) {
    return <QuizResult quiz={quiz} dispatch={dispatch} />;
  }

   if (quiz.isLoading) {
      return <PageLoader message="Loading Quiz Universe" />;
    }
  
    if (quiz.errMsg) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Error Loading Quizzes
            </h1>
            <p className="text-gray-600 dark:text-gray-400">{quiz.errMsg}</p>
            <button
              onClick={fetchAllData}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }
  

  return (
    <section className="w-full max-w-[1200px]">
      <div className="w-full flex flex-col items-center gap-2 md:flex-row md:items-start">
        <QuestionsNav quiz={quiz} dispatch={dispatch} />
        <div className="w-full flex flex-col relative space-y-10">
          <div className="h-full relative border w-full bg-white rounded-lg p-30 flex flex-col gap-8">
            <motion.section
              initial={{ opacity: 0, y: 10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "100%" }}
              exit={{ opacity: 0, y: 10, height: 0 }}
              transition={{ duration: 0.5, type: "spring", ease: "backInOut" }}
              className="w-full p-16 sm:p-10"
            >
              <div className="space-x-5 mb-4 flex items-center justify-between">
                <p className="text-violet-400 text-sm">
                  {quiz.activeStep + 1}/<span>{quiz.questions.length}</span>
                </p>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm text-gray-500">Tags:</h3>
                  <div className="text-gray-500 space-x-2 text-sm">
                    {quiz.questions[quiz.activeStep].tags.map((tag, index) => (
                      <Link key={index} className="text-violet-500 capitalize hover:text-600 font-medium bg-violet-100 py-2 px-4 text-xs rounded-full">
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <QuizCard
                // key={i}
                quiz={quiz.questions[quiz.activeStep]}
                value={value}
                setValue={setValue}
                dispatch={dispatch}
              />
              <div className="button flex justify-between mt-6 items-center w-full">
                <Button
                  className="min-w-28"
                  variant="secondary"
                  disabled={quiz.activeStep < 1}
                  onClick={() => dispatch({ type: "previous" })}
                >
                  <FaCircleArrowLeft className="text-xl" />
                  Previous
                </Button>
                <Button className="min-w-28" onClick={handleSubmit}>
                  {quiz.activeStep + 1 >= quiz.questions.length
                    ? "Submit"
                    : "Next"}
                  <FaCircleArrowRight className="text-xl" />
                </Button>
              </div>
              <SubmitConfirmationModal
                isOpen={showModal}
                toggleModal={() => setShowModal(!showModal)}
                onSubmit={() => dispatch({ type: "submit" })}
              />
            </motion.section>
          </div>
          <div className="flex gap-5 items-center">
            <Button variant="danger">End Quiz</Button>
            <Button>Submit</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizBoard;
