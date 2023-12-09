import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useStateTrigger, useStateRef, useLocalStorageRef } from "../hooks/hooks";
import { minWordLength, generateTodaysBoard, findAllWords, getWordScore } from "../utils/utils";

const GameContext = createContext();

const GameProvider = ({children}) => {

    // state
    // anything accessed from the 'mouseup' event handler needs to use a ref
    const [currentWord, currentWordRef, setCurrentWord] = useStateRef("");
    const [foundWords, foundWordsRef, setFoundWords] = useLocalStorageRef("foundWords", []);
    const [wordActive, setWordActive] = useState(false);
    const [path, setPath] = useState([]);
    const [wordInfo, wordInfoTrigger, setWordInfo] = useStateTrigger(null);
    const [showingHints, setShowingHints] = useState(false);

    const score = useMemo(() => {
        let total = 0;
        for (const word of foundWords) {
            total += getWordScore(word);
        }
        return total;
    }, [foundWords]);

    // get all the board information
    const board = useMemo(() => generateTodaysBoard(), []);
    const allWords = useMemo(() => findAllWords(board), [board]);
    const levels = useMemo(() => {
        let maxScore = 0;
        for (const word of allWords) maxScore += getWordScore(word);
        return [
            0,
            Math.floor(maxScore * 0.05),
            Math.floor(maxScore * 0.11),
            Math.floor(maxScore * 0.18),
            Math.floor(maxScore * 0.26),
            Math.floor(maxScore * 0.35),
            Math.floor(maxScore * 0.45),
            Math.floor(maxScore * 0.56),
            Math.floor(maxScore * 0.68),
        ];
    }, [allWords]);

    // useEffect(() => {
    //     console.log(allWords.sort((a, b) => b.length - a.length));
    // }, [allWords]);

    // function to submit the current word if it exists
    const submitWord = () => {

        const newWord = currentWordRef.current;
        if (!newWord) return;

        if (newWord.length === 1)
            setWordInfo(null);
        else if (newWord.length < minWordLength)
            setWordInfo("Too short");
        else if (foundWordsRef.current.includes(newWord))
            setWordInfo("Already found");
        else if (!allWords.includes(newWord))
            setWordInfo("Not a word");
        else {
            const foundWordsCopy = [...foundWordsRef.current];
            foundWordsCopy.push(newWord);
            setFoundWords(foundWordsCopy);
            setWordInfo(`Nice! +${getWordScore(newWord)}`);
        }

        setWordActive(false);
        setCurrentWord("");
        setPath([]);
    }

    // add global event listener to submit the current word when the mouse is released
    const handleMouseUp = e => {
        if (e.button !== 0) return;
        submitWord();
    }

    useEffect(() => {
        window.addEventListener("mouseup", handleMouseUp);
        return () => window.removeEventListener("mouseup", handleMouseUp);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // handle the word info popup
    useEffect(() => {
        if (wordInfo === null) return;
        const timeout = setTimeout(() => setWordInfo(null), 1500);
        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wordInfoTrigger]);

    // allow a square to retrieve its necessary information
    const getSquareInfo = (x, y) => {

        let active = false;
        let lineDirection = null;

        for (let i = 0; i < path.length; i++) {
            if (path[i].x === x && path[i].y === y) {
                active = true;
                if (i < path.length - 1) {
                    lineDirection = {
                        x: path[i + 1].x - path[i].x,
                        y: path[i + 1].y - path[i].y,
                    }
                }
            }
        }

        return {
            letter: board[x][y],
            active: active,
            lineDirection: lineDirection,
        }
    }

    // helper functions
    const addToPath = (x, y) => {
        const pathCopy = [...path];
        pathCopy.push({x, y});
        setPath(pathCopy);
        const newLetter = board[x][y];
        setCurrentWord(currentWord + newLetter);
    }

    const removeFromPath = () => {
        const pathCopy = [...path];
        pathCopy.pop();
        setPath(pathCopy);
        setCurrentWord(currentWord.slice(0, -1));
    }

    // updating current word
    const squareClicked = (x, y) => {
        if (wordActive) return;
        setWordActive(true);
        addToPath(x, y);
    }

    const squareEntered = (x, y) => {
        if (!wordActive) return;
        for (let i = 0; i < path.length; i++) {
            if (path[i].x === x && path[i].y === y) {
                if (i === path.length - 2) removeFromPath();
                return;
            }
        }
        const {x: pathEndX, y: pathEndY} = path[path.length - 1];
        if (Math.abs(x - pathEndX) > 1 || Math.abs(y - pathEndY) > 1) return;
        addToPath(x, y);
    }

    return (
        <GameContext.Provider value={{
            currentWord,
            getSquareInfo,
            squareClicked,
            squareEntered,
            submitWord,
            allWords,
            foundWords,
            score,
            levels,
            wordInfo,
            showingHints,
            setShowingHints
        }}>
            {children}
        </GameContext.Provider>
    );
}

const useGame = () => {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error("useGame must be used inside a GameProvider");
    }
    return context;
}

export default GameProvider;
export { useGame };