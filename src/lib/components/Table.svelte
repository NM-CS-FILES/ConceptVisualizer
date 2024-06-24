<script lang="ts">
    import { BookInfo } from "$lib/classes/BookInfo";
    import { onMount } from "svelte";
    import { writable, type Writable } from "svelte/store";
    import Book from "./Book.svelte";

    let booksInfo: BookInfo[] = [ ];
    let books: Book[] = [ ];
    let svg: SVGSVGElement;

    //
    //

    onMount(() => {
        booksInfo.push(new BookInfo("abcd", "b"));
        booksInfo = booksInfo;
    });

    //
    //

    export function contains(title: string): boolean {
        return booksInfo.find((info) => info.title === title) !== undefined;
    }

    //
    //

    let dragSelected = writable<(SVGSVGElement | undefined)>(undefined);
    let dragOffset = writable<DOMPoint>(undefined);

    function mousePosition(evt: MouseEvent): DOMPoint {
        let point = new DOMPoint(evt.clientX, evt.clientY);
        return point.matrixTransform(svg.getScreenCTM()!.inverse());
    }

    function drag(evt: MouseEvent): void {
        if ($dragSelected !== undefined) {
            const position = mousePosition(evt);
            dragSelected.update((bookSvg) => {
                bookSvg?.setAttributeNS(null, "x", (position.x - $dragOffset.x).toString());
                bookSvg?.setAttributeNS(null, "y", (position.y - $dragOffset.y).toString());
                return bookSvg;
            });
        }
    }

</script>

<!---->

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svg bind:this={svg} width="700px" height="250px" on:mousemove={drag}>
    {#each booksInfo as bookInfo}
        <Book {bookInfo} flat={true} writableSelected={dragSelected} writableOffset={dragOffset}/>
    {/each}
</svg>

<!---->

<style>
    svg {
        background-color: #9e603e;
    }
</style>
