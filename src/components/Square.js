import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useGame } from "../providers/GameProvider";

const StyledSquare = styled.div`
    background-color: ${props => props.active ? "var(--clr-square-active)" : "var(--clr-square)"};
    border: 0.25rem solid ${props => props.active ? "var(--clr-primary)" : "var(--clr-border)"};
    border-radius: 7%;
    position: relative;
    touch-action: none;
`

const Inner = styled.div.attrs(props => ({
    style: {
        fontSize: props.fontSize,
    }
}))`
    color: ${props => props.active ? "var(--clr-primary)" : "var(--clr-text)"};
    font-weight: 700;
    width: 100%;
    height: 100%;
    border-radius: 35%;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
`

const Svg = styled.svg`
    stroke: var(--clr-primary);
    opacity: 0.3;
    stroke-width: 8%;
    position: absolute;
    z-index: 10;
    top: calc(-50% - 0.875rem);
    left: calc(-50% - 0.875rem);
    width: calc(200% + 1.75rem);
    height: calc(200% + 1.75rem);
    stroke-linecap: round;
    overflow: visible;
    pointer-events: none;
`

const Square = ({x, y}) => {

    const [fontSize, setFontSize] = useState(0);
    const squareRef = useRef(null);

    const { getSquareInfo, squareClicked, squareEntered, submitWord } = useGame();
    const { letter, active, lineDirection } = getSquareInfo(x, y);

    // dynamically set the font size
    const calcFontSize = () => {
        if (squareRef.current) {
            const rect = squareRef.current.getBoundingClientRect();
            setFontSize(rect.width * 0.5);
        }
    }

    useEffect(() => {
        calcFontSize();
        window.addEventListener("resize", calcFontSize);
        return () => window.removeEventListener("resize", calcFontSize);
    }, []);

    // helper functions
    const getLinePos = (n) => {
        switch(n) {
            case -1: return "0%";
            case 0: return "50%";
            case 1: return "100%";
            default: return "50%";
        }
    }

    // handle mouse events
    const handleMouseDown = e => {
        if (e.button !== 0) return;
        squareClicked(x, y);
    }

    const handleMouseMove = () => {
        squareEntered(x, y)
    }

    // convert touch events into mouse events
    const handleTouchStart = e => {
        const touch = e.changedTouches[0];
        const simulatedEvent = new MouseEvent("mousedown", {
            bubbles: true, cancelable: true, view: window, detail: 1,
            screenX: touch.screenX, screenY: touch.screenY, clientX: touch.clientX, clientY: touch.clientY,
            ctrlKey: false, altKey: false, shiftKey: false, metaKey: false, button: 0, relatedTarget: null
        });
        touch.target.dispatchEvent(simulatedEvent);
    }

    const handleTouchMove = e => {
        const touch = e.changedTouches[0];
        const simulatedEvent = new MouseEvent("mousemove", {
            bubbles: true, cancelable: true, view: window, detail: 1,
            screenX: touch.screenX, screenY: touch.screenY, clientX: touch.clientX, clientY: touch.clientY,
            ctrlKey: false, altKey: false, shiftKey: false, metaKey: false, button: 0, relatedTarget: null
        });
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        if (element) {
            element.dispatchEvent(simulatedEvent);
        }
    }

    return (
        <StyledSquare
            ref={squareRef}
            active={active}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={submitWord}
            onMouseDown={handleMouseDown}
        >
            <Inner active={active} fontSize={fontSize} onMouseMove={handleMouseMove}>
                {letter}
            </Inner>
            {lineDirection != null && (
                <Svg>
                    <line
                        x1="50%"
                        y1="50%"
                        x2={getLinePos(lineDirection.x)}
                        y2={getLinePos(-lineDirection.y)}
                    />
                </Svg>
            )}
        </StyledSquare>
    );
}

export default Square;