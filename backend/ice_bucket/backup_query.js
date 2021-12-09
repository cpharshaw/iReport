
const sqlLogic = (
    file, 
    selectFromFileStatement,
    selectStatement,
    fromSourceStatement,
    withStatement,
    whereStatement,
    customerIDs
) => {

    const queryAppend = `
        DECLARE @json NVARCHAR(MAX) = N'${JSON.stringify(file)}';
        DECLARE @customerIDs NVARCHAR(MAX) = N'${customerIDs}';

        SELECT DISTINCT
            ${selectFromFileStatement},

            ${selectedFieldsStatement}

        FROM OPENJSON ( @json ) WITH ( ${withStatement} ) as root

            left join BI_PRESENTATION.smsasdata.production as prod

                on root.cert = prod.CertificateNum

            left join BI_PRESENTATION.PADExtract.PADReportData as ref  
                on root.cert = ref.[Cert No.]
        ;
    `

    const queryPortfolio = `
        DECLARE @customerIDs NVARCHAR(MAX) = N'${customerIDs}';

        SELECT DISTINCT
            ${selectedFieldsStatement}

        FROM ${selectedFieldsStatement}

            left join BI_PRESENTATION.PADExtract.PADReportData as ref  
                on root.cert = ref.[Cert No.]

        WHERE ${whereStatement}
        ;
    `    
    console.log("---------------");
    console.log("---------------");
    console.log("---------------");
    console.log("file --->", file);
    console.log("---------------");
    console.log("---------------");
    console.log("---------------");
    // console.log("selectedFieldsStatement --->", selectedFieldsStatement);
    // console.log("---------------");
    // console.log("---------------");
    // console.log("---------------");    

    return queryAppend;

};

// left join BI_PRESENTATION.smsasdata.production as prod



module.exports = {
    sqlLogic
}


// https://docs.microsoft.com/en-us/sql/relational-databases/json/use-openjson-with-the-default-schema-sql-server?view=sql-server-ver15
// https://docs.sheetjs.com/
// https://www.sqlshack.com/how-to-parse-json-in-sql-server/
// https://www.mssqltips.com/sqlservertip/1958/sql-server-cross-apply-and-outer-apply/
// https://docs.microsoft.com/en-us/sql/t-sql/functions/openjson-transact-sql?view=sql-server-ver15