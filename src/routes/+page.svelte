<script lang="ts">
    import Bookshelf from "$lib/components/Bookshelf.svelte";
    import { BookInfo } from "$lib/classes/BookInfo";
    import CodeMirror from "svelte-codemirror-editor";
    import { javascript } from "@codemirror/lang-javascript";

    let editor:     CodeMirror;
    let bookshelf:  Bookshelf;
    let table:      Bookshelf;

    const editorInitContent = "function getBookOffShelf(idx, table) {\n  // User code goes here\n}";

    function bookshelfToTable(idx: number) {
        let bookInfo = bookshelf.remove(idx);
        table.add(bookInfo);
    }

    function tableToBookshelf(idx: number) {
        let bookInfo = table.remove(idx);
        bookshelf.add(bookInfo);
    }

</script>

<!---->

<div class="leftPanel">
    <CodeMirror bind:this={editor} lang={javascript()} value={editorInitContent}/>
</div>

<div class="rightPanel">
    <p>Bookshelf:</p>
    <Bookshelf bind:this={bookshelf} bookCount={16}/>

    <p>Table:</p>
    <Bookshelf bind:this={table} bookCount={0}/>

    <button on:click={() => { bookshelfToTable(0) }}>Study</button>
</div>

<!---->

<style>
    .leftPanel {
        width: 30%;
        float: left;
    }

    .rightPanel {
        width: 70%;
        float: right;
    }
</style>