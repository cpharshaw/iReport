const sql = require('mssql');
const { config } = require('./config_edw.js');

const connection = async () => {
    try {
        return await sql.connect(config);
    }
    catch (err) {
        console.log("error... ", err);
        return err;
    }
}

// const connection = await connectedDB();
// export const connection = await connectedDB();

module.exports = {
    connection
}
