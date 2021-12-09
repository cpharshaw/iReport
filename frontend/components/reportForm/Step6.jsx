import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';

import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 170,
    },
    selectEmpty: {
        marginTop: theme.spacing(0),
    },
}));

const Step6 = (props) => {

    const {
        currentStep,
        handleFileInput,
        fileFormat,
        executingQuery,
        dataSource,
        fieldList,
        fileName,
        file,
        reportForInternalUse,
        handleInternalUseChange,
        handlePickAppendTemplate,
        handleDataSourceChange,
        handleFileFormatChange,
        customerIDs,
        reportType,
        selectedReportTypeName,
        criteriaValue,
        handleSetStep
    } = props;

    if (currentStep !== 6 || !fieldList || executingQuery) return null;
    // console.log("currentStep", currentStep)
    const classes = useStyles();

    const filteredFields = fieldList.filter(fieldInfo => {
        return fieldInfo.selected;
    });

    const groups = [...new Set(
        filteredFields.map(field => {
            return field.group
        })
    )]; 

    return (
        <Container className="f">
            <p>Confirm your selections below, using the gear icons, or back button, to navigate back to previous sections if you wish to adjust your selections.</p>
            <p>If you prefer to have your as of prior day or prior month end, you can utilize the 'Select a data as-of date' drop-down.</p>
            <p>If you are satisfied with your report criteria, please click 'Submit' to generate your report.  The report will download automatically when complete.</p>
            {/* <br /> */}
            <hr />
            <br />
            <div style={{ paddingLeft: "15%", paddingRight: "15%", maxWidth: "" }}>

            <div>
                <Box sx={{ display: "flex", flexDirection: 'row', width: "100%", justifyContent: "space-between"}} >
                    <Typography variant="h5" component="h2">
                        <span>For Customer(s)</span>
                    </Typography>
                    <SettingsOutlinedIcon  onClick={() => handleSetStep(2)}/>
                </Box>
                <Card className={classes.root}>
                    <CardContent>
                        {!customerIDs ? <i>-- no Customer(s) entered --</i> : customerIDs}
                    </CardContent>
                </Card>
            </div>

            <br />

            <div>
                <Box sx={{ display: "flex", flexDirection: 'row', width: "100%", justifyContent: "space-between"}} >
                    <Typography variant="h5" component="h2">
                        <span>Base report</span>
                    </Typography>
                    <SettingsOutlinedIcon  onClick={() => handleSetStep(3)}/>
                </Box>                
                <Card className={classes.root}>
                    <CardContent>
                        {selectedReportTypeName == "Custom..." || selectedReportTypeName == "Custom…" ? <i>Custom...</i> : selectedReportTypeName}
                    </CardContent>
                </Card>
            </div>

            <br />

            <div>
                {/* <Typography variant="h5" component="h2">
                    Limit(s)
                </Typography> */}
                <Box sx={{ display: "flex", flexDirection: 'row', width: "100%", justifyContent: "space-between"}} >
                    <Typography variant="h5" component="h2">
                        <span>Limit(s)</span>
                    </Typography>
                    <SettingsOutlinedIcon  onClick={() => reportType == "portfolio" ? handleSetStep(4) : handleSetStep(2)}/>
                </Box>                    
                <Card className={classes.root}>
                    <CardContent>
                        {
                            reportType == "portfolio" ? (
                                Object.keys(criteriaValue).map((key, i) => {
                                    return (
                                        <React.Fragment key={i}>
                                            <span>
                                                <b>
                                                    {
                                                        criteriaValue[key].entryGroup == "Role" ? "Customer Role" :
                                                        criteriaValue[key].entryGroup == "Transaction" ? criteriaValue[key].subGroup : 
                                                        Array.isArray(criteriaValue[key]) ? (
                                                            JSON.parse(criteriaValue[key][0]).entryGroup
                                                        ) :
                                                        criteriaValue[key].entryGroup
                                                    }
                                                </b>
                                                : &nbsp;
                                                {
                                                    Array.isArray(criteriaValue[key]) ? (
                                                        criteriaValue[key].map(criterion => {
                                                            return JSON.parse(criterion).entry.trim()
                                                        }).join(", ")
                                                    ) : criteriaValue[key].entry
                                                }
                                            </span>
                                            <br />
                                        </React.Fragment>
                                    )
                                })
                            ) : (
                                <div>( <i>Records from: <b>"</b>{fileName}<b>"</b></i> )</div>
                            )
                        }
                    </CardContent>
                </Card>
            </div>

            <br />

            <div>
                {/* <Typography variant="h5" component="h2">
                    Selected field(s)
                </Typography> */}
                <Box sx={{ display: "flex", flexDirection: 'row', width: "100%", justifyContent: "space-between"}} >
                    <Typography variant="h5" component="h2">
                        <span>Selected field(s)</span>
                    </Typography>
                    <SettingsOutlinedIcon  onClick={() => handleSetStep(5)}/>
                </Box>                   
                <Card className={classes.root}>
                    <CardContent>
                        <div>
                            {
                                groups.map((group, i) => {
                                    return (
                                        <React.Fragment key={group + i}>
                                            <div>
                                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                    {group}
                                                </Typography>
                                                {
                                                    filteredFields.map((fieldInfo, j) => {
                                                        if (fieldInfo.group !== group) return null;
                                                        const fieldName = fieldInfo.field;
                                                        const checked = fieldInfo.selected;
                                                        const groupName = fieldInfo.group;
                                                        return (
                                                            <Typography key={fieldInfo + j} variant="body2" component="p">{fieldName}</Typography>
                                                        )
                                                    })
                                                }
                                            </div>
                                            {groups.length - 1 == i ? null : <br />}
                                        </React.Fragment>
                                    )
                                })
                            }
                        </div>
                    </CardContent>
                </Card>
            </div>

            <br />
         
            <div>
                <Typography variant="h5" component="h2">
                    Select a data as-of date
                </Typography>
                {/* <Box sx={{ display: 'grid', alignItems: "center", alignContent: "center", justifyContent: "center", textAlign: "center" }}> */}
                <div>
                <FormControl className={classes.formControl}>
                    <Select
                        value={dataSource}
                        onChange={e => handleDataSourceChange(e)}
                        displayEmpty
                        className={classes.selectEmpty}
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="Select" disabled>
                            Select
                        </MenuItem>
                        <MenuItem value={"production"}>Prior day</MenuItem>
                        <MenuItem value={"premaster"}>Prior month end</MenuItem>
                    </Select>
                </FormControl>
                </div>
            {/* </Box> */}
            </div>
         

            <br />

            {/* <div>
                <Typography variant="h5" component="h2">
                    Select file format for export
                </Typography>
                <FormControl className={classes.formControl}>
                    <Select
                        value={fileFormat}
                        onChange={e => handleFileFormatChange(e)}
                        displayEmpty
                        className={classes.selectEmpty}
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="Select" disabled>
                            Select
                        </MenuItem>
                        <MenuItem value={"xlsb"}>Excel (binary)</MenuItem>
                        <MenuItem value={"csv"}>CSV</MenuItem>
                    </Select>
                </FormControl>
            </div> */}
            </div>
            
        </Container>
    );
}

export default Step6;

