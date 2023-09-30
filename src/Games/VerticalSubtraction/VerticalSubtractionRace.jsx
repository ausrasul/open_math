import React, { useState } from "react";
import VerticalSubtraction from "./VerticalSubtraction";
import QuestionResult from "../../Lib/QuestionResult"
const getRandomDigits = () => 5;
//  Math.min(Math.max(Math.floor(Math.random() * 10), 1), 6);

export default function VerticalSubtractionRace(props) {
  const [showResult, setShowResult] = useState(false);
  const [digits, setDigits] = useState(getRandomDigits());
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (answer) => {
    setDigits(getRandomDigits());
    const answers_ = answers.slice();
    answers_.push(answer);
    if (answers_.length >= props.NumOfQuestions) {
      props.onAnswers(answers_);
    }
    setAnswers(answers_);
    setShowResult(true);
  };
  return (
    <>
      {!showResult && (
        <VerticalSubtraction
          maxTimePerQuestion={props.maxTimePerQuestion}
          key={1}
          digits={digits}
          onAnswer={handleAnswer}
        />
      )}
      <QuestionResult
        open={showResult}
        correct={answers[answers.length - 1]?.correct}
        time={answers[answers.length - 1]?.time}
        maxTime={props.maxTimePerQuestion}
        maxPoints={props.maxPointsPerQuestion}
        onClose={() => setShowResult(false)}
      />
    </>
  );
}
