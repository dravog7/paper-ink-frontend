<script>
	export let segment;

	function changeVH(){
		return
		let vh = window.innerHeight/100;
		document.documentElement.style.setProperty("--vh",vh);
	}

</script>

<style>
main{
	height:100vh;
	height:calc(var(--vh,1vh)*100);
}
</style>
<svelte:window on:resize={changeVH}></svelte:window>
<main class="w-screen flex">
	<slot></slot>
</main>