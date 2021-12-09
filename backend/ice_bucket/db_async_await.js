// const sql = require('mssql');
import sql from 'mssql';

// DATABASE=BI_PRESENTATION;
const config = `
    DRIVER={SQL Server Native Client 11.0};
    MultiSubnetFailover=Yes;
    WSID=;
    Trusted_Connection=Yes;
    SERVER=;
    Description=NodeJS_EDW;
    TrustServerCertificate=true;
    UID=;
    PWD=; 
`;

const queryLogic = `
    select distinct
        prod.certificatenum,
        prod.MIPolicyStatusType,
        ref.Voucher,
        ref.DisbursementNumber,
        ref.[Pymnt Date],
        ref.[Gross Amt],
        ref.[Reason Description]
    from BI_PRESENTATION.smsasdata.production as prod
    left join BI_PRESENTATION.PADExtract.PADReportData as ref  
        on prod.CertificateNum = ref.[Cert No.]
    where certificatenum in (
        '00000001',
        '00000002',
        '71079025'
    )
`;

const program = async () => {
    try {
        const connection = await sql.connect(config);
        const result = await connection.query(queryLogic)
        console.log("SUCCESS...", result);
        await sql.close();
    }

    catch (err) {
        console.log("error")
        console.log(err);
        await sql.close();
    }
}

program();