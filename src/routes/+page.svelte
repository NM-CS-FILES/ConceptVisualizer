<script lang="ts">
    import Bookshelf from "$lib/components/Bookshelf.svelte";
    import Table from "$lib/components/Table.svelte";
    import CodeMirror from "svelte-codemirror-editor";

    import { javascript } from "@codemirror/lang-javascript";
    import { EditorView } from "@codemirror/view";
    import { BookInfo } from "$lib/classes/BookInfo";

    let view:       EditorView;
    let bookshelf:  Bookshelf;
    let table:      Table;

    let tripsToBookshelf = 0;
    let editorContent = "function getBooksOffShelf(idx) {\n  return [ idx ];\n}";

    function getUserCallback(): any {
        // - https://stackoverflow.com/questions/60951075/not-able-access-function-after-eval
        // vvv EVIL!!!!! CHANGE ASAP!!!
        return eval(`${editorContent}; getBooksOffShelf;`);
    }

    function reset() {
        tripsToBookshelf = 0;
        bookshelf.getBooks().forEach((book) => book.show());
        table.clear();
    }

    async function study(): Promise<void> {
        for (let i = 0; i !== bookshelf.getBooks().length; i++) {
            console.log(i)
            let book = bookshelf.getBooks()[i];
            book.hide();
            table.push(book.getInfo());

            await new Promise((resolve) => setTimeout(resolve, 500));
            await table.study();
        }
    }
</script>

<!---->

<div class="leftPanel">
    <CodeMirror bind:value={editorContent}  on:ready={(e) => { view = e.detail; }} lang={javascript()}/>
</div>

<div class="rightPanel">
    <p>Bookshelf:</p>
    <Bookshelf bind:this={bookshelf} data={"Hello, World!!!!"}/>

    <p>Table:</p>
    <Table bind:this={table}/>

    <p>
        Trips To Bookshelf: <b>{tripsToBookshelf}</b>
    </p>
    
    <button on:click={() => study()}>Study</button>
    <button on:click={() => reset()}>Reset</button>
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