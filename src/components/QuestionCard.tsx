import React from "react";

import { AnswerObject } from "../App";

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNbr: number;
  totalQuestions: number;
};
const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNbr,
  totalQuestions,
}) =>(

  <div className="bg-green-300 w-100 border-r-2 m-2 md:overflow-auto justify-center">

   <p className="text-2xl text-black m-2">Question: {questionNbr}/ {totalQuestions}</p>
   <p className=" text-2xl text-black m-2" dangerouslySetInnerHTML={{__html: question}} />
   <div className="flex flex-row w-full">
      {answers.map(answer=>(
         <div key={answer}>
            <button className=" text-center text-white text-2xl bg-blue-300 border-r-2 w-full p-1 m-2" disabled={userAnswer? true: false} value={answer} onClick={callback}>
               <span dangerouslySetInnerHTML={{__html: answer}}/>
            </button>
         </div>
      ))}
   </div>
  </div>
  )

export default QuestionCard;
