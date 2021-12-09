// https://tediousjs.github.io/node-mssql/
// https://www.connectionstrings.com/microsoft-odbc-driver-17-for-sql-server/
// https://docs.microsoft.com/en-us/sql/integration-services/import-export-data/connect-to-an-odbc-data-source-sql-server-import-and-export-wizard?view=sql-server-ver15#odbc_dsn


const sql = require('mssql');

// DATABASE=BI_PRESENTATION;

// TrustServerCertificate = true --- need to avoid self-signed certificate errors
const config_BillingCenter = `
    DRIVER={SQL Server Native Client 11.0};
    MultiSubnetFailover=Yes;
    ApplicationIntent=READONLY;
    WSID=;
    APP=Microsoft® Windows® Operating System;
    Trusted_Connection=Yes;
    Integrated_Security=true;
    TrustServerCertificate=true; 
    SERVER=;
    Description=NodeJS_BC;
    DATABASE=;
    UID=;
    PWD=;
`;


const queryLogic_BC = `
    SELECT * FROM dbo.bctl_dayofweek
`

// libname smref sqlsvr datasrc=BIPRDEDW_BI_DATA schema=PADExtract qualifier=BI_Presentation access=readonly Read_Lock_type=NOLOCK;


sql.connect(config_BillingCenter)
    .then(pool => pool.request().query(queryLogic_BC))
    .then(result => {
        console.log("SUCCESS...", result.recordset);
        sql.close()
    })
    .catch(err => {
        console.log("error...")
        console.log(err)
        sql.close();
    })