import { useMemo } from "react";
import styled from "styled-components";
import { boardSize, findAllWords, generateYesterdaysBoard } from "../utils/utils";

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;   
`

const Title = styled.h2`
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
`

const SubTitle = styled.p`
    margin: 0;
    font-size: 0.875rem;
    font-weight: 400;
`

const Board = styled.div`
    display: grid;
    grid-template-columns: repeat(${boardSize}, 1fr);
    gap: 0.25rem;
    height: 12rem;
    width: 12rem;
    flex-shrink: 0;
`

const Square = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--clr-square);
    border: 0.1875rem solid var(--clr-border);
    border-radius: 5%;
    font-weight: 700;
    font-size: 1.5rem;
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
    color: ${props => props.found ? "var(--clr-primary)" : "var(--clr-text)"};
`

const Yesterday = () => {

    const board = useMemo(() => generateYesterdaysBoard(), []);
    const allWords = useMemo(() => findAllWords(board), [board]);
    const foundWords = JSON.parse(window.localStorage.getItem("yesterdaysFoundWords")) ?? [];

    return (
        <Container>
            <div>
                <Title>Yesterday's words ({allWords.length})</Title>
                <SubTitle>Words that you found will be highlighted</SubTitle>
            </div>
            <Board>
                {[...Array(boardSize * boardSize)].map((_, index) => (
                    <Square key={index}>
                        {board[index % boardSize][boardSize - Math.floor(index / boardSize) - 1]}
                    </Square>
                ))}
            </Board>
            <WordsContainer>
                {allWords.map(word => (
                    <Word key={word} found={foundWords.includes(word)}>
                        {word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()}
                    </Word>
                ))}
            </WordsContainer>
        </Container>
    );
}

export default Yesterday;