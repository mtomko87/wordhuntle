import styled from "styled-components";
import { useGame } from "../providers/GameProvider";

const StyledWordInfo = styled.div`
    width: 100%;
    height: 2.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
`

const CurrentWord = styled.h1`
    margin: 0;
    padding: 0;
    font-size: 2.25rem;
    font-weight: 700;
`

const InfoChip = styled.div`
    color: white;
    font-size: 1.125rem;
    padding: 0.25rem 1rem;
    width: fit-content;
    height: fit-content;
    border-radius: 20rem;

    &.error {
        background-color: #cf3827;
    }

    &.warning {
        background-color: #ebac00;
    }

    &.success {
        background-color: #49b84f;
    }
`

const WordInfo = () => {

    const { currentWord, wordInfo } = useGame();

    let infoClass = "";
    switch(wordInfo) {
        case "Too short":
            infoClass = "error";
            break;
        case "Not a word":
            infoClass = "error";
            break;
        case "Already found":
            infoClass = "warning";
            break;
        default:
            infoClass = "success";
            break;
    }

    return (
        <StyledWordInfo>
            {currentWord.length > 0 && (
                <CurrentWord>{currentWord}</CurrentWord>
            )}
            {wordInfo !== null && currentWord.length === 0 && (
                <InfoChip className={infoClass}>{wordInfo}</InfoChip>
            )}
        </StyledWordInfo>
    );
}

export default WordInfo;