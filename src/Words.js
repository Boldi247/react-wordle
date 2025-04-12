import wordBank from "../src/wordle-bank.txt"
import selectionWords from "../src/selection-words.txt"
import selectionWordsEasy from "../src/selection-words-easy.txt"
import { DIFFICULTIES } from "./App";

export const boardDefault = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
];

export const generateWordSet = async ({difficulty}) => {
    let wordSet;
    let todaysWord;
    await fetch(wordBank)
        .then((response) => response.text())
        .then((result) => {
            const wordArr = result.split("\n");
            wordSet = new Set(wordArr);
        });

    const wordsByDifficulty = difficulty === DIFFICULTIES.EASY ? selectionWordsEasy : selectionWords;

    await fetch(wordsByDifficulty)
        .then((response) => response.text())
        .then((result) => {
            const wordArr = result.split("\n");
            todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];
        })
    
    return { wordSet, todaysWord };
};