import styled, { css } from "styled-components";
import { useGame } from "../providers/GameProvider";

const StyledLevels = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    &::before {
        content: "";
        background-color: var(--clr-primary);
        width: calc(100% - 2rem);
        height: 2px;
        position: absolute;
        left: 1rem;
        z-index: -1;
    }
`

const LevelContainer = styled.div`
    height: 2rem;
    width: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Level = styled.div`
    transition: 250ms;
    position: relative;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.875rem;
    font-weight: 700;
    color: var(--clr-primary);
    border: 2px solid var(--clr-primary);
    background-color: ${props => props.completed ? "var(--clr-primary)" : "var(--clr-square-active)"};
    height: ${props => props.active ? "2rem" : "0.75rem"};
    width: ${props => props.active ? "2rem" : "0.75rem"};
    ${props => props.current && css`
        &::after {
            content: "";
            position: absolute;
            top: -0.5rem;
            left: 50%;
            margin-left: -0.5rem;
            border-width: 0.5rem;
            border-style: solid;
            border-color: var(--clr-primary) transparent transparent transparent;
        }
    `}
`

const Levels = () => {

    const { score, levels } = useGame();

    let currentLevel = levels.length - 1;
    for (let i = 0; i < levels.length - 1; i++) {
        if (score < levels[i + 1]) {
            currentLevel = i;
            break;
        }
    }

    return (
        <StyledLevels>
            {levels.map((levelScore, index) => (
                <LevelContainer key={index}>
                    <Level
                        current={index === currentLevel}
                        completed={index <= currentLevel}
                        active={index === currentLevel + 1}
                    >
                        {(index === currentLevel + 1) && levelScore}
                    </Level>
                </LevelContainer>
            ))}
        </StyledLevels>
    );
}

export default Levels;