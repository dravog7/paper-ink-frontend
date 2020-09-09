<script>
import { goto } from '@sapper/app';
import Table from "../components/Table.svelte";
import Choose from "../components/Choose.svelte";
import {socketStore} from "../store/websocket.js";

let ink = 0
let turn = "No"
let jsonS=0;
let board = [];
let You = ""
let From = null
let To = null
let choice = null
let h=0,w=0;

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
$: console.log(JSON.stringify($socketStore))
$: if($socketStore){
    if($socketStore.Board&&$socketStore.Board.Board){
        h = $socketStore.Board.Board.length;
        if(h>0)
            w = $socketStore.Board.Board[0].length;
        makeBoard(h,w)
        setBoard($socketStore.Board.Board)
        
    }
        
    You = $socketStore.You
}

function setBoard(boardData){
    From = null
    To = null
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
async function tdClick(i,j){
    let cell = board[i][j]
    if($socketStore.Next!=$socketStore.You)
        return
    if(cell.Value==-1)
        return
    if(!From){
        if(cell.Owner!=You)
            return
        if(cell.Value==0){
            From=[i,j]
            let val = await getChoice()
            if(val=="X"){
                From = null
                return
            }
            board[i][j].Value = Number(val)
            addMove()
            return
        }
        From = [i,j]
        return
    }else{
        if((cell.Owner==You)&&(cell.Value>0))
        return
        To=[i,j]
        addMove()
    }
}
async function getChoice(){
    let val = await new Promise(resolve=>{
        choice = resolve;
    })
    choice = null;
    return val;
}

function addMove(){
    let moves;
    if(From&&To){
        let number = Number(board[From[0]][From[1]].Value)
        moves = [
            {From:From,To:To,Number:number}
        ]
    }else if(From){
        let number = Number(board[From[0]][From[1]].Value)
        moves = [
            {From:[-1,-1],To:From,Number:number}
        ]
    }else{
        return
    }
    socketStore.makeMove(moves)
    From = null
    To = null
    return
}
</script>

<style>
</style>
<svelte:head>
	<title>Match</title>
</svelte:head>
<Choose resolve={choice}/>
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
        <Table board={board} From={From} To={To} You={You} tdClick={tdClick}/>
    </div>
    </div>
</div>