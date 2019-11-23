import React, { useState } from "react";

const QuestionBox = ({ question, options, selected }) => {
  const [answers, setAnswer] = useState(options);

  return (
    <div className="questionBox">
      <div className="question">{question}</div>
      {answers.map((answer, index) => (
        <button
          key={index}
          className="answerBtn"
          onClick={() => {
            if (answers.length !== 1) {
              setAnswer([answer]);
              selected(answer);
            }
          }}
        >
          {answer}
        </button>
      ))}
    </div>
  );
};

export default QuestionBox;
