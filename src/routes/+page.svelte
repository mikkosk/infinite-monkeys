<script lang="ts">
	import GuessList from "$lib/modules/GuessList.svelte";
	import Input from "$lib/modules/Input.svelte";
	import Timer from "$lib/modules/Timer.svelte";
    import { CorrectState, type Guess } from "$lib/types";


    let gameOver = false;
    let guesses: Guess[] = [];
    let answer = "To be or not to be that is the question";

    const matchPercentage = (guess: string, answer: string) => {
            const hasMatch = answer.toLowerCase().includes(guess.toLowerCase());

            if (!hasMatch) {
                return 0;
            }

            const guessLength = guess.length;
            const answerLength = answer.length;

            return Math.floor((guessLength / answerLength) * 100) || 1;
        }

    const getCorrectState = (matchPercentage: number) => {
        switch (matchPercentage) {
            case 100:
                return CorrectState.Correct;
            case 0:
                return CorrectState.Incorrect;
            default:
                return CorrectState.Partial;
        }
    }

    const addGuess = (guess: string) => {

        const id =`${guesses.length + 1}`;

        const percentage = matchPercentage(guess, answer);

        const correctState: Guess["correct"] = getCorrectState(percentage);

        const newGuess = { guess, correct: correctState, percentage, id };
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