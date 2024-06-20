<script lang="ts">
    import Bookshelf from "$lib/components/Bookshelf.svelte";
    import Book from "$lib/components/Book.svelte";

    import CodeMirror from "svelte-codemirror-editor";
    import { javascript } from "@codemirror/lang-javascript";
    import { onMount } from "svelte";

    let editor: CodeMirror;
    let bookshelf: Bookshelf;

    const editorInitContent = 
`function getBookOffShelf(idx, table) {
    // User code goes here
}`;
</script>

<!---->

<div class="leftPanel">
    <CodeMirror bind:this={editor} lang={javascript()} value={editorInitContent}/>
</div>

<div class="rightPanel">
    <Bookshelf bind:this={bookshelf}>
        {#each {length: 16} as _, i}
            <Book title={i.toString()}/>            
        {/each}
    </Bookshelf>
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