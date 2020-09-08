<script>
let units = [1,2,3,4,5]
export let resolve;
</script>

<style>
.dialog-container div{
    padding:1rem;
    background: white;
}
.dialog-container div:hover{
    padding:1rem;
    background:#d6bcfa;;
}
</style>
{#if resolve}
<div class="font-alloy text-2xl text-black flex justify-between absolute inset-0" style="background:rgba(0,0,0,0.5)">
<div class="m-auto bg-white flex dialog-container rounded-lg border-2 border-black">
{#each units as value}
    <div on:click={e=>{resolve(value)}}>{value}</div>
{/each}
<div on:click={e=>{resolve("X")}}>X</div>
</div>
</div>
{/if}