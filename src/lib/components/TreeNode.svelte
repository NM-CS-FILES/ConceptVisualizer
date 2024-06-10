<script lang="ts">
    import { Layer, type Render } from "svelte-canvas";

    export let x: number;
    export let y: number;
    export let radius: number = 50;

    let render: Render;
    $: render = ({ context }) => {
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.stroke();
    };
</script>

<Layer {render}/>