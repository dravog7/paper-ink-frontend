<script>
import Table from "../components/Table.svelte";
import {socketStore} from "../store/websocket.js";

let ink = 0
let turn = "no"
let jsonS=0;
$: if($socketStore){
    if($socketStore.Command=="error"){
        alert(JSON.stringify($socketStore))
    }
    ink= $socketStore.Ink||ink
    turn = ($socketStore.You==$socketStore.Next)?"Yes":"no"
    jsonS = JSON.stringify($socketStore)
}
</script>

<style>
</style>

<div class="w-full h-full bg-black flex">
    <div
    class="m-auto bg-black flex flex-col rounded-lg"
    >
    <div class="font-alloy bg-black text-white text-lg flex justify-between">
    <span>Ink:<span>{ink}</span></span>
    <span>Turn:<span>{turn}</span></span>
    </div>
    <div class="border-4 rounded-lg border-purple-300 flex"> <!--Change border color when its your turn-->
        <Table h=5 w=5/>
    </div>
    </div>
</div>