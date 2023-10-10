import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

const Letter = ({ letterPos, attemptVal }) => {
  const { board, correctWord, currAttempt, setDisabledLetters } =
    useContext(AppContext);
  const letter = board[attemptVal][letterPos];

  const correct = correctWord.toUpperCase()[letterPos] === letter;
  const almost = !correct && letter !== "" && correctWord.includes(letter);
  const letterState =
    currAttempt.attempt > attemptVal
      ? correct
        ? "correct"
        : almost
        ? "almost"
        : "error"
      : "default";

  useEffect(() => {
    if (letter !== "" && !correct && !almost)
      setDisabledLetters((prev) => [...prev, letter]);
  }, [currAttempt.attempt]);

  return <div className={`letter ${letterState}`}>{letter}</div>;
};

export default Letter;
