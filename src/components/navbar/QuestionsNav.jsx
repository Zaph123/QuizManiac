import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaAngleDown } from "react-icons/fa6";

const CARD_NAV = {
  show: {
    height: "400px",
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


const QuestionsNav = ({ quiz, dispatch }) => {
  const [open, setOpen] = useState(true);
  console.log(quiz.selectedAnswers);
  return (
    <motion.nav
      variants={CARD_NAV}
      initial="hide"
      animate={open ? "show" : "hide"}
      transition={{ duration: 0.25 }}
      className={`relative top-0 md:w-[450px] bg-white md:sticky rounded-lg border px-3 left-0 w-full ${
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
        return (
          <motion.button
          key={i}
            onClick={() => dispatch({ type: "setActiveStep", payload: i })}
            variants={OPTION_VARIANT}
            initial="hide"
            animate={open ? "show" : "hide"}
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
            className={`w-full relative text-left transition-all duration-300 flex items-start group gap-2 divide-x rounded-md ${
              quiz.activeStep === i ? "bg-violet-400 text-white" : "bg-neutral"
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
              {q.question}
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
      })}
    </motion.nav>
  );
};

export default QuestionsNav;