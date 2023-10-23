<script lang="ts">
    export let addGuess: (guess: string) => void;
    export let gameOver: boolean;
    let value = '';


    function handleSubmit(event: Event) {
        event.preventDefault();
        if(!value) return;
        const valueWithoutLineBreaks = value.replace(/(\r\n|\n|\r)/gm, "");
        addGuess(valueWithoutLineBreaks);
        value = '';
    }

    const handleEnter = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            handleSubmit(event);
        }
    }

</script>

<style>
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 6px;
        width: 100%;
        max-width: 366px;
    }

    textarea {
        border-radius: 5px;
        border: 0;
        margin: 0;
        padding: 12px;
        resize: none;
        width: auto;
        height: 100px;
    }

    button {
        width: 100%;
        font-size: 2rem;
        padding: 1rem;
        background-color: hotpink;
        border: none;
        cursor: pointer;
        border-radius: 5px;
        color: white;

        &:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
    }

    .textarea-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    label {
        font-size: 1.5rem;
        text-transform: uppercase;
    }
</style>

<form on:submit={handleSubmit}>

    <div class="textarea-container">
        <label for="guess-input"><b>Write, write, write</b></label>
        <textarea id="guess-input" bind:value={value} on:keydown={handleEnter}/>
    </div>

    <button type="submit" disabled={!value || gameOver}>Is this correct?</button>
</form>