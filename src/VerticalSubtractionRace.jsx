import React, { useState } from "react";
import VerticalSubtraction from "./VerticalSubtraction";

const getRandomDigits = () => 5;
//  Math.min(Math.max(Math.floor(Math.random() * 10), 1), 6);

export default function VerticalSubtractionRace(props) {
  const [reset, setReset] = useState(false);
  const [digits, setDigits] = useState(getRandomDigits());
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (answer) => {
    setReset(true);
    setTimeout(() => setReset(false));
    setDigits(getRandomDigits());
    const answers_ = answers.slice();
    answers_.push(answer);
    if (answers_.length >= props.NumOfQuestions) {
      props.onAnswers(answers_);
    }
    setAnswers(answers_);
    // show points and if correct
  };
  return (
    <>
      {!reset && (
        <VerticalSubtraction key={1} digits={digits} onAnswer={handleAnswer} />
      )}
    </>
  );
}
