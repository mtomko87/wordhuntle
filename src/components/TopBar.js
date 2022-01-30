import { useState } from "react";
import styled from "styled-components";
import MenuIcon from "../icons/MenuIcon";
import Menu from "./Menu";

const StyledTopBar = styled.div`
    width: 100%;
    background-color: ${props => props.theme.square};
    border-bottom: 1px solid ${props => props.theme.border};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.125rem 0.5rem;
    position: relative;
`

const Title = styled.h1`
    margin: 0;
    font-size: 1.75rem;
    font-weight: 700;
`

const Button = styled.button`
    border: none;
    cursor: pointer;
    background-color: transparent;
    padding: 0;
    height: 2rem;
    width: 2rem;
`

const TopBar = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <StyledTopBar>
            <Title>wordhuntle</Title>
            <Button onClick={() => setMenuOpen(state => !state)}>
                <MenuIcon/>
            </Button>
            <Menu menuOpen={menuOpen}/>
        </StyledTopBar>
    );
}

export default TopBar;