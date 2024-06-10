<script lang="ts">
    import { Cache } from "$lib/classes/processor/Cache"
    import { onMount } from "svelte";
    import Core from "./Core.svelte";

    export let coreCount: number;

    let cores: Core[];
    let l3cache: Cache;

</script>

<div>
    <div class="cores">
        {#each {length: coreCount} as _, i }
            <Core></Core>
        {/each}
    </div>

    <div class="cache">
        
    </div>
</div>

<style>
    .cores {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        width: max-content;
        background-color: gray;
        gap: 10px;
        padding: 10px;
    }
</style>