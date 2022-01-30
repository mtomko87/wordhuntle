import styled from "styled-components";
import { useGame } from "../providers/GameProvider";
import Board from "./Board";
import Levels from "./Levels";
import ScoreInfo from "./ScoreInfo";
import WordInfo from "./WordInfo";

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
    return (
        <StyledGameArea>
            <ScoreInfo/>
            <Levels/>
            <BoardArea>
                <WordInfo/>
                <Board/>
            </BoardArea>
        </StyledGameArea>
    );
}

export default GameArea;