import {  useEffect } from "react";
import { QUIZ_DATA } from "../../data/data";
import QuizBoard from "../component/QuizBoard";
import PageLoader from "../component/loaders/PageLoader";
import { useQuizContext } from "../context/QuizContext";
import MainNav from "../component/navbar/MainNav";

const QuizIndex = () => {

  const {quiz, dispatch} = useQuizContext()

  // const fetchQuestions = async () => {
  //   dispatch({type: "start"})
  //   try {
  //     const response = await fetch("http://localhost:8000/quiz");
  //     if(!response.ok){
  //           throw new ErrMsg("Network Problem")
  //         }
  //     const data = await response.json();
  //     dispatch({type: "success", payload: data})
  //   } catch (errMsg) {
  //     dispatch({type: "errMsg"})
  //     console.log("The ErrMsg is " + errMsg)
  //   }

  // }

  useEffect(() => {
    console.log(QUIZ_DATA)
    if (!QUIZ_DATA) return;
    dispatch({ type: "start" });

    const fetchQuestions = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        dispatch({ type: "success", payload: QUIZ_DATA });
      } catch (errMsg) {
        dispatch({ type: "errMsg" });
        console.log("The ErrMsg is " + errMsg);
      }
    };

    fetchQuestions();
  }, []);

  if(quiz.isLoading){
    return <PageLoader message="Getting Questions" />
  }

  return (
    <div className="p-5 sm:p-0 w-full min-h-screen flex-col justify-center items-center">
      <MainNav />
      <div className="w-full mt-[90px] flex p-5 items-center justify-center">
          <QuizBoard quiz={quiz} dispatch={dispatch} />
        {quiz.errMsg && <p>Unable to get details</p>}
      </div>
    </div>
  );
};



export default QuizIndex;
