<script>
import { onMount,onDestroy } from 'svelte';
import Slide from './slide.svelte';
export let Data;
let selected = 0;
let buffer = Data;
let interval=null;
let transed = false;

buffer[selected].active = true;

function add(){
    if((selected+1)>=buffer.length)
        return
    buffer[selected].active = false;
    selected = (selected + 1);
    buffer[selected].active = true;
    transed = true;
}

function sub(){
    if((selected-1)<0)
        return
    buffer[selected].active = false;
    selected = selected - 1;
    buffer[selected].active = true;
    transed = true;
}

// function automatic(){
//     if(!transed)
//         add();
//     transed = false;
// }

// onMount(function(){
//     interval = setInterval(automatic,5000);
// })
// onDestroy(function(){
//     clearInterval(interval);
// })
</script>
<style lang="text/postcss">
.left:focus,.right:focus{
    @apply outline-none;
}
.left, .right{
    color: inherit;
    @apply rounded-full text-3xl font-black z-10;
}
</style>
<div class="opacity-0 hidden">to avoid tailwind class purge</div>
<div class="m-auto w-full h-full overflow-hidden relative">
    <div class='absolute inset-0 flex items-center justify-between font-alloy lg:px-16'>
        <button aria-label="previous" class:opacity-0={selected<=0} class="left" on:click={sub}>&lt;</button>
        <button aria-label="next" class:opacity-0={selected>=(buffer.length-1)} class="right" on:click={add}>&gt;</button>
    </div>
    {#each buffer as slide}
        <svelte:component this={slide.component} data={slide} on:next={add}/>
    {/each}
</div>