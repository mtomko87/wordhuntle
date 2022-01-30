import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import GameProvider from "../providers/GameProvider";
import GameArea from "./GameArea";
import TopBar from "./TopBar";

const theme = {
	background: "#f7f7f7",
	primary: "#007bff",
	square: "white",
	squareActive: "#e0efff",
	border: "#ddd",
	text: "#444",
	highlight: "#eee",
}

const GlobalStyle = createGlobalStyle`

	body {
		margin: 0;
		background-color: ${props => props.theme.background};
	}

	*,
	*::before,
	*::after {
		box-sizing: border-box;
		font-family: 'Source Serif 4', sans-serif;
		color: ${props => props.theme.text}
	}

	html, body, #root {
		height: 100%;
	}

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
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle/>
			<StyledApp>
				<TopBar/>
				<GameProvider>
					<GameArea/>
				</GameProvider>	
			</StyledApp>
		</ThemeProvider>
	);
}

export default App;
