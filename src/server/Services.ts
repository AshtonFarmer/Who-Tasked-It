import db_queries from "./db/db_queries";

function getTasks(){
    return fetch('/gettasks').then(res => res.json());
}
function getSuspects(){
    return fetch('/getsuspects').then(res => res.json());
}

function DeleteTask(id: number){
    let data = {
        id: id
    }
    fetch('/tasks', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

async function getClue(){
    let clueArray = ["suspects", "weapons", "locations"];
    let random = (Math.round(Math.random() * (clueArray.length - 1)));
    let clueType = clueArray[random];
    let clue = await fetch(`/${clueType}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
    if (clueType == "suspects"){
        return [clueType, clue[0].name]
    }
    else if (clueType == "weapons"){
        return [clueType, clue[0].weapon];
    }
    else if (clueType == "locations"){
        return [clueType, clue[0].location];
    }
}

export default {
    getTasks,
    DeleteTask,
    getClue
}