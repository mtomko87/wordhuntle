import styled from "styled-components";

const Svg = styled.svg`
    stroke: var(--clr-text);
    stroke-width: 2;
    stroke-linecap: round;
    fill: none;
`

const LightIcon = () => {
    return (
        <Svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="4" />
            <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
        </Svg>
    );
}

export default LightIcon;