import React, { useState } from "react";
import MultiplicationTable from "./MultiplicationTable";

export default function MultiplicationTableRace(props) {
  const [reset, setReset] = useState(false);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (answer) => {
    console.log(answer)
    setReset(true);
    setTimeout(() => setReset(false));
    const answers_ = answers.slice();
    answers_.push(answer);
    if (answers_.length >= props.NumOfQuestions) {
      props.onAnswers(answers_);
    }
    setAnswers(answers_);
  };
  return (
    <>
      {!reset && (
        <MultiplicationTable
          maxTimePerQuestion={props.maxTimePerQuestion}
          key={1}
          onAnswer={handleAnswer}
        />
      )}
    </>
  );
}
