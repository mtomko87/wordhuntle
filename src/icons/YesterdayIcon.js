import styled from "styled-components";

const Svg = styled.svg`
    stroke: var(--clr-text);
    fill: none;
    stroke-width: 2;
`

const YesterdayIcon = () => {
    return (
        <Svg viewBox="0 0 24 24">
            <polyline points="12 8 12 12 14 14" />
            <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
        </Svg>
    );
}

export default YesterdayIcon;