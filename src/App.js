import { useEffect, useState } from 'react';
import { createContext } from 'react';
import './App.css';

import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { boardDefault, generateWordSet } from './Words';
import GameOver from './components/GameOver';
import React from "react";

export const AppContext = createContext();

export const DIFFICULTIES = {
  EASY: "easy",
  HARD: "hard",
};

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [wordNotFound, setWordNotFound] = useState(false);
  const [correctWord, setCorrectWord] = useState("");
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    win: false,
  });
  const [difficulty, setDifficulty] = useState(DIFFICULTIES.EASY);

  useEffect(() => {
    generateWordSet({difficulty}).then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, [difficulty]);

  useEffect(() => {
    setBoard(boardDefault.map(row => [...row]));
    setCurrAttempt({ attempt: 0, letterPos: 0 });
    setDisabledLetters([]);
    setWordNotFound(false);
    setGameOver({ gameOver: false, win: false });
  
    generateWordSet({difficulty}).then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, [difficulty]);

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 });
  };

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;

    if (wordNotFound) { setWordNotFound(false); }

    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 });
  };

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }

    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
    } else {
      setWordNotFound(true);
    }

    if (currWord.toLowerCase() === correctWord) {
      setGameOver({ gameOver: true, win: true });
      return;
    }

    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, win: false });
      return;
    }
  };

  return (
    <div className="App">
      <nav>
        <h1 className='title'>Wordle <span className='sonrisa-logo'>:)</span></h1>
        <select
          className='difficulty-select'
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value={DIFFICULTIES.EASY}>Easy</option>
          <option value={DIFFICULTIES.HARD}>Hard</option>
        </select>
      </nav>
      <AppContext.Provider value={{
        board,
        setBoard,
        currAttempt,
        setCurrAttempt,
        onSelectLetter,
        onDelete,
        onEnter,
        correctWord,
        disabledLetters,
        setDisabledLetters,
        gameOver,
        setGameOver,
        wordNotFound,
      }}>
        <div className='game'>
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
