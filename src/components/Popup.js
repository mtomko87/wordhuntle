import styled from "styled-components";
import CloseIcon from "../icons/CloseIcon";

const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 30;
    display: flex;
    justify-content: center;
    align-items: flex-end;
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
    gap: 0.25rem;
    padding: 1rem;
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

const Popup = ({children, close}) => {
    return (
        <Background>
            <StyledPopup>
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

export default Popup;