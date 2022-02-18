import styled from "styled-components";

const Svg = styled.svg`
    stroke: var(--clr-text);
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
`

const DarkIcon = () => {
    return (
        <Svg viewBox="0 0 24 24">
            <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
        </Svg>
    );
}

export default DarkIcon;