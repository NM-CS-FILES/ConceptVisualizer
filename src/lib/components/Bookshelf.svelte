<!--
 - https://css-tricks.com/snippets/css/a-guide-to-flexbox/
-->

<script lang="ts">
    import Book from "./Book.svelte";

</script>

<!---->

<div>
    <slot/>
</div>

<!---->

<style>
    div {
        display: flex;
        align-items: flex-end;
        column-gap: 5px;
    }
</style>