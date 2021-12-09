const xlsx = require("xlsx");

const utils = xlsx.utils;


const wb = xlsx.readFile("./helpers/fieldList_for_iReport.xlsb");

const sheet_fieldList = wb.Sheets["fieldList"];
const sheet_reportTemplateList = wb.Sheets["reportTemplateList"];
const sheet_criteriaList = wb.Sheets["criteriaList"];

const sheet_fieldList_data = utils.sheet_to_json(sheet_fieldList);
const sheet_reportTemplateList_data = utils.sheet_to_json(sheet_reportTemplateList);
const sheet_criteriaList_data = utils.sheet_to_json(sheet_criteriaList);




const fieldList = sheet_fieldList_data.map(record => {
  const newRecordObj = {}
  for (const field in record) {
    if (typeof record[field] == "string") {
      let newValue = record[field].replace((/  |\t\r\n|\t|\n|\r/gm), " ");
      newRecordObj[field] = newValue;
    } else {
      newRecordObj[field] = record[field];
    }
  }

  return newRecordObj;
});

const criteriaList = sheet_criteriaList_data.map(record => {
  const newRecordObj = {}
  for (const entry in record) {
    if (typeof record[entry] == "string") {
      let newValue = record[entry].replace((/  |\t\r\n|\t|\n|\r/gm), " ");
      newRecordObj[entry] = newValue;
    } else {
      newRecordObj[entry] = record[entry];
    }
  }


  return newRecordObj;
});

// const test = criteriaList.filter(g => {return g.entryGroup == "Property State"})

// console.log(test)


const reportTemplateList = sheet_reportTemplateList_data.map((report, r) => {

  let newReport = {
    ...report,
    selectedFields: [],
    selectedCriteria: []
  }

  // insert fields that go with report template (into 'selectedFields')
  fieldList.forEach((fieldData, f) => {

    if (fieldData[report.column]) {
      newReport.selectedFields.push(
        {
          ...fieldData,
          selected: true
        }
      )
    }

  });

  // insert criteria that go with report template (into 'selectedCriteria')
  criteriaList.forEach((criteriaData, f) => {

    if (criteriaData[report.column]) {
      newReport.selectedCriteria.push(
        {
          ...criteriaData,
          selected: true
        }
      )
    }

  });  

  return newReport;

});

// console.log("criteriaList");
// console.log(criteriaList);

const reportTemplateAndFieldLists = (req, res) => {
  const params = req.params;
  const id = req.params.id;

  res.send({
    fieldList,
    reportTemplateList,
    criteriaList
  });
};



module.exports = {
  reportTemplateAndFieldLists
}



// {
//   ID: 93,
//   fieldID: 25,
//   field: 'Net Cancel Balance Due',
//   groupID: 5,
//   group: 'Billing',
//   format: 'money',
//   logic: "case when prod.MIPolicyStatusType in ('Canceled Certificate', 'Cancelled Certificate') and ( prod.CancellationBalanceDueAmt =0 or ((prod.CancellationBalanceDueAmt - prod.CancellationPremiumRemittedAmt) < 0) ) then 0 else prod.CancellationBalanceDueAmt - prod.CancellationPremiumRemittedAmt end",
//   logicWithLabel: "case when prod.MIPolicyStatusType in ('Canceled Certificate', 'Cancelled Certificate') and ( prod.CancellationBalanceDueAmt =0 or ((prod.CancellationBalanceDueAmt - prod.CancellationPremiumRemittedAmt) < 0) ) then 0 else prod.CancellationBalanceDueAmt - prod.CancellationPremiumRemittedAmt end as [Net Cancel Balance Due],",
//   selected: false,
//   forReportPortfolio_ActiveCertificates: false,
//   forReportPortfolio_ActiveCommitments: false,
//   forReportPortfolio_ActiveCertsAndCommits: false,
//   forReportPortfolio_CancelledCertificates: false,
//   forReportPortfolio_EntirePortfolio: false,
//   forReportPortfolio_Lapsed: false,
//   forReportPortfolio_PastDue: false,
//   forReportPortfolio_PaidAhead: false,
//   forReportPortfolio_LPSingles: false,
//   forReportPortfolio_LPMonthlies: false,
//   forReportPortfolio_BPSingles: false,
//   forReportPortfolio_BPMonthlies: false,
//   forReportPortfolio_10YrAnniv: false,
//   forReportPortfolio_ExpCommits: false,
//   forReportPortfolio_CancCommits: false,
//   forReportPortfolio_MP1: true,
//   forReportPortfolio_MP2: false,
//   forReportPortfolio_MP3: false,
//   forReportPortfolio_Submissions: false,
//   forReportPortfolio_Custom: false,
//   forReportAppend_NewlyBoarded: false,
//   forReportAppend_BulkReinst: false
// },

// {
//   column: 'forReportPortfolio_Submissions',
//   reportID: 18,
//   type: 'Portfolio',
//   name: '*Submissions (pulls on Submitter ID)',
//   selectionLogic: '(prod.InitialInsuredLenderID in (@customer))',
//   selected: false
// },
