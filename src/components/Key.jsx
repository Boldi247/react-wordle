import React from "react";
import { LuDelete } from "react-icons/lu"; 
import { useContext } from "react";
import { AppContext } from "../App";
import { AiOutlineEnter } from "react-icons/ai";

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

  const renderKey = (keyVal) => {
    if (keyVal === "ENTER") {
      return <AiOutlineEnter />;
    } else if (keyVal === "BACKSPACE") {
      return <LuDelete />;
    } else {
      return keyVal;
    }
  }

  return (
    <div
      className={`key ${bigKey ? "big" : disabled && "disabled"}`}
      onClick={selectLetter}
    >
      {renderKey(keyVal)}
    </div>
  );
};

export default Key;
