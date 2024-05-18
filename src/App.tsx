import React, { useState } from "react";
// cponents

import QuestionCard from "./components/QuestionCard";
// types
import { Difficulty, fetchQuizQuestions, QuestionState } from "./API";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(questions);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // users Answer
      const answer = e.currentTarget.value;
      // check answer again correct value
      const correct = questions[number].correct_answer === answer;
      // add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // save answer in array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // move on next question if not last question
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <div className="flex flex-col align-start w-full p-1 m-2">
      <h1 className="text-5xl underline">React Ts Quiz</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
      <button
          onClick={startTrivia}
          className="text-3xl text-blue-900 border-cyan-300 w-20 m-10"
        >
          Start
        </button>
      ) : null}
      {!gameOver ? <p className="text-3xl mt-5 text-orange-500 font-semibold">Score: {score}</p> : null}

      {loading && <p className="text-2xl mt-3 text-red-400">Loading Questions ...</p>}

      {!loading && !gameOver && (
        <QuestionCard
          questionNbr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}

      {!gameOver &&
      !loading &&
      userAnswers.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1 ? (
        <button
          onClick={nextQuestion}
          className=" text-2xl text-red-400 font-bold"
        >
          Next Question
        </button>
      ) : null}
    </div>
  );
};

export default App;
