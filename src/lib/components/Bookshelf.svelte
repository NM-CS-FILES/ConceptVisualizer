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

    onMount(() => {
        for (let i = 0; i != bookCount; i++) {
            booksInfo[i] = new BookInfo(i, Math.floor(Math.random() * 256));
        }
    });

    export function getBooksInfo(): BookInfo[] {
        return booksInfo;
    }

    export function get(addr: number): [BookInfo, number] {
        let idx = -1;
        let bookInfo = booksInfo.find((val, valIdx) => { 
            idx = valIdx;
            return val.addr === addr; 
        })!;
        return [bookInfo, idx];
    }

    export function remove(addr: number): BookInfo {
        let entry = get(addr);
        booksInfo.splice(entry[1], 1);
        booksInfo = booksInfo.sort(BookInfo.compare);
        return entry[0];
    }

    export function add(bookInfo: BookInfo): void {
        booksInfo.push(bookInfo);
        booksInfo = booksInfo.sort(BookInfo.compare);
    }

    export function contains(value: number): boolean {
        return booksInfo.find((val) => { return val.addr === value; }) !== undefined;
    }
</script>

<!---->

<div>
    {#each booksInfo as bookInfo, i}
        <Book {bookInfo}/>
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