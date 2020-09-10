<script>
import { goto } from '@sapper/app';
import Logo from "../components/Logo.svelte";
import Dialog from "../components/Dialog.svelte";
import Button from "../components/Button.svelte";
import {socketStore} from "../store/websocket.js";

let flip = true

function findMatch(){
	if($socketStore){
		if(!$socketStore.searching){
			socketStore.findMatch()
		}
	}
}

function HowTo(){
	goto("/howto")
}

let msg = 0;
$: if($socketStore){
	if($socketStore.searching){
		msg = "searching..."
	}else{
		msg = "find Match"
	}
}else{
	msg="Connecting..."
}

$: if($socketStore){
	if($socketStore.inMatch){
		goto('/game');
	}
}

</script>

<style>
.main-body{
	@apply transition duration-500 ease-in-out;
}
</style>

<svelte:head>
	<title>Paper&Ink</title>
</svelte:head>

<div class="main-body w-full h-full flex" class:bg-white={!flip} class:bg-black={flip}>
	<Dialog>
		<div class="m-auto flex flex-col justify-between p-8">
			<div on:click={e=>{flip=!flip}} class="flex justify-center mx-auto">
				<Logo/>
			</div>
			<div class="mt-24">
				<Button on:click={findMatch}>
					<span class="font-alloy text-2xl">{msg}</span>
				</Button>
			</div>
			<div class="mt-2">
			<Button on:click={HowTo}>
				<span class="font-alloy text-2xl">How To Play</span>
			</Button>
			</div>
		</div>
	</Dialog>
</div>

