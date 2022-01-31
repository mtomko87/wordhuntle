import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { getTodaysSeed } from './utils/utils';

// check if our local storage is out of date, and update it if so
const todaysSeed = getTodaysSeed();
const seed = JSON.parse(window.localStorage.getItem("seed"));

if (seed !== todaysSeed) {
	if (seed === todaysSeed - 1) {
		const foundWords = localStorage.getItem("foundWords");
		window.localStorage.setItem("yesterdaysFoundWords", foundWords);
	} else {
		window.localStorage.removeItem("yesterdaysFoundWords");
	}
	window.localStorage.setItem("seed", JSON.stringify(todaysSeed));
	window.localStorage.removeItem("foundWords");
}

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
