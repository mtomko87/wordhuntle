import styled from "styled-components";
import { useGame } from "../providers/GameProvider";

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

    const { allWords, foundWords } = useGame();

    return (
        <StyledFoundWords>
            <Title>Found words ({foundWords.length}/{allWords.length})</Title>
            <WordsContainer>
                {[...foundWords].sort().map(word => (
                    <Word key={word}>
                        {word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()}
                    </Word>
                ))}
            </WordsContainer>
        </StyledFoundWords>
    );
}

export default FoundWords;