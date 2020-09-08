import {writable} from "svelte/store"

function createWebSocket(){
    if (typeof WebSocket === 'undefined') return;
    const local = document.location.protocol.replace("http","ws")+"//"+document.location.hostname+":5000/ws"
    const url = (process.env.NODE_ENV === 'development')?local:"wss://paper-ink.herokuapp.com/ws"

    const { subscribe,set,update } = writable({
        Command:"",
        Ink:"",
        Ping:"",
        You:"",
        Next:"",
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
        }
        else if(data.Command=="finished"){
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

    const methods = {
        makeMove(moves){
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
        }
    }

    return {
        subscribe,
        ...methods,
    }
}

export const socketStore = createWebSocket()