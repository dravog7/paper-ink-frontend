<script>
import Choose from "../components/Choose.svelte";

export let board;
let From=null;
let To=null;
export let Next;
export let You;
export let addMove;
export let ink;
let choice = null;
let turn = false;

$: turn = You==Next;

function isHighlighted(i,j){
    if(From)
        if((From[0]==i)&&(From[1]==j))
            return true
    if(To)
        if((To[0]==i)&&(To[1]==j))
            return true
    return false
}

async function tdClick(i,j){
    let cell = board[i][j]
    if(cell.Used)
        return
    if(Next!=You)
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
            addMove(From,To)
            From = null
            To = null
            return
        }
        From = [i,j]
        return
    }else{
        if((cell.Owner==You)&&(cell.Value>0))
        return
        let dh = Math.abs(From[0]-i)
        let dw = Math.abs(From[1]-j)
        if((dh>1)||(dw>1))
        return
        To=[i,j]
        addMove(From,To)
        From = null
        To = null
    }
}
async function getChoice(){
    let val = await new Promise(resolve=>{
        choice = resolve;
    })
    choice = null;
    return val;
}

</script>

<style>
td {
  width: 33.33%;
  position: relative;
}
td:after {
  content: '';
  display: block;
  margin-top: 100%;
}
td span {
    @apply absolute inset-0 flex justify-center flex-col cursor-default;
}
table td{
    text-align: center;
    border:2px solid black;
}
.self{
    @apply bg-blue-300 cursor-pointer;
    color: black;
}
.enemy{
    @apply bg-red-300;
    color: black;
}
.noone{
    @apply bg-white;
    color: transparent;
}
.unknown{
    color:transparent;
    @apply bg-gray-300;
}
.highlight{
    @apply bg-pink-300;
}
.notext{
    @apply text-transparent;
}
.used{
    @apply text-gray-300;
}
.topbar{
    @apply bg-transparent text-white;
    mix-blend-mode: difference;
}
</style>
<div class="font-alloy topbar text-lg flex justify-between w-full">
    <span>Ink:<span>{ink||0}</span></span>
    <span>Turn:<span>{(turn)?"Yes":"No"}</span></span>
</div>
<div
class:border-purple-300={turn}
class:border-white={!turn}
class="border-4 rounded-lg flex  mx-auto"
>
    <table class="w-full h-full font-alloy text-lg table-fixed border-black border-4 rounded-lg bg-white">
        {#each board as row, i}
        <tr>
            {#each row as cell, j}
            <td
            on:click={e=>{tdClick(i,j)}}
            >
            <span
            class:highlight={((From)||(To))&&isHighlighted(i,j)}
            class:unknown={cell.Value==-1}
            class:noone={(cell.Owner=="")&&(cell.Value!=-1)}
            class:self={cell.Owner==You}
            class:enemy={(cell.Owner!=You)&&(cell.Owner!="")}
            class:notext={cell.Value<=0}
            class:used={cell.Used}
            >{cell.Value}</span>
            </td>
            {/each}
        </tr>
        {/each}
    </table>
</div>
<Choose resolve={choice}/>