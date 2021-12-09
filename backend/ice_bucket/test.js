const sql = require("msnodesql");

const connectionString = `
    DRIVER={SQL Server Native Client 11.0};
    MultiSubnetFailover=Yes;
    ApplicationIntent=READONLY;
    WSID=;
    APP=Microsoft® Windows® Operating System;
    Trusted_Connection=Yes;
    SERVER=;
    DATABASE=;
    Description=;
`;

const query = `
    SELECT * FROM dbo.bctl_dayofweek
`
sql.query(connectionString, query, (err, rows) => {
    
    if (err) {
        console.log('error...');
        console.log(err);
        return;
    }

    return console.log(rows);
});