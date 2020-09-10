<script>
let units = [1,2,3,4,5]
export let resolve;
export let ink;
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
<div class="text-gray-300 hidden">to prevent tailwind class purge</div>
{#if resolve}
<div class="font-alloy text-2xl text-black flex justify-between absolute inset-0" style="background:rgba(0,0,0,0.5)">
<div class="m-auto bg-white flex dialog-container rounded-lg border-2 border-black">
{#each units as value}
    <div class:text-gray-300={value>ink} on:click={e=>{if(value<=ink)resolve(value)}}>{value}</div>
{/each}
<div on:click={e=>{resolve("X")}}>X</div>
</div>
</div>
{/if}