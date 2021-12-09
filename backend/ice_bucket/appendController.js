const sql = require('mssql');
const xlsx = require("xlsx");
const utils = xlsx.utils;
const { runQuery } = require('../../../db/edw');

// https://medium.com/@pratique/excel-file-conversion-on-front-end-and-upload-to-node-server-6214835f2634
const append = async (req, res) => {
    const params = req.params;
    const id = req.params.id;
    const body = req.body;

    const {
        file,
        fileType,
        fileName,
        dataSource,
        requestedFields,
        fileFormat,
        sheetName,
        certColumn
    } = body;

    const wb = xlsx.read(file, { type: 'binary' });
    const dataSheet = wb.Sheets[sheetName];
    const dataSheet_data = utils.sheet_to_json(dataSheet);

    const headersFinal = [];

    const dataSheet_keys = Object.keys(dataSheet);

    const headers = dataSheet_keys.filter(key => {
        return key.replace(/\D/g,'') == "1";
    });

    headers.forEach(header => {
        const nr = dataSheet[header]["v"];
        headersFinal.push(nr);
    });

    

    const dataSheet_data_fixedHeaders = dataSheet_data.map(record => {

        let tempObj1 = {};
        let tempObj2 = {};

        headersFinal.forEach(header => {
            tempObj1[header] = null;
        });

        tempObj2 = {
            ...tempObj1,
            ...record
        };

        let finalRecord = {};

        Object.keys(tempObj2).forEach(key => {
            const nr = key.trim().toLowerCase().replace(/\W/g, '_') == "date" ? "date1" : key.trim().toLowerCase().replace(/\W/g, '_');
            finalRecord[nr] = record[key];
        });

        for (const value in finalRecord) {
            if (finalRecord[value] == undefined) {
                finalRecord[value] = null
            }
        };

        return finalRecord;

    });


    const base = (dataSheet_data_fixedHeaders);

    let fileSelectStatement = "";
    let withStatement = "";

    Object.keys(dataSheet_data_fixedHeaders[0]).forEach((key, i) => {
        const record = dataSheet_data_fixedHeaders[0];
        const value = record[key];

        const formatReal =
            (
                (key.search("date") >= 0 || key.search("dt") >= 0)
                &&
                (typeof value == "number" && value.toString().search(".") <= 0)
            ) ? "DATETIME"
                :
            (
                (key.search("date") >= 0 || key.search("dt") >= 0)
                ||
                (typeof value == "number" && value.toString().search(".") <= 0)
            ) ? "INT"
                :
            (
                (typeof value == "number" && value.toString().search(".") > 0)
            ) ? "DECIMAL" : "VARCHAR(MAX)";
        ;

        const formatSQL =
            (
                (key.search("date") >= 0 || key.search("dt") >= 0)
                &&
                (typeof value == "number" && value.toString().search(".") <= 0)
            ) ? "INT"
                :
            (
                (key.search("date") >= 0 || key.search("dt") >= 0)
                ||
                (typeof value == "number" && value.toString().search(".") <= 0)
            ) ? "INT"
                :
            (
                (typeof value == "number" && value.toString().search(".") > 0)
            ) ? "DECIMAL" : "VARCHAR(MAX)";
        ;

        if (key == "cert") {
            fileSelectStatement += `root.cert, `;
            withStatement += `${key} VARCHAR(8), `;
        } else if (formatReal == "DATETIME") {
            fileSelectStatement += `format(convert(date,(CAST(root.${key} - 2 as DATETIME ))),'MM/dd/yyyy') as ${key}, `;
            withStatement += `${key} ${formatSQL.toUpperCase()}, `;
        } else {
            fileSelectStatement += `root.${key}, `;
            withStatement += `${key} ${formatSQL.toUpperCase()}, `;
        }

    });

    const selectedFieldsStatement = requestedFields.map((fieldRecord, i) => {
        return fieldRecord.logicWithLabel.trim();
    }).join("").trim()
        .replace("casewhen", "case when")
        .replace("endas", "end as")
        .replace("amtelse", "Amt else")
        .replace("amtend", "Amt emd")

        .replace("casewhen", "case when")
        .replace("endas", "end as")
        .replace("Amtelse", "Amt else")
        .replace("Amtend", "Amt emd")

        .replace("Dtelse", "Amt else")
        .replace("Dtend", "Amt emd")

        .slice(0, -1);

    fileSelectStatement = fileSelectStatement.trim().slice(0, -1);
    withStatement = withStatement.trim().slice(0, -1);







    console.log("logic", null)
    console.log("file", JSON.parse(JSON.stringify(base).replace("'", "''")))
    console.log("fileSelectStatement", fileSelectStatement)
    console.log("selectedFieldsStatement", selectedFieldsStatement)
    console.log("withStatement", withStatement)
    
    const results = await runQuery(
        null,   // logic
        JSON.parse(JSON.stringify(base).replace("'", "''")),    // file
        fileSelectStatement,    // fileSelectStatement
        selectedFieldsStatement,    // selectedFieldsStatement,
        withStatement   // withStatement
    );




    

    let newWb = xlsx.utils.book_new();

    newWb.SheetNames.push("Sheet1");

    let ws = xlsx.utils.json_to_sheet(results.recordset, { cellDates: true });

    newWb.Sheets["Sheet1"] = ws;

    newWb.Props = {
        Title: "test",
        Author: "Craig Harshaw",
        CreatedDate: new Date(2021, 9, 23)
    };

    res.send(newWb);
}

module.exports = {
    append
}
