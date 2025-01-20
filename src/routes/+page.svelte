<script lang="ts">
	import GuessList from "../lib/modules/GuessList.svelte";
	import Input from "../lib/modules/Input.svelte";
	import Timer from "../lib/modules/Timer.svelte";
    import { CorrectState } from "../lib/types";
    import type { Guess } from "../lib/types";
    import {hamlet} from "../lib/hamlet";



    let gameOver = false;
    let guesses: Guess[] = [];
    let answer = hamlet[Math.floor(Math.random() * hamlet.length)].toLowerCase();

    const matchPercentage = (guess: string, answer: string) => {
            const guessCharacters = guess.split("").reduce((acc, char) => {
                acc[char] = acc[char] ? acc[char] + 1 : 1;
                return acc;
            }, {} as Record<string, number>);

            const answerCharacters = answer.split("").reduce((acc, char) => {
                acc[char] = acc[char] ? acc[char] + 1 : 1;
                return acc;
            }, {} as Record<string, number>);

            let correctCharacters = 0;
            let unnecessaryCharacters = 0;

            for (const char in guessCharacters) {
                const answerCount = answerCharacters[char] || 0;
                const guessCount = guessCharacters[char];

                if(guessCount <= answerCount) {
                    correctCharacters += guessCount;
                } else {
                    correctCharacters += answerCount;
                    unnecessaryCharacters += guessCount - answerCount;
                }
            }

            let chractersInCorrectPlaces = 0;

            for (let i = 0; i < answer.length; i++) {
                if (guess[i] === answer[i]) {
                    chractersInCorrectPlaces++;
                }
            }

            return {
                correctCharacters,
                unnecessaryCharacters,
                chractersInCorrectPlaces,
                percentage: Math.floor(chractersInCorrectPlaces/answer.length*100)
            }

        }

    const getCorrectState = (matchPercentage: number) => {
        switch (matchPercentage) {
            case 100:
                return CorrectState.Correct;
            default:
                return CorrectState.Partial;
        }
    }

    const addGuess = (guessRaw: string) => {

        const guess = guessRaw.toLowerCase();

        const id =`${guesses.length + 1}`;

        const {percentage, correctCharacters, chractersInCorrectPlaces, unnecessaryCharacters} = matchPercentage(guess, answer);

        const correctState: Guess["correct"] = getCorrectState(percentage);

        const newGuess = { guess, correct: correctState, percentage, id, correctCharacters, chractersInCorrectPlaces, unnecessaryCharacters };
        guesses = [...guesses, newGuess];

        if (correctState === CorrectState.Correct) {
            gameOver = true;
        }
    }

</script>
<div class="container">
    <div class="sidebar">
        <Timer gameOver={gameOver} />
    </div>
    <div class="content">
        <div class="answer-box">
            <p class="answer">{answer}</p>
        </div>
        <Input addGuess={addGuess} gameOver={gameOver}/>
        <GuessList guesses={guesses} />
    </div>

    <div class="sidebar">
        <div class="infinite-monkeys">
        <span><i>
            The infinite monkey theorem states that a monkey hitting keys at random on a typewriter keyboard for an infinite amount of time will almost surely type any given text, including the complete works of William Shakespeare. In fact, the monkey would almost surely type every possible finite text an infinite number of times. The theorem can be generalized to state that any sequence of events which has a non-zero probability of happening will almost certainly eventually occur, given unlimited time.
        </i>
        </span>

        <span>Find out what this monkey should be writing by guessing different strings of text. Each answer shows you how close you are to the target.</span>
    </div>
    </div>
</div>

<style>

    .answer-box {
        background-color: lightcoral;
    }

    .answer {
        color: lightcoral;
    }
    .answer:hover {
        color: black;
    }

    .container {
        display: flex;
        flex-direction: row;
        height: 100vh;
    }

    .sidebar {
        flex: 1 1 0px;
        background-color: #ccc;
        display: flex;
        flex-direction: column;
        align-items: center;

    }

    .content {
        flex-grow: 3;
        background-color: #eee;
        max-width: 768px;
        flex-direction: column-reverse;
        display: flex;
        padding-bottom: 128px;
        align-items: center;
    }

    .infinite-monkeys {
        display: flex;
        flex-direction: column;
        padding: 16px;
        gap: 16px;
    }

</style>