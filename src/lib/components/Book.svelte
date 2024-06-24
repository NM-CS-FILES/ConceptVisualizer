<!--
 - https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg
-->

<script lang="ts">
    import { BookInfo } from "$lib/classes/BookInfo";
    import { onMount } from "svelte";
    import { cubicOut } from "svelte/easing";
    import { tweened } from "svelte/motion";
    import { type Writable } from "svelte/store";
    
    export let bookInfo: BookInfo;
    export let flat: boolean = false;

    let svg: SVGSVGElement;
    let spineStrokeWidth = 0;

    let x = 0;
    let y = 0;
    let width = bookInfo.width;
    let height = bookInfo.height;
    let opacity = tweened<number>(100, { easing: cubicOut });
    let hidden = false;

    //
    //

    onMount(() => { if (flat) flatten(); });

    //
    //

    export function getInfo(): BookInfo {
        return bookInfo;
    }

    export function highlight(): void {
        spineStrokeWidth = 5;
    }

    export function unhighlight(): void {
        spineStrokeWidth = 0;
    }

    export function isHidden(): boolean {
        return hidden;
    }

    export function hide(delay: number = 0): void {
        opacity.set(0, { delay: delay });
        hidden = true;
    }

    export function show(): void { 
        opacity.set(100);
        hidden = false;
    }

    export function flatten(): void {
        flat = true;
        width = bookInfo.depth;
    } 

    export function unflatten(): void {
        flat = false;
        width = bookInfo.width;
    }

    export function isFlat(): boolean {
        return flat;
    }

    //
    //on:mouseenter={highlight} on:mouseleave={unhighlight}

    export let writableSelected: (Writable<(SVGSVGElement | undefined)> | undefined) = undefined;
    export let writableOffset: (Writable<DOMPoint> | undefined) = undefined;

    function mousePosition(evt: MouseEvent): DOMPoint {
        let point = new DOMPoint(evt.clientX, evt.clientY);
        return point.matrixTransform(svg.getScreenCTM()!.inverse());
    }

    function mouseDown(evt: MouseEvent): void {
        svg.style.filter = "drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))";
        writableSelected?.set(svg);
        writableOffset?.set(mousePosition(evt));
    }

    function mouseUp(evt: MouseEvent): void {
        svg.style.filter = "";
        writableSelected?.set(undefined);
    }

    function mouseLeave(): void {
        svg.style.filter = "";
        //writableSelected?.set(undefined);
        unhighlight();
    }

    function mouseEnter(): void {
        highlight();
    }

    function onClick(): void {
        //flatten();
    }

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<svg bind:this={svg} on:click={onClick} on:mousedown={mouseDown} on:mouseup={mouseUp} on:mouseleave={mouseLeave} on:mouseenter={mouseEnter} {x} {y} {width} {height} opacity={`${$opacity}%`}>

    <!-- Spine -->
    <rect x={0} y={0} {width} {height} fill={bookInfo.color} stroke="white" stroke-width={spineStrokeWidth}/>

    <!-- Spine Shadow -->
    {#if flat}
        <rect x={width / 4 * 3} y={0} width={width / 4} {height} opacity=0.15/>
        <rect x={width / 4 * 2} y={0} width={width / 4} {height} opacity=0.10/>
        <rect x={width / 4} y={0} width={width / 4} {height} opacity=0.05/>
        <text x="50%" y="50%" text-anchor="middle" font-size="24">{bookInfo.title}</text>
    {:else}
        <rect x={width / 2} y={0} width={width / 2} {height} opacity=0.15/>
    {/if}

    <!-- Style -->
    {#if bookInfo.style === "A"}
        <rect x={0} y={height / 12} {width} height={3} fill="white" opacity=0.40/>
        <rect x={0} y={height / 12 + 5} {width} height={3} fill="white" opacity=0.40/>
        <rect x={0} y={(height / 12 * 11)} {width} height={3} fill="white" opacity=0.40/>
        <rect x={0} y={(height / 12 * 11) - 5} {width} height={3} fill="white" opacity=0.40/>
        {#if !flat}
            <rect width="100%" height="100%" transform-origin="50% 50%" transform="scale(.4)" rx="20" fill="white" opacity=0.40/>
        {/if}
    {:else if bookInfo.style === "B"}
        <rect x={0} y={height / 15} {width} height="12%" fill="white" opacity=0.15/>
        <rect x={0} y={height / 15 + (height * .12) + 5} {width} height={3} fill="white" opacity=0.15/>
    {:else if bookInfo.style === "C"}
        <rect x={0} y={height / 13} {width} height={3} fill="gold"/>
        <rect x={0} y={height / 13 + 3} {width} height="25%" fill="white" opacity=0.20/>
        <rect x={0} y={height / 13 + (height * 0.25)} {width} height={3} fill="gold"/>
    {:else if bookInfo.style === "D"}
        <rect x={0} y={height / 13} {width} height="8%" fill="gold" opacity=0.60/>
        <rect x={0} y={(height / 13 * 12) - (height * .08)} {width} height="10%" fill="gold" opacity=0.60/>
    {/if}

</svg>
