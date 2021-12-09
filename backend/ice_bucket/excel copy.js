// export NODE_TLS_REJECT_UNAUTHORIZED=0

const xlsx = require("xlsx");
import 'xlsx';
const utils = xlsx.utils;

const wb = xlsx.readFile("./parserTest.xlsb");

const sheet1 = wb.Sheets["Sheet1"];
const sheet2 = wb.Sheets["Sheet2"];

const sheet1_data = utils.sheet_to_json(sheet1);
const sheet2_data = utils.sheet_to_json(sheet1);

const newData = sheet1_data.map(record => {
    return record.ID;
})

console.log(newData);