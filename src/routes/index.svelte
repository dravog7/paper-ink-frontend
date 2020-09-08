<script>
import { goto } from '@sapper/app';
import Logo from "../components/Logo.svelte";
import Dialog from "../components/Dialog.svelte";
import Button from "../components/Button.svelte";
import {socketStore} from "../store/websocket.js";

function findMatch(){
	if($socketStore){
		if(!$socketStore.searching){
			socketStore.findMatch()
		}
	}
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

</style>

<svelte:head>
	<title>Paper&Ink</title>
</svelte:head>

<div class="w-full h-full flex bg-white">
	<Dialog>
		<div class="m-auto flex flex-col justify-center content-between p-8">
				<Logo/>
			<div class="mt-24">
			<Button on:click={findMatch}>
			<span class="font-alloy text-2xl">{msg}</span>
			</Button>
			</div>
		</div>
	</Dialog>
</div>

