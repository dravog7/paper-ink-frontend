<script>
import { goto } from '@sapper/app';
import Table from "../components/Table.svelte";
import {socketStore} from "../store/websocket.js";

let ink = 0
let turn = "No"
let jsonS=0;
$: if($socketStore){
    if($socketStore.Command=="error"){
        alert(JSON.stringify($socketStore))
    }
    ink= $socketStore.Ink||ink
    turn = ($socketStore.You==$socketStore.Next)?"Yes":"No"
    jsonS = JSON.stringify($socketStore)
}
$:if($socketStore){
    if($socketStore.Winner){
        if($socketStore.Winner==$socketStore.You){
            show("You won!")
        }else{
            show("You lost!")
        }
        socketStore.clear()
        goto("/")
    }
}
async function show(arg){
    alert(arg)
}
</script>

<style>
</style>
<svelte:head>
	<title>Match</title>
</svelte:head>
<div class="hidden border-purple-300 border-white"></div>
<div class="w-full h-full bg-black flex">
    <div
    class="m-auto bg-black flex flex-col rounded-lg"
    >
    <div class="font-alloy bg-black text-white text-lg flex justify-between">
    <span>Ink:<span>{ink}</span></span>
    <span>Turn:<span>{turn}</span></span>
    </div>
    <div
     class:border-purple-300={turn=='Yes'}
     class:border-white={turn=='No'}
     class="border-4 rounded-lg  flex">
        <Table h=5 w=5/>
    </div>
    </div>
</div>