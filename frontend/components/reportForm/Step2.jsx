import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Button from '@mui/material/Button';
import Link from 'next/link';
import Container from '@mui/material/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

const Step2 = (props) => {

  const { currentStep, handleFileInput, fileName, file, reportForInternalUse, handleInternalUseChange, reportType, handleCustomerIDChange, customerIDs } = props;

  const classes = useStyles();

  if (currentStep !== 2) return null;

  return (
    <Container>
      {
        reportType == "append" ? (
          <>
            <div>
              <div>Prior to selecting the file you wish to add data to, ensure your sheet is named '<b>Sheet1</b>' and certificate column header is '<b>Cert</b>'.</div>
              {/* <div>Then click 'Select File'.</div> */}

            </div>
            <br />
          </>
        ) : null
      }

      <div>
        <div>Enter customer ID(s) that you wish to compare against.</div>
        <div>Customer ID format: '<b>G</b>XXXXX' / '<b>M</b>XXXXX'.  Individual accounts or branches will not work...</div>
      </div>

      <br />

      <div style={{ paddingLeft: "13%", paddingRight: "13%", maxWidth: "" }}>

        {reportType == "portfolio" ? null :
          <>
            <div>
              <input
                accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel.sheet.binary.macroEnabled.12"
                className={classes.input}
                id="file"
                type="file"
                name="file"
                onChange={handleFileInput}
              />
              <label htmlFor="file">
                {
                  fileName ?
                    <Button variant="outlined" color="default" component="span">
                      {/* <Button variant="outlined" color="default" component="span"> */}
                      <span><i><b>{"'" + fileName + "'"}</b></i> &nbsp;selected</span>
                    </Button>
                    :
                    <Button variant="contained" color="neutral" component="span">
                      <span>Select file</span>
                    </Button>
                }
              </label>
            </div>

            <div>
              <br />
              <FormControlLabel
                control={<Checkbox color="secondary" checked={reportForInternalUse} onChange={handleInternalUseChange} name='reportForInternalUse' />}
                label="For Internal Use (won't mask results)"
              />
            </div>
          </>
        }
        <br />
        <div>
          <TextField
            id="servicerIDs"
            label="Customer ID(s) - separated by commas, if multiple - &nbsp; e.g. 'G00001', &nbsp; 'M11374'"
            // disabled={reportForInternalUse}
            fullWidth
            onChange={handleCustomerIDChange}
            value={customerIDs}
            color="secondary"
            required
          />
        </div>
      </div>
    </Container>
  );
}

export default Step2;

