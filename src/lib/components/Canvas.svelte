<script lang="ts">
    import { onMount } from "svelte";

    export let width: number;
    export let height: number; 

    let canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D;

    onMount(() => {
        context = canvas.getContext("2d")!;
    });

    export function getContext() : CanvasRenderingContext2D {
        return context;
    }

    export function getCanvas() : HTMLCanvasElement {
        return canvas;
    }

</script>

<canvas {width} {height} bind:this={canvas}/>