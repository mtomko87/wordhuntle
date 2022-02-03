import styled from "styled-components";
import PartyIcon from "../icons/PartyIcon";
import { useGame } from "../providers/GameProvider";

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`

const Title = styled.h2`
    font-weight: 700;
    font-size: 1.5rem;
    margin: 0;
`

const P = styled.p`
    font-weight: 400;
    font-size: 1rem;
    margin: 0.25rem;
`

const IconContainer = styled.div`
    width: 60%;
    display: flex;
    justify-content: center;
    flex: 1;
`

const CongratulationsScreen = () => {

    const { allWords, foundWords } = useGame();

    return (
        <Container>
            <Title>Congratulations!</Title>
            <P>You've reached the max level for today!</P>
            <P>Words found: {foundWords.length}/{allWords.length}</P>
            <IconContainer>
                <PartyIcon/>
            </IconContainer>
        </Container>
    )
}

export default CongratulationsScreen;