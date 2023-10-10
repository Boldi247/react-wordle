import React, { useState } from "react";
import { boardDefault } from "../Words";
import Letter from "./Letter";

const Board = () => {
  return (
    <div className="board">
      {boardDefault.map((row, rowIndex) => (
        <div className="row" key={`row${rowIndex}`}>
          {row.map((letter, letterIndex) => (
            <Letter
              letterPos={letterIndex}
              attemptVal={rowIndex}
              key={`row${rowIndex}_cell${letterIndex}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
