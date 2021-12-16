// var os = require('os');
// console.log(os.userInfo().username);

const sqlLogic = (
    reportType,
    file,
    customerIDs,
    selectFromFileStatement,
    selectStatement,
    fromSourceStatement,
    withStatement,
    whereStatement
) => {

       // ${customerIDs ? `'' as [Radian Notes],` : null}   
    const queryAppend = `
        DECLARE @json NVARCHAR(MAX) = N'${JSON.stringify(file)}';
        ${customerIDs};

        SELECT DISTINCT
            ${selectFromFileStatement},

            ${
                customerIDs ? 
                    `case
                            when prod.CertificateNum is null or prod.CertificateNum = '' then '(Cannot ID)'
                            when (
                                prod.ServicerLenderID not in (select distinct customerID from #customerIDs)
                                    and
                                prod.PremiumServicerLenderID not in (select distinct customerID from #customerIDs)
                            ) then '(Not located in servicing portfolio)' 
                            else ''
                        end as [Radian Notes],` 
                        : 
                    null
            }   

            ${selectStatement}

            ${fromSourceStatement == "production" ? ", cast(prod.DailySummaryDate as date) as [DataAsOfDt]" :
            fromSourceStatement == "PreMaster" ? ", cast(prod.MonthEndDt as date) as [DataAsOfDt]" : null}                


        FROM OPENJSON ( @json ) WITH ( 
            ${withStatement} 
        ) as root

            left join BI_PRESENTATION.smsasdata.${fromSourceStatement} as prod
                on root.Cert = prod.CertificateNum

            left join BI_PRESENTATION.PADExtract.PADReportData as ref  
                on root.Cert = ref.[Cert No.]

        order by 
            [Radian Notes] asc
        ;
    
        drop table #customerIDs;
    `
    //     where (
    //         prod.CertificateNum is not null
    //             and
    //         (
    //             prod.ServicerLenderID in (select distinct customerID from #customerIDs) 
    //                 or 
    //             prod.PremiumServicerLenderID in (select distinct customerID from #customerIDs)
    //         )
    //     )
                
    //     union

    //     SELECT DISTINCT
    //         ${selectFromFileStatement},

    //         ${customerIDs ? `'(Not located in servicing portfolio)' as [Radian Notes],` : null}            

    //         ${selectStatement}

    //         ${fromSourceStatement == "production" ? ", cast(prod.DailySummaryDate as date) as [DataAsOfDt]" :
    //         fromSourceStatement == "PreMaster" ? ", cast(prod.MonthEndDt as date) as [DataAsOfDt]" : null}                

    //     FROM OPENJSON ( @json ) WITH ( 
    //         ${withStatement} 
    //     ) as root

    //         left join BI_PRESENTATION.smsasdata.${fromSourceStatement} as prod
    //             on root.Cert = prod.CertificateNum

    //         left join BI_PRESENTATION.PADExtract.PADReportData as ref  
    //             on root.Cert = ref.[Cert No.]      
                
    //     where (
    //         prod.CertificateNum is not null
    //             and
    //         (
    //             prod.ServicerLenderID not in (select distinct customerID from #customerIDs) 
    //                 and 
    //             prod.PremiumServicerLenderID not in (select distinct customerID from #customerIDs)
    //         )
    //     )

    //     union

    //     SELECT DISTINCT
    //         ${selectFromFileStatement},

    //         ${customerIDs ? `'(Cannot ID)' as [Radian Notes], ` : null}            

    //         ${selectStatement}

    //         ${fromSourceStatement == "production" ? ", cast(prod.DailySummaryDate as date) as [DataAsOfDt]" :
    //         fromSourceStatement == "PreMaster" ? ", cast(prod.MonthEndDt as date) as [DataAsOfDt]" : null}                

    //     FROM OPENJSON ( @json ) WITH ( 
    //         ${withStatement} 
    //     ) as root

    //         left join BI_PRESENTATION.smsasdata.${fromSourceStatement} as prod
    //             on root.Cert = prod.CertificateNum

    //         left join BI_PRESENTATION.PADExtract.PADReportData as ref  
    //             on root.Cert = ref.[Cert No.]      
                
    //     where (
    //         prod.CertificateNum is null
    //     )



    const queryPortfolio = `
        ${customerIDs};

        SELECT DISTINCT
            ${selectStatement}

            ${fromSourceStatement == "production" ? ", cast(prod.DailySummaryDate as date) as [DataAsOfDt]" :
            fromSourceStatement == "PreMaster" ? ", cast(prod.MonthEndDt as date) as [DataAsOfDt]" : null}

        FROM BI_PRESENTATION.smsasdata.${fromSourceStatement} as prod

            left join BI_PRESENTATION.PADExtract.PADReportData as ref  
                on prod.CertificateNum = ref.[Cert No.]

        WHERE (
            ${whereStatement}
        )
        ;

        drop table #customerIDs
        ;
    `

    const query = reportType == "append" ? queryAppend : queryPortfolio;

    // console.log("Query ---> ")
    // console.log(query)

    return query;

};


module.exports = {
    sqlLogic
}

// https://docs.microsoft.com/en-us/sql/relational-databases/json/use-openjson-with-the-default-schema-sql-server?view=sql-server-ver15
// https://docs.sheetjs.com/
// https://www.sqlshack.com/how-to-parse-json-in-sql-server/
// https://www.mssqltips.com/sqlservertip/1958/sql-server-cross-apply-and-outer-apply/
// https://docs.microsoft.com/en-us/sql/t-sql/functions/openjson-transact-sql?view=sql-server-ver15