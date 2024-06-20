<!--
 - https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg
-->

<script lang="ts">
    import { BookInfo } from "$lib/classes/BookInfo";

    export let bookInfo: BookInfo;

    let svg: SVGSVGElement;
    let spine: SVGRectElement;

    export function highlight() {
        spine.style.strokeWidth = "5px";
    }

    export function unhighlight() {
        spine.style.strokeWidth = "0px";
    }

    export function hide() {
        svg.style.display = "none";
    }

    export function show() { 
        svg.style.display = "block";
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svg bind:this={svg} on:mouseenter={highlight} on:mouseleave={unhighlight} width={bookInfo.width} height={bookInfo.height}>
    <!-- Spine -->
    <rect bind:this={spine} x={0} y={0} width={bookInfo.width} height={bookInfo.height} fill={bookInfo.color} stroke="black" stroke-width="0px"/>

    <!-- Shadow -->
    <rect x={bookInfo.width / 2} y={0} width={bookInfo.width / 2} height={bookInfo.height} opacity=0.15/>
</svg>
