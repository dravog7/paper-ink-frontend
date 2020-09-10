import {writable} from "svelte/store"

function createWebSocket(){
    if (typeof WebSocket === 'undefined') return;
    const url = "wss://paper-ink.herokuapp.com/ws"

    const { subscribe,set,update } = writable({
        Command:"",
        Ink:0,
        Ping:"",
        You:null,
        Next:null,
        Board:{},
        Players:[],
        isOpen:false,
        inMatch:false,
        searching:false,
    })
    let socket = new WebSocket(url)
    socket.onopen=function(e){
        update(v=>{
            return {
                ...v,
                isOpen:true,
            }
        })
    }
    socket.onmessage = function(e){
        let data = JSON.parse(e.data)
        if(data.Command=="welcome"){
            data.inMatch = true
            data.searching = false
        }
        else if(data.Command=="finish"){
            data.inMatch = false
        }
        update(v=>{
            v = {
                ...v,
                ...data,
            }
            return v
        })
    }
    socket.onclose = function(){
        update(v=>{
            return {
                ...v,
                isOpen:false,
            }
        })
    }

    function convert_moves(moves){
        let m = []
        for(let i of moves){
            if(!i.To){
                i.To = i.From
                i.From = [-1,-1]
            }
            m.push({
                From:i.From,
                To:i.To,
                Number:i.Number,
            })
        }
        return m
    }

    const methods = {
        makeMove(moves){
            convert_moves(moves)
            let com = {
                Command:"move",
                Moves:moves,
            }
            socket.send(JSON.stringify(com))
        },
        findMatch(){
            let com = {
                command:"findMatch",
            }
            socket.send(JSON.stringify(com))
            update(v=>{
                return {
                    ...v,
                    searching:true,
                }
            })
        },
        clear(){
            update(v=>{
                return {
                    ...v,
                    Winner:null,
                    Board:{},
                    Players:[],
                    inMatch:false,
                    searching:false,
                    Command:"",
                    Ink:"",
                }
            })
        }
    }

    return {
        subscribe,
        ...methods,
        set,
        update,
    }
}

export const socketStore = createWebSocket()