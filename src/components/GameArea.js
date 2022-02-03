import { useEffect, useState } from "react";
import styled from "styled-components";
import { useGame } from "../providers/GameProvider";
import Board from "./Board";
import CongratulationsScreen from "./CongratulationsScreen";
import Levels from "./Levels";
import Popup, { usePopupTransition } from "./Popup";
import ScoreInfo from "./ScoreInfo";
import WordInfo from "./WordInfo";
import AllWordsScreen from "./AllWordsScreen";

const StyledGameArea = styled.div`
    width: 100%;
    max-width: 60vh;
    flex-grow: 1;
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
`

const BoardArea = styled.div`
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
`

const GameArea = () => {

    const [maxLevel, setMaxLevel] = useState(false);
    const [foundAll, setFoundAll] = useState(false);
    const [congratsState, toggleCongrats] = usePopupTransition();
    const [allWordsState, toggleAllWords] = usePopupTransition();

    const { score, levels, allWords, foundWords } = useGame();

    useEffect(() => {
        if (foundWords.length === allWords.length) {
            if (!foundAll) {
                setFoundAll(true);
                setTimeout(() => toggleAllWords(true), 500);
            }
        } 
        else if (score >= levels[levels.length - 1]) {
            if (!maxLevel) {
                setMaxLevel(true);
                setTimeout(() => toggleCongrats(true), 500);
            }
        }
    }, [score, levels, allWords, foundWords, foundAll, maxLevel, toggleAllWords, toggleCongrats]);

    return (
        <>
            <StyledGameArea>
                <ScoreInfo/>
                <Levels/>
                <BoardArea>
                    <WordInfo/>
                    <Board/>
                </BoardArea>
            </StyledGameArea>
            <Popup state={congratsState} close={() => toggleCongrats(false)}>
                <CongratulationsScreen/>
            </Popup>
            <Popup state={allWordsState} close={() => toggleAllWords(false)}>
                <AllWordsScreen/>
            </Popup>
        </>
    );
}

export default GameArea;