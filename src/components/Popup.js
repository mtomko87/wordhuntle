import useTransition from "react-transition-state";
import styled from "styled-components";
import CloseIcon from "../icons/CloseIcon";

const Background = styled.div`
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 0;
    height: 100%;
    width: 100vw;
    background-color: var(--clr-overlay);
    z-index: 30;
    display: flex;
    justify-content: center;
    align-items: flex-end;

    transition: opacity 300ms ease-in-out;
    ${props => ((props.state === "preEnter" || props.state === "exiting") && `
        opacity: 0;
    `)}
`

const StyledPopup = styled.div`
    background-color: var(--clr-background);
    border-radius: 0.375rem 0.375rem 0 0;
    height: calc(100% - 1.5rem);
    width: 100%;
    max-width: 60vh;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
    padding: 1rem 1rem 0 1rem;

    transition: transform 300ms ease-in-out;
    ${props => ((props.state === "preEnter" || props.state === "exiting") && `
        transform: translateY(100%);
    `)}
`

const CloseButton = styled.button`
    background-color: transparent;
    border: none;
    height: 0.875rem;
    width: 0.875rem;
    padding: 0;
    cursor: pointer;
`

const Content = styled.div`
    width: 100%;
    flex: 1;
    overflow: auto;
`

const Popup = ({children, state, close}) => {
    return state === "unmounted" ? null : (
        <Background state={state}>
            <StyledPopup state={state}>
                <CloseButton onClick={close}>
                    <CloseIcon/>
                </CloseButton>
                <Content>
                    {children}
                </Content>
            </StyledPopup>
        </Background>
    );
}

const usePopupTransition = () => {
    return useTransition({
        timeout: 300,
        mountOnEnter: true,
        unmountOnExit: true,
        preEnter: true
    });
}

export default Popup;
export { usePopupTransition };