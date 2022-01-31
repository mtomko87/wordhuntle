import styled from "styled-components";

const Svg = styled.svg`
    stroke: var(--clr-text);
    stroke-width: 2;
    stroke-linecap: round;
    fill: none;
`

const InfoIcon = () => {
    return (
        <Svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
            <polyline points="11 12 12 12 12 16 13 16" />
        </Svg>
    );
}

export default InfoIcon;