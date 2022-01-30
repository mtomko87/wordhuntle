import styled from "styled-components";

const Svg = styled.svg`
    stroke: var(--clr-text);
    stroke-width: 3;
`

const CloseIcon = () => {
    return (
        <Svg viewBox="0 0 24 24">
            <line x1="2" y1="2" x2="22" y2="22" />
            <line x1="22" y1="2" x2="2" y2="22" />
        </Svg>
    );
}

export default CloseIcon;