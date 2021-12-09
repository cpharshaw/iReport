import React, { useState, useEffect } from 'react';
import Head from 'next/head';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import Step1 from '../../components/reportForm/Step1';
import Step2 from '../../components/reportForm/Step2';
import Step3 from '../../components/reportForm/Step3';
import Step4 from '../../components/reportForm/Step4';
import Step5 from '../../components/reportForm/Step5';
import Step6 from '../../components/reportForm/Step6';
import Spinner from '../../components/reportForm/Spinner';



const ReportForm = props => {

  const {
    handleSubmit,
    currentStep,
    handleReportType,
    handleFileInput,
    fileName,
    reportForInternalUse,
    handleInternalUseChange,
    file,
    handlePickAppendTemplate,
    handleFieldListChange,
    handleReportTemplateChange,
    fieldList,
    originalFieldList,
    resetSelectedCriteria,
    resetSelectedFields,
    reportTemplateList,
    executingQuery,
    handleDataSourceChange,
    dataSource,
    handleFileFormatChange,
    fileFormat,
    reportType,
    handleCustomerIDChange,
    customerIDs,
    selectedReportTypeName,
    criteriaList,
    criteriaValue,
    handleCriteriaListChange,
    handleSetStep
  } = props;


  return (

    <form onSubmit={handleSubmit}>

      {/* https://css-tricks.com/the-magic-of-react-based-multi-step-forms/ */}


      <Step1
        currentStep={currentStep}
        handleReportType={handleReportType}
        reportType={reportType}
      />

      <Step2
        currentStep={currentStep}
        handleFileInput={handleFileInput}
        fileName={fileName}
        reportForInternalUse={reportForInternalUse}
        handleInternalUseChange={handleInternalUseChange}
        file={file}
        reportType={reportType}
        handleCustomerIDChange={handleCustomerIDChange}
        customerIDs={customerIDs}
        reportType={reportType}
      />

      <Step3
        currentStep={currentStep}
        handlePickAppendTemplate={handlePickAppendTemplate}
        reportType={reportType}
        reportTemplateList={reportTemplateList}
        fieldList={fieldList}
        resetSelectedCriteria={resetSelectedCriteria}
        resetSelectedFields={resetSelectedFields}
        handleReportTemplateChange={handleReportTemplateChange}
      />

      <Step4
        currentStep={currentStep}
        handleFieldListChange={handleFieldListChange}
        fieldList={fieldList}
        reportType={reportType}
        criteriaList={criteriaList}
        handleCriteriaListChange={handleCriteriaListChange}
        criteriaValue={criteriaValue}
      />

      <Step5
        currentStep={currentStep}
        executingQuery={executingQuery}
        fieldList={fieldList}
        originalFieldList={originalFieldList}
        handleDataSourceChange={handleDataSourceChange}
        dataSource={dataSource}
        resetSelectedFields={resetSelectedFields}
        handleFileFormatChange={handleFileFormatChange}
        fileFormat={fileFormat}
        reportType={reportType}
        handleFieldListChange={handleFieldListChange}
      />

      <Step6
        currentStep={currentStep}
        handleFieldListChange={handleFieldListChange}
        fieldList={fieldList}
        reportType={reportType}
        executingQuery={executingQuery}
        dataSource={dataSource}
        fileFormat={fileFormat}
        handleDataSourceChange={handleDataSourceChange}
        handleFileFormatChange={handleFileFormatChange}
        customerIDs={customerIDs}
        criteriaValue={criteriaValue}
        selectedReportTypeName={selectedReportTypeName}
        fileName={fileName}
        handleSetStep={handleSetStep}
      />

      <Spinner
        currentStep={currentStep}
        executingQuery={executingQuery}
      />

      {
        currentStep < 6 || executingQuery ? null :
          <>
            <br />
            <Box mb={0} sx={{ width: "100%", display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', alignItems: "center" }}>
              <div/>
              <div style={{ textAlign:"center" }}>
                <Button
                  type="submit"
                  variant="text"
                  color="primary"
                >
                  Submit
                </Button>
              </div>
              <div/>
            </Box>
          </>
      }

    </form>

  );
}

export default ReportForm;