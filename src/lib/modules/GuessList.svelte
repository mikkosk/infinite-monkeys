<script lang="ts">
	import { CorrectState, type Guess } from "../types";

    export let guesses: Guess[];

    const formText = (guess: Guess) => {

        if (guess.correct === CorrectState.Correct) {
            return `👑 ${guess.guess} 👑`;
        }

        return guess.guess;
    }
</script>

<div class="container">
<div class="curtain" />
<ul class="list">
    {#each guesses as guess}
        <li class={`guess ${guess.correct}`}>
            <span>{formText(guess)}</span>
            <div>
                <span>Oikeita kirjaimia: {guess.correctCharacters}, joista oikeassa paikassa: {guess.chractersInCorrectPlaces}.</span>
                <br/>
                <span>Tarpeettomia kirjaimia: {guess.unnecessaryCharacters}.</span>
            </div>
            <div class="progress_bar_container">
                <div class="pbc left">
                    <div class="progress_bar" style={`width: ${guess.percentage}%`}/>
                </div>
                <span class="percentage">{guess.percentage}%</span>
                <div class="pbc right">
                    <div class="progress_bar" style={`width: ${guess.percentage}%`}/>
                </div>
            </div>
        </li>
    {/each}
</ul>
</div>

<style>
    .container {
        position: relative;
        width: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column-reverse;
        flex-grow: 1;
    }

    .curtain {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        
        background-image: linear-gradient(to bottom, #eee, #eeeeee00);
      
    }

    .guess {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
        margin-bottom: 0.5rem;
        gap: 12px;
    }

    .guess.correct {
        background-color: #cfc;
    }

    .guess span {
        flex-grow: 1;
    }

    .progress_bar_container {
        width: 100%;
        display: flex;

    }

    .progress_bar {
        height: 100%;
        background-color: #ccc;
        border-radius: 25px;
    }

    .list {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 0 12px;
    }

    .percentage {
        margin: 0 0.5rem;
        &&& {flex-grow: 0};
    }

    .pbc {
        flex-grow: 1;
    }

    .left {
        display: flex;
        justify-content: flex-end;
    }

    .right {
        display: flex;
        justify-content: flex-start;
    }
</style>