import styled, { keyframes } from "styled-components";
import { useGame } from "../providers/GameProvider";

const StyledWordInfo = styled.div`
    width: 100%;
    height: 2.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
`

const CurrentWord = styled.h2`
    margin: 0;
    padding: 0;
    font-size: 2.25rem;
    font-weight: 700;
`

const goodAnimation = keyframes`
    from {transform: translateY(1.25rem); opacity: 0}
    to {transform: translateY(0); opacity: 1}
`

const badAnimation = keyframes`
    0% {transform: translateX(0)}
    10% {transform: translateX(-0.5rem)}
    30% {transform: translateX(0.25rem)}
    50% {transform: translateX(-0.125rem)}
    70% {transform: translateX(0.0625rem)}
    90% {transform: translateX(-0.03125rem)}
    100% {transform: translateX(0)}
`

const InfoChip = styled.div`
    color: white;
    font-size: 1.125rem;
    font-weight: 400;
    padding: 0.25rem 1rem;
    width: fit-content;
    height: fit-content;
    border-radius: 20rem;
    &.error {
        background-color: #de3d2a;
        animation: ${badAnimation} 0.6s ease-in-out;
    }
    &.warning {
        background-color: #ebac00;
        animation: ${badAnimation} 0.6s ease-in-out;
    }
    &.success {
        background-color: #49b84f;
        animation: ${goodAnimation} 0.75s cubic-bezier(0, 0.75, 0.25, 1);
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