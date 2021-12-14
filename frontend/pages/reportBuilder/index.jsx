import React, { useState, useEffect } from 'react';
import Head from 'next/head';
// import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import Link from 'next/link';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ReportForm from '../../components/reportForm';

import ButtonNext from '../../components/reportForm/ButtonNext';
import ButtonBack from '../../components/reportForm/ButtonBack';
// import { fields } from '../../components/helpers/fields';

// import { criteriaList as old_criteriaList } from '../../components/helpers/criteriaList';
import axios from 'axios';

import xlsx from 'xlsx';



const ReportBuilder = () => {
  const [reportType, setReportType] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  // const [reportList, setReportList] = useState(null);
  const [fileName, setFilename] = useState(null);
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [fileFormat, setFileFormat] = useState("xlsb");
  const [sheetName, setSheetName] = useState("Sheet1");
  const [certColumn, setCertColumn] = useState("Cert");
  const [originalFieldList, setOriginalFieldList] = useState(null);
  const [originalCriteriaList, setOriginalCriteriaList] = useState(null);

  const [fieldList, setFieldList] = useState(null);
  const [reportTemplateList, setReportTemplateList] = useState(null);
  const [selectedReportTypeName, setSelectedReportTypeName] = useState(null);
  const [criteriaList, setCriteriaList] = useState(null);

  const [criteriaValue, setCriteriaValue] = useState({});

  const [dataSource, setDataSource] = useState("production");
  const [executingQuery, setExecutingQuery] = useState(false);
  const [reportResults, setReportResults] = useState(null);

  const [customerIDs, setCustomerIDs] = useState("");
  const [reportForInternalUse, setReportForInternalUse] = useState(false);

  const [reportComplete, setReportComplete] = useState(null);
  const [reportResult, setReportResult] = useState(null);


  useEffect(() => {
    axios.get('/api/reportTemplateAndFieldLists')
      .then(res => {
        const data_fieldList = res.data.fieldList;
        const data_reportTemplateList = res.data.reportTemplateList;
        const data_criteriaList = res.data.criteriaList;

        // console.log("data_fieldList ---> ", data_fieldList)
        // console.log("data_reportTemplateList ---> ", data_reportTemplateList)
        // console.log("data_criteriaList ---> ", data_criteriaList)

        setOriginalFieldList(data_fieldList);
        setOriginalCriteriaList(data_criteriaList);

        setFieldList(data_fieldList);
        setReportTemplateList(data_reportTemplateList);
        setCriteriaList(data_criteriaList);

        // console.log("old_criteriaList", old_criteriaList)
      })
  }, []);


  useEffect(() => {
    // console.log("criteriaValue", criteriaValue)
  }, [criteriaValue]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentStep]);  


  const date = new Date();
  const mm = "" + (date.getMonth() + 1);
  const dd = "" + date.getDate();
  const yyyy = "" + date.getFullYear();
  const dateText = mm + "-" + dd + "-" + yyyy;
  // .slice(2);


  const handleSubmit = e => {
    e.preventDefault();

    setExecutingQuery(true);

    const requestedFields = fieldList.filter(fieldInfo => {
      return fieldInfo.selected;
    });


    axios({
      method: 'post',
      url: '/api/createReport/',
      data: {
        reportType: reportType,
        excelFile: {
          file: file,
          fileName: fileName,
          fileType: fileType,
          fileFormat: fileFormat,
          sheetName: sheetName,
          certColumn: certColumn,
        },
        customerIDs: customerIDs,
        requestedFields: requestedFields,
        requestedDataSource: dataSource,
        requestedCriteria: criteriaValue,
        requestedReportForInternalUse: reportForInternalUse
      }
    })
      .then(res => {

        // console.log("Response ---> ", res)

        if (res.data.error) {
          setExecutingQuery(false);
          setReportComplete(true);
          setReportResult("error");
          // console.log("Error ---> ")
          // console.log(res.data)
          setTimeout(() => {
            setReportComplete(null);
            setReportResult(null);
          }, 20000);          
          return;
        }

        setExecutingQuery(false);


        if (1 <= res.data.count && res.data.count < 1000000) {
          setReportResult("success");
          setReportComplete(true);

          xlsx.writeFile(res.data.file, 'iReport - ' + customerIDs.trim().replace(/[^a-z0-9,]/gi, '') + ' - ' + selectedReportTypeName.trim().replace(/[^a-z0-9 ,]/gi, '') + ' - run on ' + dateText + '.xlsb', { bookType: "xlsb", type: "binary", cellDates: true });
        } else if (res.data.count <= 0) {
          setReportResult("noRecords");
          setReportComplete(true);
        } else if (res.data.count >= 1000000) {
          setReportResult("tooLarge");
          setReportComplete(true);
        }
        
        setTimeout(() => {
          setReportComplete(null);
          setReportResult(null);
        }, 20000);

      })
      .catch(err => {
        setExecutingQuery(false);
        setReportComplete(true);
        setReportResult("error");
        console.log("currentStep", currentStep)
        console.error(err);

        setTimeout(() => {
          setReportComplete(null);
          setReportResult(null);
        }, 20000);
      });

  }
  // console.log(res.data)
  // xlsx.write(newWb, 'report.xlsb', { bookType: "xlsb", type: "binary" });



  const handleNextStep = () => {
    
    let step;
    step = currentStep >= 5 ? 6 : currentStep + 1;
    setCurrentStep(step);
  }

  const handleSetStep = step => {
    
    setCurrentStep(step);
  }


  const handleBackStep = () => {
    let step;
    
    step = currentStep <= 1 ? 1 : currentStep - 1;
    setCurrentStep(step);
  }


  const handleFileInput = e => {
    // https://medium.com/@pratique/excel-file-conversion-on-front-end-and-upload-to-node-server-6214835f2634
    const val = e.currentTarget.value;
    const nameOfFile = val.substring(val.lastIndexOf("\\") + 1, 9999999999);
    setFilename(nameOfFile);

    const files = e.target.files[0];
    setFileType(files.type);
    const fileExt = nameOfFile.substring(nameOfFile.length - 5, 99);

    fileExt === ".xlsb" ? setFileFormat("xlsb") : setFileFormat("csv");

    const reader = new FileReader();

    reader.onload = e => {
      const result = e.target.result;

      setFile(result);
    };

    reader.readAsBinaryString(files);
  }


  const handleDataSourceChange = (e) => {
    const source = e.target.value;
    console.log("Data source ---> ", source)
    setDataSource(source);
  };


  const handleFileFormatChange = (e) => {
    const format = e.target.value;
    setFileFormat(format);
  };

  const handleInternalUseChange = (data) => {
    // console.log("reportForInternalUse clicked...")
    setReportForInternalUse(!reportForInternalUse);
  };


  const handleFieldListChange = data => {

    // console.log("4.) 'handleFieldListChange' a initiated");

    // create temp array with selected field removed, as it will be added back in after change the selected property to true
    let fieldFieldList;
    let updatedFieldList;

    if (Array.isArray(data)) {

      // console.log("5a.) 'handleFieldListChange' a initiated");

      // resetSelectedFields("within array of 5a");

      fieldFieldList = fieldList.filter(f => {
        return !data.some(r => {
          return r.ID == f.ID
        });
      });


      // add in selected field to new array of fields, then sort to get original order.  this is to keep field list UI consistent
      updatedFieldList = [
        ...fieldFieldList,
        ...data
      ].sort((a, b) => { return a.ID - b.ID });

      // update state with sorted new array
      setFieldList(updatedFieldList);

    }

    else {
      // create temp field object with selected property set to true

      const updatedField = {
        ...data,
        selected: !data.selected
      };

      fieldFieldList = fieldList.filter(fieldInfo => fieldInfo.ID !== data.ID);

      // add in selected field to new array of fields, then sort to get original order.  this is to keep field list UI consistent
      updatedFieldList = [
        ...fieldFieldList,
        updatedField
      ].sort((a, b) => { return a.ID - b.ID });

      // update state with sorted new array
      setFieldList(updatedFieldList);

    }


  };




  const handleCriteriaListChange = (e, extra) => {
  
    if (extra == "propstate") {

      const newValue = e.target.value;

      if (newValue.length == 0) {
        return setCriteriaValue({
          ...criteriaValue,
          "Property State": newValue
        })
      }

      let tempArrValue;

      const firstItem = newValue[0];
      const lastItem = newValue[newValue.length - 1];

      if (JSON.parse(lastItem).entry == "*All / Any" || JSON.parse(firstItem).entry == "*All / Any") {
        tempArrValue = [lastItem]
      } else {
        tempArrValue = newValue
      }

      setCriteriaValue({
        ...criteriaValue,
        "Property State": tempArrValue
      })

    } else if (extra === "othercriteria") {

      const data = JSON.parse(e.target.value);

      const entryGroup = data.entryGroup == "Transaction" ? data.subGroup : data.entryGroup;

      const updatedCriteriaValue = {
        ...criteriaValue,
        [entryGroup]: data
      };      
      
      if (entryGroup == "Transaction Event" && data.entry == "*All / Any") {
        updatedCriteriaValue.hasOwnProperty("Transaction Date Range") ? delete updatedCriteriaValue["Transaction Date Range"] : null;
      };

      // if (entryGroup == "Transaction Date Range" && (updatedCriteriaValue["Transaction Event"].entry == "*All / Any" || updatedCriteriaValue["Transaction Event"].entry == "")) {
      //   return;
      // };      

      setCriteriaValue(updatedCriteriaValue)

    } else {

      const data = e;

      // console.log("e, extra ---> ", e, extra);

      let criteriaListList;
      let updatedCriteriaList;

      criteriaListList = criteriaList.filter(f => {
        return !data.some(r => {
          return r.ID == f.ID
        });
      });

      // console.log("criteriaListList ---> ", criteriaListList);

      updatedCriteriaList = [
        ...criteriaListList,
        ...data
      ].sort((a, b) => { return a.ID - b.ID });

      const updatedCriteriaValue = {
        ...criteriaValue,
      };

      data.forEach(criterion => {
        const entryGroup = criterion.entryGroup == "Transaction" ? criterion.subGroup : criterion.entryGroup;

        updatedCriteriaValue[entryGroup] = criterion
      })

      // update state with sorted new array
      setCriteriaList(updatedCriteriaList);
      setCriteriaValue(updatedCriteriaValue)

    }


  };

  const resetSelectedCriteria = msg => {

    setCriteriaList(originalCriteriaList);
    setCriteriaValue({});

  }



  const resetSelectedFields = msg => {

    setFieldList(originalFieldList);

  }



  const handleReportTemplateChange = data => {

    // console.log("handleReportTemplateChange, data ---> ", data)

    handleFieldListChange(data.selectedFields);
    handleCriteriaListChange(data.selectedCriteria);
    setSelectedReportTypeName(data.name);

  };





  const handlePickAppendTemplate = () => {
    // console.log("append template picked");
    // select fields for template and enter into state, 
    //        reference 'handleFieldListChange' to see how to select fields
    handleNextStep();
  };


  const handleReportType = (e, type) => {
    e.preventDefault();
    // console.log(type)
    setReportType(type);
    handleNextStep();
  }

  const handleCustomerIDChange = e => {
    setCustomerIDs(e.target.value)
  }


  return (
    <>
      <Head>
        <title>Radian iReport | Report Builder</title>
        <meta name="keywords" content="reportBuilder" />
      </Head>

      <div>
        <h1>Report Builder</h1>
        {/* 'repeat(3, 1fr)' */}
        <Container>
          <Box mb={2} sx={{ width: "100%", display: 'grid', gridTemplateColumns: '4fr 7fr 4fr', alignItems: "flex-end	" }}>
            <h3 style={{ padding: "0", margin: "0", textAlign: "left", verticalAlign: "middle", background:"" }}>
              Step {currentStep} {
                currentStep == 1 ? " - Report Type" : 
                currentStep == 2 ? " - Inputs" : 
                currentStep == 3 ? " - Base report" : 
                currentStep == 4 ? " - Limit(s)" : 
                currentStep == 5 ? " - Selected field(s)" : 
                currentStep == 6 ? " - Confirmation" : null
              }
            <br />
            </h3>
            <h5 style={{ margin: "0", textAlign: "center", verticalAlign: "middle", background:"" }}>
              {
                reportComplete && reportResult == "success" && currentStep == 6 ? (
                  <span style={{ color: "green" }}>Success! Report will begin downloading shortly...</span>
                ) : reportComplete && reportResult == "error" && currentStep == 6 ? (
                  <span style={{ color: "red" }}>Error... Please contact Craig Harshaw</span>
                ) : reportComplete && reportResult == "tooLarge" && currentStep == 6 ? (
                  <>
                  <span style={{ color: "orange" }}>Report contained &gt; 1,000,000 records...</span>
                  <br/>
                  <span style={{ color: "orange" }}>Please adjust criteria or contact MIRS Analytics for assistance.</span>
                  </>
                ) : reportComplete && reportResult == "noRecords" && currentStep == 6 ? (
                  <>
                  <span style={{ color: "orange" }}>No records found...</span>
                  <br/>
                  <span style={{ color: "orange" }}>Please adjust criteria or contact MIRS Analytics for assistance.</span>
                  </>
                ) : null
              } 
            </h5>
            <h3 style={{ margin: "0", textAlign: "right", background:"" }}></h3>
          </Box>

          <ReportForm
            handleSubmit={handleSubmit}
            handleFileInput={handleFileInput}
            handleReportType={handleReportType}
            handleInternalUseChange={handleInternalUseChange}
            handlePickAppendTemplate={handlePickAppendTemplate}
            handleFieldListChange={handleFieldListChange}
            handleDataSourceChange={handleDataSourceChange}
            handleFileFormatChange={handleFileFormatChange}
            currentStep={currentStep}
            fileName={fileName}
            reportForInternalUse={reportForInternalUse}
            file={file}
            fieldList={fieldList}
            resetSelectedCriteria={resetSelectedCriteria}
            resetSelectedFields={resetSelectedFields}
            reportTemplateList={reportTemplateList}
            executingQuery={executingQuery}
            dataSource={dataSource}
            fileFormat={fileFormat}
            reportType={reportType}
            handleNextStep={handleNextStep}
            handleCustomerIDChange={handleCustomerIDChange}
            customerIDs={customerIDs}
            handleReportTemplateChange={handleReportTemplateChange}
            handleCriteriaListChange={handleCriteriaListChange}
            criteriaValue={criteriaValue}
            criteriaList={criteriaList}
            selectedReportTypeName={selectedReportTypeName}
            handleSetStep={handleSetStep}
          />

          <br />
          <br />

          <Box mb={0} sx={{ width: "100%", display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', alignItems: "center" }}>
            {executingQuery ? null : 
              <div style={{ textAlign: "center" }}>
                <ButtonBack currentStep={currentStep} handleClick={handleBackStep} executingQuery={executingQuery} />
              </div>
            }
            <div style={{ textAlign: "center" }}>{
              currentStep >= 6 || currentStep == 1 || executingQuery ? null :
                file === "" ?
                  <ButtonNext currentStep={currentStep} handleClick={handleNextStep} disabled={true} executingQuery={executingQuery} />
                  :
                  <ButtonNext
                    currentStep={currentStep}
                    handleClick={handleNextStep}
                    disabled={
                      currentStep == 1 ? true :
                      currentStep == 2 && reportType == "append" && !fileName ? true :
                      currentStep == 2 && reportType == "portfolio" && customerIDs.length <= 5 ? true :
                      currentStep == 3 && selectedReportTypeName <= 0 ? true :
                      currentStep == 4 && reportType == "portfolio" && Object.keys(criteriaList).length <= 0 ? true :
                      currentStep == 6 ? true :
                      false
                    }
                    executingQuery={executingQuery}
                  />
            }</div>
          </Box>


        </Container>

      </div>
    </>
  );
}

export default ReportBuilder;