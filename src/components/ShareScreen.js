import { useState } from "react";
import styled from "styled-components";
import { useGame } from "../providers/GameProvider";

const Title = styled.h2`
    margin-top: 0;
    font-weight: 700;
    font-size: 1.25rem;
`

const Info = styled.pre`
    font-weight: 400;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    background: var(--clr-highlight);
    border-radius: 0.25rem;
    padding: 0.375rem 0.5rem;
`

const Button = styled.button`
    border: none;
    background: var(--clr-primary);
    border-radius: 0.25rem;
    font-size: 0.875rem;
    font-weight: 400;
    color: white;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
`

const ShareScreen = () => {

    const { score, foundWords, levels } = useGame();
    const [copied, setCopied] = useState(false);

    let currentLevel = levels.length - 1;
    for (let i = 0; i < levels.length - 1; i++) {
        if (score < levels[i + 1]) {
            currentLevel = i;
            break;
        }
    }

    const seed = JSON.parse(window.localStorage.getItem("seed")) ?? 0;
    const date = new Date(seed * 86400000);
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getUTCMonth()];

    const info =
        `wordhuntle - ${month} ${date.getUTCDate()}, ${date.getUTCFullYear()}\n` +
        `Level ${currentLevel}/${levels.length - 1} — ` +
        `${score} point${score === 1 ? "" : "s"} — ` +
        `${foundWords.length} word${foundWords.length === 1 ? "" : "s"}`;

    const copyText = () => {
        navigator.clipboard.writeText(info);
        setCopied(true);
    }

    return (
        <>
            <Title>Share results</Title>
            <Info>{info}</Info>
            <Button onClick={copyText}>{copied ? "Copied!" : "Click to copy"}</Button>
        </>
    );
}

export default ShareScreen;