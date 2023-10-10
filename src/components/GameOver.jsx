import React, { useContext } from "react";
import { AppContext } from "../App";

const GameOver = () => {
  const { gameOver, currAttempt, correctWord } = useContext(AppContext);
  return (
    <div className={`gameOver ${gameOver.win ? "correct" : "error"}`}>
      <h3>{gameOver.win ? "You Correctly Guessed!" : "You Failed!"}</h3>
      <h1>Correct: {correctWord} </h1>
      {gameOver.win && <h3>You guessed in {currAttempt.attempt} attempts</h3>}
      <button
        onClick={() => {
          window.location.reload(true);
        }}
        x
      >
        Restart
      </button>
    </div>
  );
};

export default GameOver;
