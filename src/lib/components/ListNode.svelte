<script lang="ts">
    import { Layer, type Render } from "svelte-canvas";

    export let x;
    export let y;
    export let label: (string | null) = null;

    let render: Render;
    $: render = ({ context }) => {
        
    }
</script>
