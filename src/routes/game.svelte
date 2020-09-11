<script>
import { goto } from '@sapper/app';
import Table from "../components/Table.svelte";
import {socketStore} from "../store/websocket.js";
import logic from "../components/gameLogic.js";
let ink = 0
let You = ""
let Next = ""
let turn = false
let board = [
    [{Value:0,Owner:""},{Value:0,Owner:""},{Value:0,Owner:""},{Value:0,Owner:""},{Value:0,Owner:""}],
    [{Value:0,Owner:""},{Value:0,Owner:""},{Value:0,Owner:""},{Value:0,Owner:""},{Value:0,Owner:""}],
    [{Value:0,Owner:""},{Value:0,Owner:""},{Value:0,Owner:""},{Value:0,Owner:""},{Value:0,Owner:""}],
    [{Value:0,Owner:""},{Value:0,Owner:""},{Value:0,Owner:""},{Value:0,Owner:""},{Value:0,Owner:""}],
    [{Value:0,Owner:""},{Value:0,Owner:""},{Value:0,Owner:""},{Value:0,Owner:""},{Value:0,Owner:""}]
];
let h=5,w=5;
let moves = []

async function timeout(ms){
    await new Promise(resolve=>{
        setTimeout(()=>{
            console.log("timed out")
            resolve()
        },ms)
    })
}

$:if($socketStore){
    ink = $socketStore.Ink||0
    turn = $socketStore.You==$socketStore.Next
    You = $socketStore.You
    Next = $socketStore.Next
}

$: if($socketStore){
    if($socketStore.Command=="error"){
        alert(JSON.stringify($socketStore))
    }
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

$: if($socketStore){
    if($socketStore.Board&&$socketStore.Board.Board){
        console.log("socket change")
        h = $socketStore.Board.Board.length;
        if(h>0)
            w = $socketStore.Board.Board[0].length;
        makeBoard(h,w)
        setBoard($socketStore.Board.Board)
        
    }
}
async function show(arg){
    alert(arg)
}
function setBoard(boardData){
    if(!boardData)
        return
    for(let i=0;i<h;i++){
        for(let j=0;j<w;j++){
            board[i][j] = boardData[i][j]
        }
    }
}
function makeBoard(h,w){
    if((board.length==h)&&(board[0].length==w))
        return
    board = []
    for(let i=0;i<h;i++){
        let row = []
        for(let j=0;j<w;j++){
            row.push({Value:0,Owner:""})
        }
        board.push(row)
    }
}

function addMove(From,To,number){
    let move = {
        From:From,
        To:To,
        Number:number||board[From[0]][From[1]].Value,
        FromVal:{Used:false,...board[From[0]][From[1]]},
        ToVal:(To)?{Used:false,...board[To[0]][To[1]]}:null,
    }
    let tmp = logic.addMove(board,From,To,number)
    $socketStore.Ink -= tmp
    board = board
    moves.push(move)
    return
}

function submitMove(){
    if(moves.length>0){
        socketStore.makeMove(moves)
        moves = []
    }

}
function Undo(){
    if(moves.length>0){
        let move = moves.pop()
        let tmp = logic.undo(board,move)
        $socketStore.Ink += tmp
        board = board
    }

}

function goHome(){
    socketStore.cancelMatch()
    goto('/')
}
</script>

<style>
</style>
<svelte:head>
	<title>Match</title>
</svelte:head>
<!-- <div 
    on:click={goHome} 
    class="absolute cursor-pointer top-0 left-0 rounded-full p-2 text-white font-black font-alloy text-2xl z-40">
    &lt; Home
</div> -->
<div class="hidden border-purple-300 border-white"></div>
<div class="w-full h-full bg-black flex">
    <div
    class="m-auto bg-black flex flex-col rounded-lg lg:w-4/12 sm:w-6/12 w-8/12"
    >
        <Table board={board} You={You} Next={Next} ink={ink} addMove={addMove}/>
        <div class="w-full flex justify-between font-alloy text-xl text-white p-4">
        <div on:click={submitMove} class="cursor-pointer">Submit</div>
        <div on:click={Undo} class="cursor-pointer">Undo</div>
        </div>
    </div>
</div>