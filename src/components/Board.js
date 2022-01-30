import styled from "styled-components";
import Square from "./Square";
import { boardSize } from "../utils/utils";

const Div = styled.div`
    width: 100%;
    aspect-ratio: 1;
    display: grid;
    grid-template-columns: repeat(${boardSize}, 1fr);
    grid-gap: 2%;
`

const Board = () => {
    return (
        <Div>
            {[...Array(boardSize * boardSize)].map((_, index) => (
                <Square
                    key={index}
                    x={index % boardSize}
                    y={boardSize - Math.floor(index / boardSize) - 1}
                />
            ))}
        </Div>
    );
}

export default Board;