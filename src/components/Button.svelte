<script>
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher()

function click(e){
    dispatch("click",e)
}
</script>
<style lang="text/postcss">
div {
    @apply text-black;
    background: white;
    transition: all ease-in-out 0.5s;
    cursor: pointer!important;
}
div:hover{
    color: white;
    background: black;
    
}
</style>

<div on:click={click} class="p-2 text-center border-2 border-black rounded-full font-bold">
<slot></slot>
</div>