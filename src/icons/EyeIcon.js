import styled from "styled-components";

const Svg = styled.svg`
    stroke: var(--clr-text);
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
`

const EyeIcon = () => {
    return (
        <Svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="2" />
            <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
        </Svg>
    );
}

export default EyeIcon;