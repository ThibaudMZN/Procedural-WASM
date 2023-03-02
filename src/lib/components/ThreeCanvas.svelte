<script lang="ts">
    import { onMount } from "svelte";
    import { createThreeScene } from "../scene";

    let canvas: HTMLCanvasElement;

    onMount(() => {
        createThreeScene(canvas);
    });
</script>

<canvas bind:this={canvas} />
