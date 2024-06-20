<!--
 - https://css-tricks.com/snippets/css/a-guide-to-flexbox/
 - https://svelte.dev/tutorial/updating-arrays-and-objects
-->

<script lang="ts">
    import { BookInfo } from "$lib/classes/BookInfo";
    import { onMount } from "svelte";
    import Book from "./Book.svelte";

    export let bookCount: number;
    
    let booksInfo: BookInfo[] = [ ];
    let books: Book[] = [ ];

    onMount(() => {
        for (let i = 0; i != bookCount; i++) {
            booksInfo[i] = new BookInfo((i * 32).toString());
        }
    });

    export function at(idx: number): [ BookInfo, Book ] {
        return [ booksInfo[idx], books[idx] ];
    }

    export function remove(idx: number): BookInfo {
        let entry = at(idx);
        booksInfo.splice(idx, 1);
        books = books.splice(idx, 1);
        booksInfo = booksInfo;
        books = books;
        return entry[0];
    }

    export function add(bookInfo: BookInfo): void {
        booksInfo.push(bookInfo);
        booksInfo = booksInfo;
        books = books;
    }

    export function highlightAt(idx: number): void {
        books.at(idx)?.highlight();
    }

    export function unhighlightAt(idx: number): void {
        books.at(idx)?.unhighlight();
    }
</script>

<!---->

<div>
    {#each booksInfo as bookInfo, i}
        <Book bind:this={books[i]} {bookInfo}/>
    {/each}
</div>

<!---->

<style>
    div {
        display: flex;
        align-items: flex-end;
        column-gap: 5px;
    }
</style>