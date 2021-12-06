import * as express from 'express';

import db from './db';

const router = express.Router();

// Returns all records for the table that is passed in.
// router.get('/gettasks', async (req, res) => {
//     try {
//         res.json(await db.db_queries.allTasks())
//     }
//     catch(err){
//         console.log(err);
//         res.sendStatus(500);
//     }
// });

router.get('/todolist/:list_name', async (req, res) => {
    try {
        const list_name = req.params.list_name;
        res.json(await db.db_queries.getTodoList(list_name))
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

router.get('/todolists', async (req, res) => {
    try {
        res.json(await db.db_queries.getTodoLists());
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

router.get('/getsuspects', async (req, res) => {
    try {
        res.json(await db.db_queries.allSuspects())
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

// Returns a single record from the passed in table with id = passed in id
router.get('/gettask', async(req, res) => {
    try {
        const table = req.body.table;
        const id = req.body.id;
        res.json(await db.db_queries.one(id))
    }
    catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// router.get('/suspects', async(req, res)=> {
//     try {
//         res.json(await db.db_queries.getRandomSuspect())
//     }
//     catch(err){
//         console.log(err);
//         res.sendStatus(500);
//     }
// })
// router.get('/weapons', async(req, res)=> {
//     try {
//         res.json(await db.db_queries.getRandomWeapon())
//     }
//     catch(err){
//         console.log(err);
//         res.sendStatus(500);
//     }
// })
// router.get('/locations', async(req, res)=> {
//     try {
//         res.json(await db.db_queries.getRandomLocation())
//     }
//     catch(err){
//         console.log(err);
//         res.sendStatus(500);
//     }
// })
router.get('/firstperson', async(req, res)=> {
    try {
        res.json(await db.db_queries.getFirstPerson())
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})
router.get('/secondperson', async(req, res)=> {
    try {
        res.json(await db.db_queries.getSecondPerson())
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})
router.get('/thirdperson', async(req, res)=> {
    try {
        res.json(await db.db_queries.getThirdPerson())
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})
router.get('/firstplace', async(req, res)=> {
    try {
        res.json(await db.db_queries.getFirstPlace())
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})
router.get('/secondplace', async(req, res)=> {
    try {
        res.json(await db.db_queries.getSecondPlace())
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})
router.get('/firstobject', async(req, res)=> {
    try {
        res.json(await db.db_queries.getFirstObject())
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})
router.get('/secondobject', async(req, res)=> {
    try {
        res.json(await db.db_queries.getSecondObject())
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})
router.get('/thirdobject', async(req, res)=> {
    try {
        res.json(await db.db_queries.getThirdObject())
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})

// Sends post request to database to create new note.
router.post('/tasks', (req, res) => {
    try {
        const content = req.body.content;
        const list_name = req.body.list_name;
        db.db_queries.createTask(content, list_name)
        res.sendStatus(200);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});
router.post('/todolist', (req, res) => {
    try {
        const list_name = req.body.list_name;
        const user_id = req.body.user_id;
        db.db_queries.createTodoList(list_name, user_id);
        res.sendStatus(200);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

//Sends put request to database to update note with id = to the id on the request body
router.put('/tasks', (req, res) => {
    try{
        const content = req.body.content;
        const id = req.body.id;
        db.db_queries.updateNote(content, id)
        res.sendStatus(200);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

//Sends delete request to database to delete note with id = to the id on the request body
router.delete('/tasks', (req, res) => {
    try{
        const id = req.body.id;
        console.log(req.body);
        db.db_queries.deleteTask(id);
        res.sendStatus(200);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});
export default router;