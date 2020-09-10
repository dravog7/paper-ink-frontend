<script>
</script>

<style lang="text/postcss">
.title{
    mix-blend-mode: difference;
    color: #fff;
}
.logo{
    @apply transition-all duration-500 ease-in-out;
    background: linear-gradient(90deg,#000 0% 60%,#fff 60% 100%);
    background-size:200% 100%;
    background-position: 60% 0;
}
.logo:hover{
    background-position: 139% 0;
}
</style>

<div class="font-alloy logo p-2 rounded-full">
<h1 class="title m-0 text-3xl">Paper&Ink</h1>
</div>