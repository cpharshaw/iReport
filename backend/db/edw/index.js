const sql = require('mssql');
const { connection } = require('./connection_edw.js');
const { sqlLogic } = require('./query_edw.js');

const runQuery = async ({
    reportType,
    file,
    customerIDs,
    selectFromFileStatement,
    selectStatement,
    fromSourceStatement,
    withStatement,
    whereStatement
}) => {

    const conn = await connection();

    const sqlLogicText = sqlLogic(
        reportType,
        file,
        customerIDs,
        selectFromFileStatement,
        selectStatement,
        fromSourceStatement,
        withStatement,
        whereStatement
    )

    try {
        const results = await conn.query(sqlLogicText);

        conn.close();

        return {
            results,
            sqlLogic: sqlLogicText
        };
    }

    catch (err) {
        console.log("error... ", err);
        conn.close();
        return {
            error: err, 
            sqlLogicText: sqlLogicText
        };
    }

}

module.exports = {
    runQuery
}
