import styled, { createGlobalStyle, css } from "styled-components";
import { useLocalStorage } from "../hooks/hooks";
import GameProvider from "../providers/GameProvider";
import GameArea from "./GameArea";
import TopBar from "./TopBar";

const GlobalStyle = createGlobalStyle`

	/* colors */
	:root {
		${props => props.darkMode ? css`
			--clr-background: #111;
			--clr-primary: #3897ff;
			--clr-square: #242424;
			--clr-square-active: #1f2e40;
			--clr-border: #3a3a3a;
			--clr-text: white;
			--clr-highlight: #222;
			--clr-overlay: rgba(255, 255, 255, 0.1);
		` : css`
			--clr-background: #f7f7f7;
			--clr-primary: #007bff;
			--clr-square: white;
			--clr-square-active: #e0efff;
			--clr-border: #ddd;
			--clr-text: #444;
			--clr-highlight: #e9e9e9;
			--clr-overlay: rgba(0, 0, 0, 0.5);
		`}
	}

	/* misc */
	body {
		margin: 0;
		background-color: var(--clr-background);
	}

	*,
	*::before,
	*::after {
		box-sizing: border-box;
		font-family: 'Source Serif 4', sans-serif;
		color: var(--clr-text);
	}

	/* set everything to be the height of the screen */
	html, body, #root {
		height: 100%;
	}

	/* set global font size based on screen size */
	html {
		font-size: 16px;
	}

	@media screen and (min-width: 401px) and (min-height: 667px) {
		html {
			font-size: 20px;
		}
	}

	@media screen and (min-width: 481px) and (min-height: 801px) {
		html {
			font-size: 24px;
		}
	}

	@media screen and (min-width: 661px) and (min-height: 1101px) {
		html {
			font-size: 32px;
		}
	}
`

const StyledApp = styled.div`
	height: 100%;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const App = () => {
	const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);
	return (
		<>
			<GlobalStyle darkMode={darkMode}/>
			<StyledApp>
				<GameProvider>
					<TopBar darkMode={darkMode} setDarkMode={setDarkMode}/>
					<GameArea/>
				</GameProvider>	
			</StyledApp>
		</>
	);
}

export default App;
