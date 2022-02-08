import { useEffect } from "react";
import styled from "styled-components";
import InfoIcon from "../icons/InfoIcon";
import ShareIcon from "../icons/ShareIcon";
import YesterdayIcon from "../icons/YesterdayIcon";
import HelpScreen from "./HelpScreen";
import Popup, { usePopupTransition } from "./Popup";
import ShareScreen from "./ShareScreen";
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

    const [helpState, toggleHelp] = usePopupTransition();
    const [yesterdayState, toggleYesterday] = usePopupTransition();
    const [shareState, toggleShare] = usePopupTransition();

    useEffect(() => {
        const visitedFlag = window.localStorage.getItem("visitedFlag");
        if (!visitedFlag) {
            toggleHelp(true);
            window.localStorage.setItem("visitedFlag", 1);
        }
    }, [toggleHelp]);

    return (
        <>
            <StyledTopBar>
                <Title>wordhuntle</Title>
                <Button onClick={() => toggleShare(true)}>
                    <ShareIcon/>
                </Button>
                <Button onClick={() => toggleYesterday(true)}>
                    <YesterdayIcon/>
                </Button>
                <Button onClick={() => toggleHelp(true)}>
                    <InfoIcon/>
                </Button>
            </StyledTopBar>
            <Popup state={shareState} close={() => toggleShare(false)}>
                <ShareScreen/>
            </Popup>
            <Popup state={yesterdayState} close={() => toggleYesterday(false)}>
                <Yesterday/>
            </Popup>
            <Popup state={helpState} close={() => toggleHelp(false)}>
                <HelpScreen/>
            </Popup>
        </>
    );
}

export default TopBar;