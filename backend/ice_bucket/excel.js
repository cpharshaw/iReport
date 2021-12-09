// export NODE_TLS_REJECT_UNAUTHORIZED=0

import xlsx from 'xlsx';
const utils = xlsx.utils;

const wb = xlsx.readFile("./parserTest.xlsb");

const sheet1 = wb.Sheets["Sheet1"];
const sheet2 = wb.Sheets["Sheet2"];

const sheet1_data = utils.sheet_to_json(sheet1);
const sheet2_data = utils.sheet_to_json(sheet2);

const newData = sheet2_data.map(record => {
    return {...record, "pizza": "Yum"};
});

console.log(newData);