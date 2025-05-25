import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import QuizResult from "./QuizResult";
import QuizCard, { OPTIONS } from "./QuizCard";
import data from "../../data/data.json";
import SubmitConfirmationModal from "./modal/SubmitConfirmationModal";
import {
  FaAngleDown,
  FaCircleArrowLeft,
  FaCircleArrowRight,
} from "react-icons/fa6";
import Button from "./button/Button";

const QuizBoard = ({ quiz, dispatch }) => {
  const [value, setValue] = useState(0);
  const [showModal, setShowModal] = useState(false);
  console.log(quiz.questions);

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

  return (
    <section className="w-full max-w-[1200px]">
      <div className="w-full flex items-start gap-2 md:flex-col md:items-center">
        <CardNav quiz={quiz} dispatch={dispatch} />
        <div className="w-full flex flex-col relative space-y-10">
          <div className="h-full relative border w-full bg-white rounded-lg p-30 flex flex-col gap-8">
            <motion.section
              initial={{ opacity: 0, y: 10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "100%" }}
              exit={{ opacity: 0, y: 10, height: 0 }}
              transition={{ duration: 0.5, type: "spring", ease: "backInOut" }}
              className="w-full p-16 sm:p-10"
            >
              <div className="space-x-5 mb-2">
                <p className="text-violet-400 text-sm">
                  {quiz.activeStep + 1}/<span>{quiz.questions.length}</span>
                </p>
              </div>
              {quiz.questions[quiz.activeStep]?.data.map((q, i) => {
                return (
                  <QuizCard
                    key={i}
                    quiz={q}
                    value={value}
                    setValue={setValue}
                    dispatch={dispatch}
                  />
                );
              })}
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

const CARD_NAV = {
  show: {
    height: "100%",
  },
  hide: {
    height: "60px",
  },
};

const OPTION_VARIANT = {
  show: {
    opacity: 1,
    y: 0,
  },
  hide: {
    opacity: 0,
    y: 50,
  },
};

const CardNav = ({ quiz, dispatch }) => {
  const [open, setOpen] = useState(true);
  return (
    <motion.nav
      variants={CARD_NAV}
      initial="hide"
      animate={open ? "show" : "hide"}
      transition={{ duration: 0.25 }}
      className={`sticky top-0 md:w-full bg-white md:relative rounded-lg border px-3 left-0 w-[450px] ${
        open ? "overflow-y-auto" : "overflow-hidden"
      }`}
    >
      <div
        onClick={() => setOpen((p) => !p)}
        className="w-full h-[60px] flex justify-between items-center"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-semibold"
        >
          All Questions
        </motion.p>
        <div className="flex gap-3 items-center">
          <div className="size-8 grid place-content-center rounded-full bg-violet-100 text-primary text-sm">
            <span>{quiz.questions.length}</span>
          </div>
          <button className="text-gray-500 cursor-pointer">
            <FaAngleDown className={`${open ? "rotate-180" : "rotate-0"}`} />
          </button>
        </div>
      </div>
      {quiz.questions.map((q, i) => {
        return q.data.map((c) => {
          return (
            <motion.button
              onClick={() => dispatch({ type: "setActiveStep", payload: i })}
              variants={OPTION_VARIANT}
              initial="hide"
              animate={open ? "show" : "hide"}
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
              className={`w-full relative transition-all duration-300 flex items-start group gap-2 divide-x rounded-md ${
                quiz.activeStep === i
                  ? "bg-violet-400 text-white"
                  : "bg-neutral"
              }  p-3 mb-2`}
            >
              <span
                className={`${
                  quiz.activeStep === i ? "text-white" : ""
                }text-gray-500 pl-1 font-semibold`}
              >
                {i + 1}
              </span>
              <p
                className={`${
                  quiz.activeStep === i
                    ? "text-white"
                    : "group-hover:text-primary"
                } text-sm pl-3 `}
              >
                {c.question}
              </p>
              {quiz.activeStep === i && (
                <motion.span
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="absolute h-full w-1 bg-primary left-0 top-0"
                />
              )}
            </motion.button>
          );
        });
      })}
    </motion.nav>
  );
};
export default QuizBoard;
