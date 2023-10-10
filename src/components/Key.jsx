import React from "react";
import { LuDelete } from "react-icons/lu";
import { useContext } from "react";
import { AppContext } from "../App";

const Key = ({ keyVal, bigKey }) => {
  const { onSelectLetter, onDelete, onEnter } = useContext(AppContext);

  const selectLetter = () => {
    if (keyVal === "ENTER") {
      onEnter();
    } else if (keyVal === "BACKSPACE") {
      onDelete();
    } else {
      onSelectLetter(keyVal);
    }
  };

  return (
    <div className="key" id={bigKey && "big"} onClick={selectLetter}>
      {keyVal === "BACKSPACE" ? <LuDelete /> : keyVal}
    </div>
  );
};

export default Key;
