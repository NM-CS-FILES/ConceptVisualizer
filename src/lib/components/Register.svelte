<script lang="ts">

    export let label: string;
    export let value: number;
    export let size: number = 16;

</script>

<div>
    <div class="register-label">
        <p>{label}: </p>
    </div>
    <div class="register-value">
        <p>{value.toString(2).padStart(size, '0')}</p>
    </div>
</div>

<style>

    div {
        display: flex;
        font-family: monospace;
    }

</style>