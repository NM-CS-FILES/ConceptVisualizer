<!--
 - https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg
-->

<script lang="ts">
    import { BookInfo, type BookState } from "$lib/classes/BookInfo";
    import { onMount } from "svelte";
    import { cubicOut } from "svelte/easing";
    import { tweened } from "svelte/motion";
    import { type Writable } from "svelte/store";

    //
    //

    export let bookInfo: BookInfo;
    export let state: BookState = "upright";
    export let x = tweened(0, { easing:cubicOut });
    export let y = tweened(0, { easing:cubicOut });

    let svg: SVGSVGElement;
    let spineStrokeWidth = 0;

    let width = bookInfo.width;
    let height = bookInfo.height;
    let opacity = tweened<number>(100, { easing: cubicOut });
    let hidden = false;

    //
    //

    onMount(() => { 
        setBookState(state);
    });

    //
    //

    export function getInfo(): BookInfo {
        return bookInfo;
    }

    export function getWidth(): number {
        return width;
    }

    export function getHeight(): number {
        return height;
    }

    export function move(toX: number, toY: number): void {
        x.set(toX);
        y.set(toY);
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
        hidden = true;
        opacity.set(0, { delay: delay });
    }

    export function show(): void { 
        hidden = false;
        opacity.set(100);
    }

    export function getBookState(): BookState {
        return state;
    }

    export function setBookState(bookState: BookState): void {
        switch(bookState) {
            case "upright": width = bookInfo.width;     break;
            case "closed":  width = bookInfo.depth;     break;
            case "open":    width = bookInfo.depth * 2; break;
        }
        state = bookState;
    }

    export function cycleBookState(): void {
        switch(state) {
            case "upright": setBookState("closed");  break;
            case "closed":  setBookState("open");    break;
            case "open":    setBookState("upright"); break;
        }
    }

    //
    //

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
        unhighlight();
    }

    function mouseEnter(): void {
        highlight();
    }

    function onClick(): void {
        if (!isHidden()) {
            cycleBookState();
        }
    }

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<svg bind:this={svg} on:click={onClick} on:mousedown={mouseDown} on:mouseup={mouseUp} on:mouseleave={mouseLeave} on:mouseenter={mouseEnter} x={$x} y={$y} {width} {height} opacity={`${$opacity}%`}>

    <rect x={0} y={0} {width} {height} fill={bookInfo.color} stroke="white" stroke-width={spineStrokeWidth}/>

    <!-- Style -->
    {#if bookInfo.style === "a"}
        <rect x={0} y={height / 12} {width} height={3} fill="white" opacity=0.40/>
        <rect x={0} y={height / 12 + 5} {width} height={3} fill="white" opacity=0.40/>
        <rect x={0} y={(height / 12 * 11)} {width} height={3} fill="white" opacity=0.40/>
        <rect x={0} y={(height / 12 * 11) - 5} {width} height={3} fill="white" opacity=0.40/>
        {#if state === "upright"}
            <rect width="100%" height="100%" transform-origin="50% 50%" transform="scale(.4)" rx="20" fill="white" opacity=0.40/>
        {/if}
    {:else if bookInfo.style === "b"}
        <rect x={0} y={height / 15} {width} height="12%" fill="white" opacity=0.15/>
        <rect x={0} y={height / 15 + (height * .12) + 5} {width} height={3} fill="white" opacity=0.15/>
    {:else if bookInfo.style === "c"}
        <rect x={0} y={height / 13} {width} height={3} fill="gold"/>
        <rect x={0} y={height / 13 + 3} {width} height="25%" fill="white" opacity=0.20/>
        <rect x={0} y={height / 13 + (height * 0.25)} {width} height={3} fill="gold"/>
    {:else if bookInfo.style === "d"}
        <rect x={0} y={height / 13} {width} height="8%" fill="gold" opacity=0.60/>
        <rect x={0} y={(height / 13 * 12) - (height * .08)} {width} height="10%" fill="gold" opacity=0.60/>
    {/if}

    <!-- Pages -->
    {#if state === "open"}
        <rect class="pages" width="100%" height="100%" transform-origin="50% 50%" transform="scale(.9)" fill="#f5edd6"/>
    {/if}

    <!-- Shadow -->
    {#if state !== "closed"}
        <rect x={width / 2} y={0} width={width / 2} {height} opacity=0.15/>
    {:else}
        <rect x={width / 4 * 3} y={0} width={width / 4} {height} opacity=0.15/>
        <rect x={width / 4 * 2} y={0} width={width / 4} {height} opacity=0.10/>
        <rect x={width / 4} y={0} width={width / 4} {height} opacity=0.05/>
    {/if}

    <!-- Text -->
    {#if state === "closed"}
        <text x="50%" y="50%" text-anchor="middle" font-size="24">{bookInfo.title}</text>
    {:else if state === "open"}
        <text x="50%" y="50%" text-anchor="middle" font-size="24">{bookInfo.contents}</text>
    {/if}
</svg>

<style>
    .pages {
        filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
    }
</style>
