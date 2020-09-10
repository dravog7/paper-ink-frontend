import lodash from "lodash"

function fight(From,To){
    if(((From.Value==1)&&(To.Value==5))||((From.Value==2)&&(To.Value==4)))
        To.Value = 0
    else if(((From.Value==5)&&(To.Value==1))||((From.Value==4)&&(To.Value==2)))
        From.Value = 0
    let fromVal = Number(From.Value)
    From.Value =From.Value - To.Value
    To.Value = To.Value - fromVal
    if(From.Value>0){
        To.Value = From.Value
        From.Value = 0
        To.Owner = From.Owner
        To.Used = true
    }
    else{
        From.Value = 0
    }
    return {newFrom:From,newTo:To}
}

function addMove(board,From,To,number){
    if((From)&&(!To)){
        //new unit spawn
        board[From[0]][From[1]].Value = number
        board[From[0]][From[1]].Used=true
        return number
    }
    else if((From)&&(To)){
        let {newFrom,newTo} = fight(board[From[0]][From[1]],board[To[0]][To[1]])
        board[From[0]][From[1]] =newFrom
        board[To[0]][To[1]] =newTo
    }
    return 0
}

function undo(board,move){
    let {From,To,FromVal,ToVal,Number} = move
    board[From[0]][From[1]] = Object.assign(board[From[0]][From[1]],FromVal)
    if(!To){
        board[From[0]][From[1]].Value = 0
        board[From[0]][From[1]].Used = false
        return Number
    }
    board[To[0]][To[1]] = Object.assign(board[To[0]][To[1]],ToVal)
    return 0
}

export default {
    fight,   
    addMove,
    undo,
}