import styled from "styled-components";
import { minWordLength, wordScores } from "../utils/utils";
import howToPlay from "../videos/how-to-play.gif";

const Title = styled.h2`
    margin-top: 0;
    font-weight: 700;
    font-size: 1.25rem;
`

const P = styled.p`
    font-weight: 400;
    font-size: 0.875rem;
`

const Gif = styled.img`
    width: 60%;
    border-radius: 0.25rem;
`

const Li = styled.li`
    font-weight: 400;
    font-size: 0.875rem;
`

const ListNoBullet = styled.ul`
    list-style-type: none;
    padding: 0;
`

const HelpScreen = () => {
    return (
        <>
            <Title>How to play</Title>
            <P>Use your mouse or finger to connect letters together on the grid to make words.</P>
            <Gif src={howToPlay} alt="How to play"/>
            <ul>
                <Li>You can connect any two adjacent letters, including diagonally</Li>
                <Li>You cannot use the same grid cell more than once in a word</Li>
                <Li>Your line <b>CAN</b> cross over itself</Li>
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
            <P><i>Tip: Every board will have a word that is at least 8 letters long. Make sure to keep an eye out for it!</i></P>
            <P>Score points to increase your level. Try to reach the max level each day!</P>
            <Title>More</Title>
            <P>Wordhuntle is updated every day at 8pm EST. Check back in each day for a new board!</P>
        </>
    );
}

export default HelpScreen;