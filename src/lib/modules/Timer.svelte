<script lang="ts">
    export let gameOver: boolean;

    let time = 0;

    const timer = setInterval(() => {
        time += 1;
    }, 1000);

    $: if (gameOver) {
        clearInterval(timer);
    }

    $: minutes = Math.floor(time / 60).toString().padStart(2,"0");
    $: seconds = (time % 60).toString().padStart(2,"0");

</script>

<style>
    .time {
        display: block;
        font-size: 2rem;
        padding: 16px;
        background-color: #eee;
        border-radius: 5px;
        margin-top: 16px;
    }
</style>

<div>
    <span class="time" style={`color: ${gameOver ? "hotpink" : ""}`}><b>{minutes}:{seconds}</b></span>
</div>