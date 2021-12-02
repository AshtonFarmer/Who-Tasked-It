import { Query } from "./index";

const allTasks = async () => Query(`SELECT * FROM tasks`);
const allSuspects = async () => Query(`SELECT * FROM suspects`);

const one = async (id: string) => Query(`SELECT * FROM tasks WHERE id = ?`, [id])

const getID = async(table: string) => Query('SELECT MAX(id) as id from ?', [table]);

//const createMention = async(userName: any, chirpid: number) => Query('INSERT into mentions(userid, chirpid) values(?, ?)', [userName, chirpid])

//const sendMentions = async(userName: any) => Query('SELECT chirpid from mentions WHERE userid = ?', [userName])

const createTask = (content: string) => {Query('INSERT INTO tasks(task_content) values(?)', [content])};

const updateNote = (content: string, id: string) => Query('UPDATE tasks set task_content = ? WHERE id = ?', [content, id]);

const deleteTask = (id: number) => Query('DELETE from tasks WHERE id = ?', [id])

//const deleteMention = (id: number) => Query('DELETE from mentions WHERE chirpid = ?', [id])

const getRandomSuspect = () => Query('SELECT s.name FROM suspects AS s JOIN(SELECT ROUND(RAND() * (SELECT MAX(id) FROM suspects)) AS id) AS x WHERE s.id >= x.id LIMIT 1;')
const getRandomWeapon = () => Query('SELECT w.weapon FROM weapons AS w JOIN(SELECT ROUND(RAND() * (SELECT MAX(id) FROM weapons)) AS id) AS x WHERE w.id >= x.id LIMIT 1;')
const getRandomLocation = () => Query('SELECT l.location FROM locations AS l JOIN(SELECT ROUND(RAND() * (SELECT MAX(id) FROM locations)) AS id) AS x WHERE l.id >= x.id LIMIT 1;')

export default {
    allTasks,
    allSuspects,
    one,
    createTask,
    updateNote,
    deleteTask,
    getID,
    getRandomSuspect,
    getRandomWeapon,
    getRandomLocation 
    //createMention,
    //sendMentions,
    //deleteMention
}