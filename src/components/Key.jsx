import React from "react";
import { LuDelete } from "react-icons/lu";
import { useContext } from "react";
import { AppContext } from "../App";

const Key = ({ keyVal, bigKey }) => {
  const { board, setBoard } = useContext(AppContext);

  const selectLetter = () => {
    const newBoard = [...board];
    newBoard[0][0] = keyVal;
    setBoard(newBoard);
  };

  return (
    <div className="key" id={bigKey && "big"} onClick={selectLetter}>
      {keyVal === "BACKSPACE" ? <LuDelete /> : keyVal}
    </div>
  );
};

export default Key;
