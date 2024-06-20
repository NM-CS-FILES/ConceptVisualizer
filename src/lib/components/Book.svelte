<script lang="ts">
    import { type Color } from "$lib/types/Color";
    import { onMount } from "svelte";
    import Rand from "rand-seed";

    const BookColors: Color[] = [ "#8D544B", "#446463", "#AA483B", "#89969F", "#56565E", "#EFB561", "#749159", "#8E5053" ];
    const BookWidthRange:  number[] = [ 24, 60 ];
    const BookHeightRange: number[] = [ 145, 185 ];

    export let title: string;

    let svg: SVGSVGElement;
    let spine: SVGRectElement;
    let shadow: SVGRectElement;

    let width: number;
    let height: number;
    let color: Color;

    onMount(() => {
        // Wanted this to be deterministic
        const rand = new Rand(title);

        width = ((BookWidthRange[1] - BookWidthRange[0]) * rand.next()) + BookWidthRange[0];
        height = ((BookHeightRange[1] - BookHeightRange[0]) * rand.next()) + BookHeightRange[0];
        color = BookColors[Math.floor(rand.next() * BookColors.length)];
    });
    
    function handleMouseEnter() {
        spine.style.stroke = "black";
        spine.style.strokeWidth = "5px";
    }

    function handleMouseLeave() {
        spine.style.strokeWidth = "0px";
    }

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svg bind:this={svg} on:mouseenter={handleMouseEnter} on:mouseleave={handleMouseLeave} {width} {height}>
    <!-- Spine -->
    <rect bind:this={spine} x={0} y={0} {width} {height} fill={color}/>

    <!-- Shadow -->
    <rect bind:this={shadow} x={width / 2} y={0} width={width / 2} {height} opacity=0.15/>
</svg>
