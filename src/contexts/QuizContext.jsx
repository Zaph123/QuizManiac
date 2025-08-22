import { useContext, createContext, useReducer } from "react";
import { TOTALSCORE } from "../config/constants";

const QuizContext = createContext();

const initialState = {
  isLoading: false,
  questions: [],
  categories: {},
  answerDetails: {},
  error: null,
  activeStep: 0,
  totalScore: 0,
  highScore: 0,
  showResult: false,
  selectedAnswers: [],
  passedHighScore: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "start":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "success": {
      const allData = action.payload;
      return {
        ...state,
        isLoading: false,
        questions: allData,
        showDisabled: true,
      };
    }
    case "error":
      const payload = action.payload;
      return {
        ...state,
        isLoading: false,
        questions: [],
        error: payload,
      };

    case "handleSelectedAnswer": {
      // console.log(action.payload);

      const selected = {
        option: action.payload.option,
        answer: action.payload.answer,
        question: action.payload.question,
        correctAnswer: action.payload.correctAnswer,
        isCorrect: action.payload.isCorrect,
      };

      return {
        ...state,
        // correctAnswer: state.questions[state.activeStep].answer,
        answerDetails: selected,
      };
    }

    case "submit": {
      /*This checks for duplicate answers to the same questions and filters the initial duplicate if any 
      and pushes the new one to the SELECTED ANSWERS ARRAY*/

      if (Object.keys(state.answerDetails).length > 0) {
        const check = state.selectedAnswers.find(
          (c) => c.question === state.answerDetails.question
        );
        // console.log(check)
        if (check) {
          const filter = state.selectedAnswers.filter(
            (c) => c.question !== check.question
          );
          // console.log(filter)
          state.selectedAnswers = filter;
        }
        state.selectedAnswers.push(state.answerDetails);
      }
      const isActiveStep = state.activeStep + 1 >= state.questions.length;

      const correctAnswers = state.selectedAnswers.filter((c) => c.isCorrect);
      const wrongAnswers = state.selectedAnswers.filter((c) => !c.isCorrect);
      const noAnswer = state.questions.filter((q) => {
        const newS = state.selectedAnswers.map((c) => {
          return q.question?.includes(c.question);
        });
        return newS;
      });

      // console.log(
      //   state.selectedAnswers,
      //   correctAnswers,
      //   wrongAnswers,
      //   noAnswer
      // );

      const total =
        (correctAnswers.length * TOTALSCORE) / state.questions.length;

    const randomizeNum = Math.random()

      return {
        ...state,
        activeStep: isActiveStep ? state.activeStep : state.activeStep + 1,
        answerDetails: {},
        showResult: isActiveStep,
        totalScore: parseFloat(total.toFixed(1)),
        highScore:
          total > state.highScore
            ? parseFloat(total.toFixed(1))
            : state.highScore,
        passedHighScore: total > state.highScore && !state.passedHighScore,
      };
    }
    case "setActiveStep":
      return {
        ...state,
        activeStep: action.payload
      };
    case "previous": {
      console.log(state.activeStep);
      return {
        ...state,
        activeStep: state.activeStep - 1,
      };
    }

    case "restart":
      return {
        ...state,
        showResult: false,
        activeStep: 0,
        totalScore: 0,
        selectedAnswers: [],
      };
    default:
      return state;
  }
};

const QuizProvider = ({ children }) => {
  const [quiz, dispatch] = useReducer(reducer, initialState);

  const data = {
    quiz,
    dispatch,
  };

  return <QuizContext.Provider value={data}>{children}</QuizContext.Provider>;
};

export const useQuizContext = () => {
  const context = useContext(QuizContext);
  return context;
};

export default QuizProvider;
