import { useState } from "react";
import styled from "styled-components";
import InfoIcon from "../icons/InfoIcon";
import YesterdayIcon from "../icons/YesterdayIcon";
import HelpScreen from "./HelpScreen";
import Popup from "./Popup";
import Yesterday from "./Yesterday";

const StyledTopBar = styled.div`
    width: 100%;
    background-color: var(--clr-square);
    border-bottom: 1px solid var(--clr-border);
    display: flex;
    align-items: center;
    padding: 0.375rem 0.75rem;
    gap: 0.5rem;
`

const Title = styled.h1`
    margin: 0;
    font-size: 1.375rem;
    font-weight: 700;
    flex: 1;
`

const Button = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
    padding: 0;
    height: 1.25rem;
    width: 1.25rem;
`

const TopBar = () => {

    const [helpOpen, setHelpOpen] = useState(false);
    const [yesterdayOpen, setYesterdayOpen] = useState(false);

    return (
        <>
            <StyledTopBar>
                <Title>wordhuntle</Title>
                <Button onClick={() => setYesterdayOpen(true)}>
                    <YesterdayIcon/>
                </Button>
                <Button onClick={() => setHelpOpen(true)}>
                    <InfoIcon/>
                </Button>
            </StyledTopBar>
            {helpOpen && (
                <Popup close={() => setHelpOpen(false)}>
                    <HelpScreen/>
                </Popup>
            )}
            {yesterdayOpen && (
                <Popup close={() => setYesterdayOpen(false)}>
                    <Yesterday/>
                </Popup>
            )}
        </>
    );
}

export default TopBar;