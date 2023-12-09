import styled from "styled-components";
import { useGame } from "../providers/GameProvider";

const Label = styled.label`
    cursor: pointer;
    user-select: none;
    width: fit-content;
`

const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
    width: 16px;
    height: 16px;
    cursor: pointer;
`

const StyledFoundWords = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`

const Title = styled.h2`
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
`

const WordsContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow-y: auto;
    padding-bottom: 1rem;
`

const Word = styled.p`
    margin: 0;
    font-size: 0.875rem;
    font-weight: 400;
`

const FoundWords = () => {

    const { allWords, foundWords, showingHints, setShowingHints } = useGame();

    return (
        <StyledFoundWords>
            <Title>Found words ({foundWords.length}/{allWords.length})</Title>
            <Label><StyledCheckbox checked={showingHints} onChange={() => {setShowingHints(!showingHints)}} /> Show Hints</Label>
            <WordsContainer>
                {(showingHints ? [...allWords] : [...foundWords]).sort().map(word => (
                    <Word key={word}>
                        {foundWords.includes(word) ? word.charAt(0).toUpperCase() + word.substr(1).toLowerCase() : getUnRevealedWord(word)}
                    </Word>
                ))}
            </WordsContainer>
        </StyledFoundWords>
    );
}

const numToReveal = {
    4: 1,
    5: 1,
    6: 2,
    7: 3,
    8: 3,
    9: 4,
    10: 4,
    11: 5,
    12: 5,
    13: 6,
    14: 6,
    15: 7,
    16: 7
};

const getUnRevealedWord = (word) => {
    word = word.charAt(0) + word.substring(1).toLowerCase();

    const revealedPart = word.substring(0, numToReveal[word.length]);
    const hiddenPart = "_".repeat(word.length - numToReveal[word.length]);

    return `${revealedPart}${hiddenPart} (${word.length} letters)`;
}

export default FoundWords;