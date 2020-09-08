<script>
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

<div on:click class="p-2 text-center border-2 border-black rounded-full font-bold">
<slot></slot>
</div>