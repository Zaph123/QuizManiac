import { FaCircleCheck, FaInfo } from "react-icons/fa6";
import { TOTALSCORE } from "../config/constants";

export const resultStyles = (score) => {
  let grade = "";
  if (score <= TOTALSCORE * 0.25) {
    grade = "F";
  } else if (score >= TOTALSCORE * 0.25 && score <= TOTALSCORE * 0.5) {
    grade = "C";
  } else if (score >= TOTALSCORE * 0.5 && score <= TOTALSCORE * 0.75) {
    grade = "B";
  } else {
    grade = "A";
  }

console.log(score, grade, score < TOTALSCORE * 0.25, TOTALSCORE * 0.25)

  const styles = {
    color: "text-yellow-500",
    bg: "bg-yellow-500",
    grade: "F",
    icon: <FaInfo />,
    message: "You tried, welldone try better next time 😐",
  };

  console.log(TOTALSCORE * 0.25);

  switch (grade) {
    case "F":
      return {
        ...styles,
        style: "bg-red-50 text-red-500",
        color: "text-red-500",
        bg: "bg-red-500",
        grade: "F",
        message: "So disgracefully, why are you like this 🤧",
      };
    case "C":
      return {
        ...styles,
        style: "bg-yellow-50 text-yellow-500",
        color: "text-yellow-500",
        bg: "bg-yellow-500",
        grade: "C",
        message: "You tried, welldone try better next time 😐",
      };
    case "B":
      return {
        ...styles,
        style: "bg-violet-50 text-violet-500",
        color: "text-violet-500",
        bg: "bg-violet-500",
        grade: "B",
        message: "Hmmm, that's impressive try better bext time 😇",
      };
    case "A":
      return {
        ...styles,
        style: "bg-green-50 text-green-500",
        color: "text-green-500",
        bg: "bg-green-500",
        icon: <FaCircleCheck />,
        grade: "A",
        message: "Hooray, you got it all, you are a natural 🥳",
      };
    default:
      return styles;
  }
};