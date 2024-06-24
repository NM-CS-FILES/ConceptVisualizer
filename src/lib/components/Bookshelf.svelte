<script lang="ts">
    import { BookInfo } from "$lib/classes/BookInfo";
    import { onMount } from "svelte";
    import Book from "./Book.svelte";

    export let data: string;

    let booksInfo: BookInfo[] = [ ];
    let books: Book[] = [ ];

    onMount(() => {
        for (let i = 0; i != data.length; i++) {
            booksInfo[i] = new BookInfo(i.toString(), data.charAt(i));
        }
    });

    export function getBooks(): Book[] {
        return books;
    }

    // https://svelte.dev/tutorial/updating-arrays-and-objects
    export function refresh(): void {
        booksInfo = booksInfo.sort(BookInfo.compare);
        books = [ ];
    }

    export function get(idx: number): Book {
        return books[idx];
    }

    export function pop(title: string): void {
        // just a little redundant
        booksInfo = booksInfo.filter(bookInfo => bookInfo.title !== title);
        refresh();
    }

    export function push(bookInfo: BookInfo): void {
        booksInfo.push(bookInfo);
        refresh();
    }

    export function contains(title: string): boolean {
        return booksInfo.find((val) => val.title === title) !== undefined;
    }
</script>

<!---->

<div>
    {#each booksInfo as bookInfo, i}
        <Book bind:this={books[i]} {bookInfo}/>
    {/each}
</div>

<!---->

<!--    https://css-tricks.com/snippets/css/a-guide-to-flexbox/  -->
<style>
    div {
        display: flex;
        align-items: flex-end;
        column-gap: 3px;

        width: fit-content;
        height: fit-content;

        background-color: #342E30;

        border: #9e603e;
        border-style: solid;
        border-width: 8px;
        
        padding-top: 10px;
        padding-left: 2px;
        padding-right: 2px;
    }
</style>