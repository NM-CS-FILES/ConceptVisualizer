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
    let editorContent = "function getBooksOffShelf(idx) {\n  return [ idx, idx + 1 ];\n}";

    function getUserCallback(): any {
        // - https://stackoverflow.com/questions/60951075/not-able-access-function-after-eval
        // vvv EVIL!!!!! CHANGE ASAP!!!
        return eval(`${editorContent}; getBooksOffShelf;`);
    }

    function reset() {
        tripsToBookshelf = 0;
        bookshelf.getBooks().forEach((book) => book.show());
    }

    function study() {
        const userCallback = getUserCallback();
        let timeout = 750;
        tripsToBookshelf = 0;

        bookshelf.getBooks().forEach((book, idx) => {
            if (book.isHidden()) {
                return;
            }

            let localIdxs: number[] = userCallback(idx);
            let timeoutOffset = 0;
            tripsToBookshelf++;

            localIdxs.forEach((localIdx) => {
                if (localIdx < 0 || localIdx >= bookshelf.getBooks().length) {
                    return;
                }

                let localBook = bookshelf.get(localIdx);

                if (localBook.isHidden()) {
                    return;
                }

                localBook.hide(timeout);
                timeoutOffset = 750;
            });

            timeout += timeoutOffset;
        });
    }
</script>

<!---->

<div class="leftPanel">
    <CodeMirror 
        bind:value={editorContent} 
        on:ready={(e) => { view = e.detail; }}
        lang={javascript()}
    />
</div>

<div class="rightPanel">
    <p>Bookshelf:</p>
    <Bookshelf 
        bind:this={bookshelf} 
        data={"Hello, World!!!!"}
    />

    <p>Table:</p>
    <Table 
        bind:this={table}  
    />

    <p>
        Trips To Bookshelf:
        <b>{tripsToBookshelf}</b>
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