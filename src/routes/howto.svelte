<script>
import { getContext ,onMount } from "svelte";
import { goto } from '@sapper/app';
import Slider from "../components/slider/slider.svelte";
import Slide1 from "../components/HowTos/Slide1.svelte";
import Slide2 from "../components/HowTos/Slide2.svelte";
import Slide3 from "../components/HowTos/Slide3.svelte";
import Slide4 from "../components/HowTos/Slide4.svelte";
let data = [
    {component:Slide1},
    {component:Slide2},
    {component:Slide3},
    {component:Slide4},
]

function gotoMod(url){
	goto(url)
}

function goHome(){
    gotoMod("/")
}
</script>

<style lang="text/postcss">
</style>

<div class="w-screen h-screen flex flex-col bg-white">
    <div 
        on:click={goHome} 
        class="absolute cursor-pointer top-0 left-0 rounded-full p-2 text-black font-black font-alloy text-2xl z-40">
        &lt; Home
    </div>
    <Slider Data={data} />
</div>