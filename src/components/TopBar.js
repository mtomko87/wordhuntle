import { useState } from "react";
import styled from "styled-components";
import InfoIcon from "../icons/InfoIcon";
import HelpScreen from "./HelpScreen";
import Popup from "./Popup";

const StyledTopBar = styled.div`
    width: 100%;
    background-color: var(--clr-square);
    border-bottom: 1px solid var(--clr-border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.375rem 0.75rem;
    position: relative;
`

const Title = styled.h1`
    margin: 0;
    font-size: 1.375rem;
    font-weight: 700;
`

const Button = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
    padding: 0;
    height: 1.75rem;
    width: 1.75rem;
`

const TopBar = () => {

    const [helpOpen, setHelpOpen] = useState(false);

    return (
        <>
            <StyledTopBar>
                <Title>wordhuntle</Title>
                <Button onClick={() => setHelpOpen(true)}>
                    <InfoIcon/>
                </Button>
            </StyledTopBar>
            {helpOpen && (
                <Popup close={() => setHelpOpen(false)}>
                    <HelpScreen/>
                </Popup>
            )}
        </>
    );
}

export default TopBar;