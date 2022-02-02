import styled from "styled-components";
import Square from "./Square";
import { boardSize } from "../utils/utils";

const Container = styled.div`
    width: 100%;
    height: 0;
    padding-top: 100%;
    position: relative;
`

const StyledBoard = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(${boardSize}, 1fr);
    grid-gap: 0.375rem;
`

const Board = () => {
    return (
        <Container>
            <StyledBoard>
                {[...Array(boardSize * boardSize)].map((_, index) => (
                    <Square
                        key={index}
                        x={index % boardSize}
                        y={boardSize - Math.floor(index / boardSize) - 1}
                    />
                ))}
            </StyledBoard>
        </Container>
    );
}

export default Board;