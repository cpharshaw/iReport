import sql from 'mssql';
import {connection} from './db_edw.js';
import { sqlLogic } from './query_edw.js';

const program = async (logic) => {
    try {
        const results = await connection.query(logic);
        await console.log("results... ", results);
        await sql.close();
    }

    catch (err) {
        await console.log("error... ", err);
        await sql.close();
    }
}

program(sqlLogic);
