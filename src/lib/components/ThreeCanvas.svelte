<script lang="ts">
    import { onMount } from "svelte";
    import { generate } from "../mapGenerator";
    import { createThreeScene, updateMesh } from "../scene";

    let canvas: HTMLCanvasElement;
    let width: number = 100;
    let height: number = 100;
    let step: number = 20;
    let amplitude: number = 20;
    let octaveCount: number = 2;
    let persistence: number = 0.5;
    let lacunarity: number = 2;

    let generationTime: number;

    onMount(() => {
        createThreeScene(canvas);
    });

    $: {
        const start = performance.now();
        const map = generate(
            width,
            height,
            1 / step,
            amplitude,
            octaveCount,
            persistence,
            lacunarity
        );
        generationTime = performance.now() - start;
        updateMesh(map);
    }
</script>

<div>
    <aside>
        <h6 class="time">Generation time : {generationTime}ms</h6>
        <h6>Map</h6>
        <label>
            <span>Width {width}</span>
            <input bind:value={width} type="range" min="10" max="2048" />
        </label>
        <label>
            <span>Height {height}</span>
            <input bind:value={height} type="range" min="10" max="2048" />
        </label>
        <hr />
        <h6>Perlin noise</h6>
        <label>
            <span>Step 1 / {step}</span>
            <input bind:value={step} type="range" min="1" max="256" />
        </label>
        <label>
            <span>Amplitude {amplitude}</span>
            <input bind:value={amplitude} type="range" min="1" max="100" />
        </label>
        <label>
            <span>Octaves {octaveCount}</span>
            <input bind:value={octaveCount} type="range" min="1" max="8" />
        </label>
        <label>
            <span>Persistence {persistence}</span>
            <input
                bind:value={persistence}
                type="range"
                min="0.1"
                max="1.0"
                step="0.1"
            />
        </label>
        <label>
            <span>Lacunarity {lacunarity}</span>
            <input
                bind:value={lacunarity}
                type="range"
                min="1.0"
                max="16.0"
                step="0.1"
            />
        </label>
    </aside>
    <canvas bind:this={canvas} />
</div>

<style>
    .time {
        text-align: left;
        margin-bottom: 1em;
        color: green;
    }
    div {
        display: flex;
    }

    aside {
        padding-left: 0.2em;
        padding-right: 2em;
        background: black;
        color: white;
        border-right: 1px solid white;
        text-align: left;
    }

    span {
        font-size: 12px;
    }

    h6 {
        text-align: center;
        margin: 0;
    }
</style>
