<script>
import {socketStore} from "../store/websocket.js";
import Choose from "./Choose.svelte";
export let h;
export let w;

let board = [];
let You = ""
let From = null
let To = null
let choice = null
for(let i=0;i<h;i++){
    let row = []
    for(let j=0;j<w;j++){
        row.push({Value:0,Owner:""})
    }
    board.push(row)
}

$: if($socketStore){
    if($socketStore.Board)
        setBoard($socketStore.Board.Board)
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
        console.log("in !From")
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
    console.log("add")
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

function isHighlighted(i,j){
    if(From)
        if((From[0]==i)&&(From[1]==j))
            return true
    if(To)
        if((To[0]==i)&&(To[1]==j))
            return true
    return false
}

</script>

<style>
table td{
    text-align: center;
    border:2px solid black;
}
.self{
    color: black;
    background: #90cdf4;
}
.enemy{
    color: black;
    background:#feb2b2;
}
.noone{
    color: white;
    background: white;
}
.unknown{
    color:transparent;
    background:#e2e8f0;
}
.highlight{
    background:#f687b3;
}
</style>
<Choose resolve={choice}/>
<table class="font-alloy text-lg table-fixed border-black border-4 rounded-lg bg-white">
    {#each board as row, i}
    <tr>
        {#each row as cell, j}
        <td
        on:click={e=>{tdClick(i,j)}}
        class:highlight={((From)||(To))&&isHighlighted(i,j)}
        class:unknown={cell.Value==-1}
        class:noone={(cell.Owner=="")&&(cell.Value!=-1)}
        class:self={cell.Owner==You}
        class:enemy={(cell.Owner!=You)&&(cell.Owner!="")}
        class="px-6 py-4">
        {cell.Value}
        </td>
        {/each}
    </tr>
    {/each}
</table>