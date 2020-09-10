<script>
import { createEventDispatcher } from 'svelte';
import Slide from "../slider/slide.svelte";
import Table from "../Table.svelte";
import logic from "../gameLogic.js";
import lodash from "lodash";
export let data;

async function timeout(ms){
    await new Promise(resolve=>{
        setTimeout(()=>{
            console.log("timed out")
            resolve()
        },ms)
    })
}

let resetBoard = [
    [{Value:0,Owner:"a"},{Value:0,Owner:""},{Value:0,Owner:""},{Value:0,Owner:""},{Value:0,Owner:""}],
    [{Value:0,Owner:""},{Value:0,Owner:""},{Value:0,Owner:""},{Value:0,Owner:""},{Value:0,Owner:""}],
    [{Value:0,Owner:""},{Value:0,Owner:""},{Value:0,Owner:""},{Value:0,Owner:""},{Value:0,Owner:""}],
    [{Value:0,Owner:""},{Value:0,Owner:""},{Value:0,Owner:""},{Value:0,Owner:""},{Value:0,Owner:""}],
    [{Value:0,Owner:""},{Value:0,Owner:""},{Value:0,Owner:""},{Value:0,Owner:""},{Value:0,Owner:""}]
];
let board = lodash.cloneDeep(resetBoard)
let ink = 5;

const dispatch = createEventDispatcher()
function addMove(From,To){
    let inkChange = logic.addMove(board,From,To)
    board = board
    if(inkChange>0){
        ink -= inkChange
        finish()
    }
            
}

async function finish(){
    await timeout(2000)
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
        <div class="m-auto w-8/12">
            <Table board={board} You="a" Next="a" ink={ink} addMove={addMove} />
        </div>
        
    </div>
    <div slot="right" class="w-full h-full flex flex-col text-black mt-4">
        <h1 class="text-center font-alloy text-2xl">Introduction</h1>
        <p>
            Paper&Ink is a turn based 2 player game normally played on 5x5 table.
        </p>
        <p>The objective of the game is to capture all enemy squares on the board.</p>
        <p class="mt-1">
            Lets start by deploying soldiers. There are 5 soldiers in the game.
        </p>
        <h1 class="text-center font-alloy text-xl">1 2 3 4 5</h1>
        <p>
            Click on the blue square on the table and select a soldier to deploy it to that square.
            Deploying soldiers consumes ink.
        </p>
    </div>
</Slide>