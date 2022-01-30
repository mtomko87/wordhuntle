import styled from "styled-components";

const StyledMenu = styled.div`
    background-color: ${props => props.theme.square};
    border: 1px solid ${props => props.theme.border};
    border-right: none;
    border-radius: 0 0 0 0.25rem;
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 20;
`

const MenuItem = styled.div`
    font-size: 1rem;
    padding: 0.25rem 1.25rem 0.25rem 0.5rem;
    cursor: pointer;
    &:hover {
        background-color: ${props => props.theme.highlight};
    }
`

const Menu = ({menuOpen}) => {
    return menuOpen ? (
        <StyledMenu>
            <MenuItem>How to play</MenuItem>
            <MenuItem>Yesterday's words</MenuItem>
            <MenuItem>Statistics</MenuItem>
        </StyledMenu>
    ) : null;
}

export default Menu;