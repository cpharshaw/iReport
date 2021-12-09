const sql = require('mssql');
const xlsx = require("xlsx");
const utils = xlsx.utils;
const { runQuery } = require('../../../db/edw');
const { excelFileFormatter } = require('../../../helpers/excelFileFormatter');

// https://medium.com/@pratique/excel-file-conversion-on-front-end-and-upload-to-node-server-6214835f2634
const createReport = async (req, res) => {
    const params = req.params;
    const id = params ? params.id : null;
    const body = req.body;

    const {
        reportType,
        excelFile,

        customerIDs,
        requestedFields,
        requestedDataSource,
        requestedCriteria,
        requestedReportForInternalUse
    } = body;

    // console.log("requestedCriteria", requestedCriteria)

    const {
        file,
        fileName,
        fileType,
        fileFormat,
        sheetName,
        certColumn,
    } = excelFile;


    let selectFromFileStatement = "";
    let withStatement = "";
    let requestedCriteria_cleaned;
    let file_formatted;

    // create a string of customerIDs warapped in parentheses, feeds into the INTO VALUES step.  Have to do this since SQL doesnt allow me to declre a variable with a list/array/tuple data type
    const customerID_list = customerIDs.split(",").map((customerID, i) => {
        return "('" + customerID.trim().replace(/[^a-z0-9]/gi, '').trim() + "')"
    }).join(", ").trim();

    const customerIDs_cleaned = (`
        CREATE TABLE #customerIDs (
            customerID VARCHAR(10)
        ) ;

        INSERT INTO #customerIDs VALUES ${customerID_list} ;
    `);

    const requestedFields_cleaned = requestedFields.map((fieldRecord, i) => {
        return fieldRecord.logicWithLabel.trim();
    }).join(`

    `).trim()
        .replace("casewhen", "case when")
        .replace("endas", "end as")
        .replace("amtelse", "Amt else")
        .replace("amtend", "Amt end")

        .replace("casewhen", "case when")
        .replace("endas", "end as")
        .replace("Amtelse", "Amt else")
        .replace("Amtend", "Amt end")

        .replace("Dtelse", "Amt else")
        .replace("Dtend", "Amt end")

        .slice(0, -1);



    if (reportType == "append") {

        try {
            file_formatted = await excelFileFormatter(excelFile);
        } catch (err) {
            console.log(err)
            return res.send({ error: true });
        }

        Object.keys(file_formatted[0]).forEach((key, i) => {

            const record = file_formatted[0];
            const value = record[key];

            const formatReal =
                (
                    (key.search("date") >= 0 || key.search("Date") >= 0 || key.search("dt") >= 0 || key.search("Dt") >= 0)
                    &&
                    (value == "" || !value || (typeof value == "number" && value.toString().search(".") <= 0))
                ) ? "DATETIME"
                    :
                    (
                        (key.search("date") >= 0 || key.search("Date") >= 0 || key.search("dt" >= 0) || key.search("Dt") >= 0)
                        ||
                        (value == "" || !value || (typeof value == "number" && value.toString().search(".") <= 0))
                    ) ? "INT"
                        :
                        (
                            ((typeof value == "number" && value.toString().search(".") > 0))
                        ) ? "DECIMAL" : "VARCHAR(MAX)";
            ;

            const formatSQL =
                (
                    (key.search("date") >= 0 || key.search("Date") >= 0 || key.search("dt") >= 0 || key.search("Dt") >= 0)
                    &&
                    (value == "" || !value || (typeof value == "number" && value.toString().search(".") <= 0))
                ) ? "INT"
                    :
                    (
                        (key.search("date") >= 0 || key.search("Date") >= 0 || key.search("dt") >= 0 || key.search("Dt") >= 0)
                        ||
                        (value == "" || !value || (typeof value == "number" && value.toString().search(".") <= 0))
                    ) ? "INT"
                        :
                        (
                            ((typeof value == "number" && value.toString().search(".") > 0))
                        ) ? "DECIMAL" : "VARCHAR(MAX)";
            ;

            if (key.toUpperCase() == "CERT") {
                selectFromFileStatement += `
                    root.Cert as [File Certificate Number], 
                `;
                withStatement += `
                    Cert VARCHAR(8), 
                `;
            } else if (formatReal == "DATETIME") {
                selectFromFileStatement += `
                    cast(format(convert(date,(CAST(root.${key} - 2 as DATETIME ))),'MM/dd/yyyy') as date) as [${key}], 
                `;
                withStatement += `
                    ${key} ${formatSQL.toUpperCase()}, 
                `;
            } else {
                selectFromFileStatement += `
                    root.${key} as [${key}], 
                `;
                withStatement += `
                    ${key} ${formatSQL.toUpperCase()}, 
                `;
            }

            file_formatted = JSON.parse(JSON.stringify(file_formatted).replace("'", "''"));
        });
    } else if (reportType == "portfolio") {

        requestedCriteria_cleaned = Object.keys(requestedCriteria).map((key, i) => {
            // console.log("key", key)

            let value;
            if (key == "Transaction Event") {
                requestedCriteria["Transaction Event"].entry == "*All / Any" ? value = value : (
                    value = "(" +
                    requestedCriteria["Transaction Event"].entryValue.trim() + " " + requestedCriteria["Transaction Date Range"].subEntry1Value.trim()
                    + " and " +
                    requestedCriteria["Transaction Event"].entryValue.trim() + " " + requestedCriteria["Transaction Date Range"].subEntry2Value.trim()
                    + ")"
                );
            } else if (Array.isArray(requestedCriteria[key])) {
                value = "(" + requestedCriteria[key].map(stateCriterion => {
                    return (
                        JSON.parse(stateCriterion).entryValue.trim()
                    )
                }).join(" or ") + ")";
                // console.log("value ---> ", value)
            } else if (key != "Transaction Date Range") {
                value = requestedCriteria[key].entryValue.trim();
            }

            // value = ("(" + JSON.stringify(...requestedCriteria[key].map((stateCriterion, s) => {
            //     return JSON.parse(stateCriterion).entryValue.trim();
            // })) + ")").replace('"','').replace('"','');            

            return value;
        }).join(" and ").replace("and  and", " and ");

        if (requestedCriteria_cleaned.trim().slice(-3).trim() == "and") {
            requestedCriteria_cleaned = requestedCriteria_cleaned.trim().slice(0, requestedCriteria_cleaned.length - 4).trim();
        }

    } else {

        console.log("Error with 'reportType'", reportType);

    };

    const queryData = {
        reportType: reportType,
        file: file_formatted,
        customerIDs: customerIDs_cleaned,
        selectFromFileStatement: selectFromFileStatement.trim().slice(0, -1),
        selectStatement: requestedFields_cleaned,
        fromSourceStatement: requestedDataSource == "production" ? "production" : "PreMaster",
        withStatement: withStatement.trim().slice(0, -1),
        whereStatement: requestedCriteria_cleaned
    };

    try {

        const results = await runQuery(queryData);      

        const excelData = results.results.recordset;
        const count = excelData.length;

        console.log("excelData ---> ", excelData)

        if (count && count >= 1000000) {
            res.send({
                file: null,
                count: count || 1000001
            });
        } else {
            const sqlLogic = [
                ["Logic"],
                [results.sqlLogic.trim().replace('""', '"').substring(0,30000)],
                [results.sqlLogic.trim().replace('""', '"').substring(30000,60000)],
                [results.sqlLogic.trim().replace('""', '"').substring(60000,90000)],
            ];

            let newWb = xlsx.utils.book_new();

            newWb.SheetNames.push("Data");
            newWb.SheetNames.push("SQL");

            const updatedExcelData  = reportType == "portfolio" || requestedReportForInternalUse ? excelData : excelData.map(record => {

                let newRecord = {};

                const dividerIndex = Object.keys(record).indexOf('Radian Notes');

                Object.keys(record).forEach((key, i) => {
                    if (i > dividerIndex && record['Radian Notes'].length > 0 && key != 'Radian Notes') {
                        newRecord[key] = '';
                    }
                    else {
                        newRecord[key] = record[key];
                    }
                });

                return { 
                    ...newRecord 
                };

            });

            let data = xlsx.utils.json_to_sheet(updatedExcelData, { cellDates: true });

            let sql = xlsx.utils.aoa_to_sheet(sqlLogic);

            newWb.Sheets["Data"] = data;
            newWb.Sheets["SQL"] = sql;

            newWb.Props = {
                Title: "test",
                Author: "Craig Harshaw",
                // CreatedDate: new Date(2021, 9, 23)
            };

            res.send({
                file: newWb ? newWb : null,
                count: count || null
            });
        }

    } catch (errorIssue) {

        console.log("ERROR CRAIG !!!", errorIssue)
        res.send({ error: true });
    }

};


module.exports = {
    createReport
};

