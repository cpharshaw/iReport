// export NODE_TLS_REJECT_UNAUTHORIZED=0
const xlsx = require("xlsx");
const utils = xlsx.utils;

const excelFileFormatter = async excelFile => {

    const {
        file,
        fileType,
        fileName,
        fileFormat,
        sheetName,
        certColumn
    } = excelFile;

    const wb = xlsx.read(file, { type: 'binary' });
    const dataSheet = wb.Sheets[sheetName];
    const dataSheet_data = utils.sheet_to_json(dataSheet);

    // console.log("dataSheet", dataSheet)

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
            const nr_adj_cert = nr == "cert" ? "Cert" : nr;
            finalRecord[nr_adj_cert] = nr_adj_cert == "Cert" ? record[key].toString().trim() : record[key];
        });

        for (const value in finalRecord) {
            if (finalRecord[value] == undefined) {
                finalRecord[value] = null
            }
        };

        return finalRecord;

    });

    return dataSheet_data_fixedHeaders;

}

module.exports = {
    excelFileFormatter
}

