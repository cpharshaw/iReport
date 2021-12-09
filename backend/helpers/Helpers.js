// export NODE_TLS_REJECT_UNAUTHORIZED=0
const xlsx = require("xlsx");


const Fields = () => {
    
    const utils = xlsx.utils;

    const wb = xlsx.readFile("./fieldList for iReport.xlsb");

    const sheet1 = wb.Sheets["Sheet1"];

    const sheet1_data = utils.sheet_to_json(sheet1);

    console.dir(sheet1_data, {'maxArrayLength': null});

}

Fields();
