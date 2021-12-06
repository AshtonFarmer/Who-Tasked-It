import * as mysql from 'mysql';
import db_queries from './db_queries';

export const Connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

export const Query = (query: string, values?: string[] | Number[]) => { 
    return new Promise<Array<any>>((resolve, reject) => {
        Connection.query(query, values, (err, results) => {
            if(err) return reject(err);
            return resolve(results);
        })
    })
}

export default {
    db_queries
}