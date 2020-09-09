<script>
import {socketStore} from "../store/websocket.js";


export let board;
export let From;
export let To;
export let You;
export let tdClick;

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