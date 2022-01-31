import styled from "styled-components";
import { minWordLength, wordScores } from "../utils/utils";

const Title = styled.h2`
    font-weight: 700;
    font-size: 1.25rem;
`

const P = styled.p`
    font-weight: 400;
    font-size: 0.875rem;
`

const Li = styled.li`
    font-weight: 400;
    font-size: 0.875rem;
`

const Span = styled.span`
    font-weight: 700;
`

const ListNoBullet = styled.ul`
    list-style-type: none;
    padding: 0;
`

const HelpScreen = () => {
    return (
        <>
            <Title>How to play</Title>
            <P>Use your mouse or finger to connect letters together on the grid to make words. Keep in mind the following rules:</P>
            <ul>
                <Li>You can start a word at any position on the grid</Li>
                <Li>You cannot use the same grid cell more than once in a word</Li>
                <Li>Your line <Span>CAN</Span> cross over itself</Li>
                <Li>Your word must be at least {minWordLength} letters long</Li>
            </ul>
            <Title>Scoring</Title>
            <P>When you make a word, you will receive points depending on how long your word is:</P>
            <ListNoBullet>
                {[...Array(8)].map((_, index) => (
                    <Li key={index}>
                        {index + minWordLength} letters: {wordScores[index]} point{wordScores[index] === 1 ? "" : "s"}
                    </Li>
                ))}
            </ListNoBullet>
            <P>etc.</P>
            <P>Score points to increase your level. Try to reach the max level each day!</P>
            <Title>More</Title>
            <P>wordhuntle is updated each day at 7pm EST. Check back in each day for a new board!</P>
        </>
    );
}

export default HelpScreen;