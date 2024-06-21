<script lang="ts">
    import Bookshelf from "$lib/components/Bookshelf.svelte";
    import CodeMirror from "svelte-codemirror-editor";

    import { javascript } from "@codemirror/lang-javascript";
    import { EditorView } from "@codemirror/view";

    let view:       EditorView;
    let bookshelf:  Bookshelf;
    let table:      Bookshelf;

    let tripsToBookshelf = 0;
    let editorContent = "function getBooksOffShelf(idx) {\n  return [ idx ];\n}";

    function bookshelfToTable(addr: number) {
        if (bookshelf.contains(addr)) {
            const bookInfo = bookshelf.remove(addr);
            table.add(bookInfo);
        }
    }

    function tableToBookshelf(addr: number) {
        if (table.contains(addr)) {
            const bookInfo = table.remove(addr);
            bookshelf.add(bookInfo);
        }
    }

    function getUserCallback(): any {
        // - https://stackoverflow.com/questions/60951075/not-able-access-function-after-eval
        // vvv EVIL!!!!! CHANGE ASAP!!!
        return eval(`${editorContent}; getBooksOffShelf;`);
    }

    function study() {
        const getBooksOffShelf = getUserCallback();
        const bookInfos = bookshelf.getBooksInfo();

        console.log("Book Info Len " + bookInfos.length);

        while(bookInfos.length !== 0) {
            let bookInfo = bookInfos[0];

            if (table.contains(bookInfo.addr)) {
                continue;
            }

            let bookAddrs = getBooksOffShelf(bookInfo.addr);

            bookAddrs.forEach((addr: number) => {
                bookshelfToTable(addr);
            });

            ++tripsToBookshelf;
        }
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
        bookCount={16}
    />

    <p>Table:</p>
    <Bookshelf 
        bind:this={table}  
        bookCount={0}
    />

    <p>
        Trips To Bookshelf:
        <b>{tripsToBookshelf}</b>
    </p>
    
    <button on:click={() => { study() }}>Study</button>
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