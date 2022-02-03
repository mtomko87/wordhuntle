import styled from "styled-components";
import EyeIcon from "../icons/EyeIcon";
import { useGame } from "../providers/GameProvider";
import FoundWords from "./FoundWords";
import Popup, { usePopupTransition } from "./Popup";

const StyledScoreInfo = styled.div`
    width: 100%;
    display: flex;
    align-items: baseline;
    gap: 0.4rem;
`

const Score = styled.h2`
    margin: 0;
    font-size: 2.375rem;
    font-weight: 700;
    flex-grow: 1;
`

const WordCount = styled.p`
    margin: 0;
    font-size: 1.25rem;
    font-weight: 400;
`

const SeeWordsButton = styled.button`
    border: none;
    cursor: pointer;
    height: 1.25rem;
    width: 1.25rem;
    padding: 0;
    position: relative;
    bottom: -0.25rem;
    background-color: transparent;
`

const ScoreInfo = () => {

    const [state, toggle] = usePopupTransition();
    const { score, foundWords } = useGame();

    return (
        <StyledScoreInfo>
            <Score>
                {score} pt{score === 1 ? "" : "s"}
            </Score>
            <WordCount>
                {foundWords.length} word{foundWords.length === 1 ? "" : "s"}
            </WordCount>
            <SeeWordsButton onClick={() => toggle(true)}>
                <EyeIcon/>
            </SeeWordsButton>
            <Popup state={state} close={() => toggle(false)}>
                <FoundWords/>
            </Popup>
        </StyledScoreInfo>
    );
}

export default ScoreInfo;