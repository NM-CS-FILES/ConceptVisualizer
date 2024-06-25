<script lang="ts">
    import { BookInfo } from "$lib/classes/BookInfo";
    import { onMount } from "svelte";
    import { writable, type Writable } from "svelte/store";
    import Book from "./Book.svelte";
    import { tweened } from "svelte/motion";

    let booksInfo: BookInfo[] = [ ];
    let books: Book[] = [ ];
    let svg: SVGSVGElement;

    //
    //

    onMount(() => { 
    });

    //
    //

    export function push(bookInfo: BookInfo): void {
        booksInfo.push(bookInfo);
        booksInfo = booksInfo;
    }

    export function contains(title: string): boolean {
        return booksInfo.find((info) => info.title === title) !== undefined;
    }

    export function centerBook(book: Book): void {
        let centerX = (svg.width.baseVal.value / 2) - (book.getWidth() / 2);
        let centerY = (svg.height.baseVal.value / 2) - (book.getHeight() / 2);
        book.move(centerX, centerY);
    }

    async function studyBook(book: Book, timeoutOffset = 0): Promise<void> {
        centerBook(book);

        await new Promise((resolve) => setTimeout(resolve, 1000));
        book.setBookState("open");
        centerBook(book);

        await new Promise((resolve) => setTimeout(resolve, 1000));
        book.setBookState("closed");
        book.move(300, 300);
    }

    export async function study(): Promise<void> {
        let timeout = 0;

        for (let i = 0; i !== books.length; i++) {
            console.log(`ii = ${i} => ${books.length}`)
            await studyBook(books[i]);
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
        clear();
    }

    export function clear(): void {
        booksInfo = [ ];
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

    function mouseLeave(evt: MouseEvent): void {
        dragSelected.set(undefined);
    }
    
    function onClick(evt: MouseEvent): void {
        study();
    }

</script>

<!---->

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<svg bind:this={svg} on:click={onClick} width="700px" height="250px" on:mousemove={drag} on:mouseleave={mouseLeave}>
    {#each booksInfo as bookInfo, idx}
        <Book bind:this={books[idx]} {bookInfo} state={"closed"} writableSelected={dragSelected} writableOffset={dragOffset}/>
    {/each}
</svg>

<!---->

<style>
    svg {
        background-color: #9e603e;
    }
</style>
