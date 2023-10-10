import React, { useContext, useState } from "react";
import { boardDefault } from "../Words";
import Letter from "./Letter";
import { AppContext } from "../App";

const Board = () => {
  const { wordNotFound } = useContext(AppContext);

  return (
    <div className={`board ${wordNotFound && "shake"}`}>
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
