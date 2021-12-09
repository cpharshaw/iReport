// export NODE_TLS_REJECT_UNAUTHORIZED=0
const xlsx = require("xlsx");


const getFields = file => {

    const utils = xlsx.utils;

    const wb = xlsx.readFile(file);

    // const sheet1 = wb.Sheets["Sheet1"];

    // const sheet1_data = utils.sheet_to_json(sheet1);

    // const importedFile = sheet1_data.map(record => {
    //     const newRecordObj = {}
    //     for (const field in record) {
    //         if (typeof record[field] == "string") {
    //             let newValue = record[field].replace((/  |\t\r\n|\t|\n|\r/gm), " ");
    //             newRecordObj[field] = newValue;
    //         } else {
    //             newRecordObj[field] = record[field]
    //         }
    //     }

    //     return newRecordObj;
    // });

    // return importedFile;
}

module.exports = {
    getFields
}

