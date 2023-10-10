import React from "react";
import { LuDelete } from "react-icons/lu";
import { useContext } from "react";
import { AppContext } from "../App";

const Key = ({ keyVal, bigKey, disabled }) => {
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
    <div
      className={`key ${bigKey ? "big" : disabled && "disabled"}`}
      onClick={selectLetter}
    >
      {keyVal === "BACKSPACE" ? <LuDelete /> : keyVal}
    </div>
  );
};

export default Key;
