import { Query } from "./index";

const allTasks = async () => Query(`SELECT * FROM tasks`);
const allSuspects = async () => Query(`SELECT * FROM suspects`);
const getTodoList = async (list_name: string) => Query(`SELECT * FROM tasks where list_name = ?`, [list_name])
const getTodoLists = async() => Query(`SELECT * FROM to_do_lists`);

const one = async (id: string) => Query(`SELECT * FROM tasks WHERE id = ?`, [id])

const getID = async(table: string) => Query('SELECT MAX(id) as id from ?', [table]);

const createTask = (content: string, list_name: string) => {Query('INSERT INTO tasks(task_content, list_name) values(?, ?)', [content, list_name])};

const createTodoList = (list_name: string, user_id) => {Query('INSERT INTO to_do_lists(list_name, user_id) values(?, ?)', [list_name, user_id])};

const updateNote = (content: string, id: string) => Query('UPDATE tasks set task_content = ? WHERE id = ?', [content, id]);

const deleteTask = (id: number) => Query('DELETE from tasks WHERE id = ?', [id])

const getRandomSuspect = () => Query('SELECT s.name FROM suspects AS s JOIN(SELECT ROUND(RAND() * (SELECT MAX(id) FROM suspects)) AS id) AS x WHERE s.id >= x.id LIMIT 1;')
const getRandomWeapon = () => Query('SELECT w.weapon FROM weapons AS w JOIN(SELECT ROUND(RAND() * (SELECT MAX(id) FROM weapons)) AS id) AS x WHERE w.id >= x.id LIMIT 1;')
const getRandomLocation = () => Query('SELECT l.location FROM locations AS l JOIN(SELECT ROUND(RAND() * (SELECT MAX(id) FROM locations)) AS id) AS x WHERE l.id >= x.id LIMIT 1;')
const getFirstPerson = () => Query('SELECT f.name FROM firstperson AS f JOIN(SELECT ROUND(RAND() * (SELECT MAX(id) FROM firstperson)) AS id) AS x WHERE f.id >= x.id LIMIT 1;')
const getSecondPerson = () => Query('SELECT f.name FROM secondperson AS f JOIN(SELECT ROUND(RAND() * (SELECT MAX(id) FROM secondperson)) AS id) AS x WHERE f.id >= x.id LIMIT 1;')
const getThirdPerson = () => Query('SELECT f.name FROM thirdperson AS f JOIN(SELECT ROUND(RAND() * (SELECT MAX(id) FROM thirdperson)) AS id) AS x WHERE f.id >= x.id LIMIT 1;')
const getFirstPlace = () => Query('SELECT f.location FROM firstplace AS f JOIN(SELECT ROUND(RAND() * (SELECT MAX(id) FROM firstplace)) AS id) AS x WHERE f.id >= x.id LIMIT 1;')
const getSecondPlace = () => Query('SELECT f.location FROM secondplace AS f JOIN(SELECT ROUND(RAND() * (SELECT MAX(id) FROM secondplace)) AS id) AS x WHERE f.id >= x.id LIMIT 1;')
const getFirstObject = () => Query('SELECT f.object FROM firstobject AS f JOIN(SELECT ROUND(RAND() * (SELECT MAX(id) FROM firstobject)) AS id) AS x WHERE f.id >= x.id LIMIT 1;')
const getSecondObject = () => Query('SELECT f.object FROM secondobject AS f JOIN(SELECT ROUND(RAND() * (SELECT MAX(id) FROM secondobject)) AS id) AS x WHERE f.id >= x.id LIMIT 1;')
const getThirdObject = () => Query('SELECT f.object FROM thirdobject AS f JOIN(SELECT ROUND(RAND() * (SELECT MAX(id) FROM thirdobject)) AS id) AS x WHERE f.id >= x.id LIMIT 1;')


export default {
    allTasks,
    allSuspects,
    getTodoList,
    getTodoLists,
    one,
    createTask,
    createTodoList,
    updateNote,
    deleteTask,
    getID,
    getRandomSuspect,
    getRandomWeapon,
    getRandomLocation,
    getFirstPerson,
    getSecondPerson,
    getThirdPerson,
    getFirstPlace,
    getSecondPlace,
    getFirstObject,
    getSecondObject,
    getThirdObject
}