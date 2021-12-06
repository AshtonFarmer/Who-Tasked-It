
function getTasks(list_name: string){
    return fetch(`/todolist/${list_name}`).then(res => res.json());
}
// function getSuspects(){
//     return fetch('/getsuspects').then(res => res.json());
// }

function getLists(){
    return fetch(`/todolists`).then(res => res.json());
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

async function getFirstName(){
    let result = await fetch(`/firstperson`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    return result;
};

async function getSecondName(){
    let result = await fetch(`/secondperson`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    return result;
};

async function getThirdName(){
    let result = await fetch(`/thirdperson`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    return result;
};

async function getFirstLocation(){
    let result = await fetch(`/firstplace`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    return result;
};

async function getSecondLocation(){
    let result = await fetch(`/secondplace`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    return result;
};

async function getFirstObject(){
    let result = await fetch(`/firstobject`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    return result;
};

async function getSecondObject(){
    let result = await fetch(`/secondobject`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    return result;
};

async function getThirdObject(){
    let result = await fetch(`/thirdobject`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    return result;
};

async function createTodoList(data){
    let result = await fetch(`/todolist`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
    }).then(res => res.json())
    return result
}

async function getIntialClues(){

    let person1 =  {
        firstName: await getFirstName(),
        middleName: await getSecondName(),
        lastName: await getThirdName()
    };

    let person2 = {
        firstName: await getFirstName(),
        middleName: await getSecondName(),
        lastName: await getThirdName()
    }

    let killer = {
        firstName: await getFirstName(),
        middleName: await getSecondName(),
        lastName: await getThirdName()
    }

    let location1 = {
        first: await getFirstLocation(),
        second: await getSecondLocation()
    }

    let location2 = {
        first: await getFirstLocation(),
        second: await getSecondLocation()
    }

    let object1 = {
        first: await getFirstObject(),
        second: await getSecondObject(),
        third: await getThirdObject()
    }

    let object2 = {
        first: await getFirstObject(),
        second: await getSecondObject(),
        third: await getThirdObject()
    }

    let object3 = {
        first: await getFirstObject(),
        second: await getSecondObject(),
        third: await getThirdObject()
    }

    let firstClue = `${person1.firstName[0].name} ${person1.middleName[0].name} ${person1.lastName[0].name}`;
    let secondClue = `${location1.first[0].location} ${location1.second[0].location}`
    let thirdClue = `${person2.firstName[0].name} ${person2.middleName[0].name} ${person2.lastName[0].name}`;
    let fourthClue = `${object1.first[0].object} ${object1.second[0].object} ${object1.third[0].object}`
    let fifthClue = `${location2.first[0].location} ${location2.second[0].location}`
    let sixthClue = `${killer.firstName[0].name} ${killer.middleName[0].name} ${killer.lastName[0].name}`
    let seventhClue = `${object2.first[0].object} ${object2.second[0].object} ${object2.third[0].object}`
    
    let victim = [firstClue, thirdClue];
    let eighthClue = victim[(Math.round(Math.random() * (victim.length - 1)))];
    let ninthClue = `${object3.first[0].object} ${object3.second[0].object} ${object3.third[0].object}`


    // let suspect = await fetch(`/suspects`, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }).then(res => res.json())
    // let victim = await fetch(`/suspects`, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }).then(res => res.json())
    // let weapon = await fetch(`/weapons`, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }).then(res => res.json())
    // let location = await fetch(`/locations`, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }).then(res => res.json())
    let initialClues = [firstClue, secondClue, thirdClue, fourthClue, fifthClue, sixthClue, seventhClue, eighthClue, ninthClue];
    return initialClues
}


export default {
    getTasks,
    getLists,
    DeleteTask,
    getClue,
    getIntialClues,
    createTodoList
}