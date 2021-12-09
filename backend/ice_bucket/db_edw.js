import sql from 'mssql';
import { config } from './config_edw.js';


const connectedDB = async () => {
    try {
        return await sql.connect(config);
    }
    catch (err) {
        console.log("error... ", err);
        return err;
    }
}


export const connection = await connectedDB();