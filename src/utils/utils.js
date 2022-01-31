import seedrandom from "seedrandom";
import wordsList from "./wordsList";

/* some constants */

const boardSize = 4;

const minWordLength = 4;

const frequencies = [
    78,  // a
    20,  // b
    40,  // c
    38,  // d
    111, // e
    14,  // f
    30,  // g
    23,  // h
    82,  // i
    2,   // j
    25,  // k
    53,  // l
    27,  // m
    72,  // n
    61,  // o
    28,  // p
    0,   // q, fuck you q
    74,  // r
    88,  // s
    68,  // t
    33,  // u
    1,   // v
    9,   // w
    3,   // x
    16,  // y
    4,   // z
];

const wordScores = [
    1,
    4,
    6,
    8,
    10,
    12,
    14,
    16,
    18,
    20,
    22,
    24,
];

/* helper functions */

const clone2dArray = array => {
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
        newArray[i] = [...array[i]];
    }
    return newArray;
}

/* seed generation */

const getTodaysSeed = () => {
    return Math.floor(Date.now() / 86400000);
}

/* board generation */

const generateLetter = prng => {
    // get a random number between 0 and 999 inclusive
    const n = Math.floor(prng() * 1000);
    // convert this number to a letter using our freqency chart
    let index = 0;
    let sum = 0
    while (index < frequencies.length) {
        sum += frequencies[index];
        if (n < sum) break;
        index ++;
    }
    return String.fromCharCode(65 + index);
}

const generateBoard = prng => {
    const board = [...Array(boardSize)].map(_ => Array(boardSize));
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            board[i][j] = generateLetter(prng);
        }
    }
    return board;
}

const generateTodaysBoard = () => {
    const seed = getTodaysSeed();
    const prng = seedrandom(seed);
    const board = generateBoard(prng);
    return board;
}

const generateYesterdaysBoard = () => {
    const seed = getTodaysSeed() - 1;
    const prng = seedrandom(seed);
    const board = generateBoard(prng);
    return board;
}

/* finding words */

const checkWord = (board, word, pos = null) => {

    // if the word length is zero we found a match
    if (word.length === 0) return true;

    // if this is the first run, find all places we can start and recurse
    if (pos === null) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[i][j] === word.charAt(0)) {
                    const newBoard = clone2dArray(board);
                    newBoard[i][j] = null;
                    if (checkWord(newBoard, word.substr(1), {x: i, y: j})) return true;
                }
            }
        }
    }

    // if this is not the first run, check all adjacent squares to our current square and look for the next letter
    else {
        for (const i of [-1, 0, 1]) {
            for (const j of [-1, 0, 1]) {
                if (i === 0 && j === 0) continue;
                const x = pos.x + i;
                const y = pos.y + j;
                if (x < 0 || y < 0 || x >= board.length || y >= board.length) continue
                if (board[x][y] === word.charAt(0)) {
                    const newBoard = clone2dArray(board);
                    newBoard[x][y] = null;
                    if (checkWord(newBoard, word.substr(1), {x: x, y: y})) return true;
                }
            }
        }
    }

    // if we reached here we didn't find a match
    return false;
}

const findAllWords = board => {
    const results = [];
    for (const word of wordsList) {
        if (word.length < minWordLength) continue;
        if (checkWord(board, word)) results.push(word);
    }
    return results;
}

/* scoring */

const getWordScore = word => {
    let index = word.length - minWordLength;
    if (index < 0) index = 0;
    if (index > wordScores.length - 1) index = wordScores.length - 1;
    return wordScores[index];
}

export { boardSize, minWordLength, wordScores, getTodaysSeed, generateTodaysBoard, generateYesterdaysBoard, findAllWords, getWordScore }