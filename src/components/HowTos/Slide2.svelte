<script>
import { createEventDispatcher } from 'svelte';
import Slide from "../slider/slide.svelte";
import Table from "../Table.svelte";
import logic from "../gameLogic.js";
import lodash from "lodash";
export let data;

const dispatch = createEventDispatcher()
let ink = 5
async function timeout(ms){
    await new Promise(resolve=>{
        setTimeout(()=>{
            console.log("timed out")
            resolve()
        },ms)
    })
}

let resetBoard = [
    [{Value:5,Owner:"a"},{Value:0,Owner:""},{Value:0,Owner:""},{Value:0,Owner:""},{Value:0,Owner:""}],
    [{Value:0,Owner:""},{Value:4,Owner:"b"},{Value:0,Owner:""},{Value:0,Owner:""},{Value:0,Owner:""}],
    [{Value:0,Owner:""},{Value:0,Owner:""},{Value:0,Owner:""},{Value:0,Owner:""},{Value:0,Owner:""}],
    [{Value:0,Owner:""},{Value:2,Owner:"b"},{Value:0,Owner:""},{Value:0,Owner:""},{Value:0,Owner:""}],
    [{Value:3,Owner:"a"},{Value:0,Owner:""},{Value:0,Owner:""},{Value:0,Owner:""},{Value:0,Owner:""}]
];
let board = lodash.cloneDeep(resetBoard)

function addMove(From,To){
    ink -=logic.addMove(board,From,To)
    board = board
    checkFinish()

}

function checkFinish(){
    for(let i of board){
        for(let j of i){
            if(j.Owner=="b")
                return false
        }
    }
    finish()
}

async function finish(){
    await timeout(1000)
    if(data.active){
        dispatch("next")
    }
    reset()
}
$:reset(data.active)
function reset(){
    ink = 5
    board = lodash.cloneDeep(resetBoard);
}
</script>

<style>
</style>

<Slide active={data.active}>
    <div slot="left" class="w-full h-full flex">
        <div class="m-auto w-6/12">
            <Table board={board} You="a" Next="a" ink={ink} addMove={addMove} />
        </div>
        
    </div>
    <div slot="right" class="w-full h-full flex flex-col text-black mt-4">
        <h1 class="text-center font-alloy text-2xl">Fight!</h1>
        <p>
            In Paper&Ink combat is simple. The greater value wins and is decreased by the smaller.
        </p>
        <p class="mt-1">Move your units by clicking on a blue square with value and
        clicking on an enemy square to attack.</p>
        <p>Win the tutorial by erasing all red squares by attacking and defeating all enemy units.</p>
    </div>
</Slide>