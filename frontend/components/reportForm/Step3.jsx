import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import ButtonGroup from '@mui/material/ButtonGroup';
import List from '@mui/material/List';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import { reportTemplateAndFieldLists } from '../../../backend/routes/apiRouter/controllers/reportTemplateAndFieldListsController';

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


const Step3 = (props) => {

    const [selectedIndexData, setSelectedIndexData] = useState(null);

    const {
        currentStep, reportType, resetSelectedCriteria, resetSelectedFields,
        reportTemplateList, handleReportTemplateChange
    } = props;



    useEffect(() => {
        // selectedIndexData ? console.log("selectedIndexData.data ---> ", selectedIndexData.data) : null;
        selectedIndexData ? handleReportTemplateChange(selectedIndexData.data) : null
    }, [selectedIndexData]);


    const handleListItemClick = (event, index, data) => {

        // console.log("1.) clicked on report template... 'data' ---> ", data)

        resetSelectedCriteria("step3 handleListItemClick");
        resetSelectedFields("step3 handleListItemClick");

        setSelectedIndexData({
            index,
            data
        });

    };




    const classes = useStyles();

    if (currentStep !== 3) return null;

    return (
        <Container>
            <p>Select a pre-built report type, or select 'Custom...' to start from scratch.  These report templates will pre-select commonly used fields and selection criteria applicable to the report subject.  Fields and criteria available in subsequent steps.</p>
            <div style={{ paddingLeft: "20%", paddingRight: "20%", maxWidth: "" }}>
            {/* <Box sx={{ width: "100%", display: 'grid', alignItems: "center", alignContent: "center", justifyContent: "center", textAlign:"center" }}> */}
                {reportType == "append" ?
                    <List
                        component="span"
                        aria-label="main mailbox folders"
                    >
                        {
                            reportTemplateList
                                .filter(rt => rt.type == "Append")
                                .map((reportTemplate, i) => {
                                    return (
                                        <ListItemButton
                                            selected={selectedIndexData ? selectedIndexData.index === i : null}
                                            onClick={e => handleListItemClick(e, i, reportTemplate)}
                                            key={i}
                                        >
                                            {
                                                reportTemplate.name === "Custom…" || reportTemplate.name === "Custom..." ? (
                                                    <ListItemText sx={{ fontStyle: 'italic' }} primary={reportTemplate.name} />
                                                ) : (
                                                    <ListItemText primary={reportTemplate.name} />
                                                )
                                            }                                            
                                        </ListItemButton>
                                    )
                                })
                        }
                    </List>

                    :

                    <List
                        component="span"
                    >
                        {
                            reportTemplateList
                                .filter(rt => rt.type == "Portfolio")
                                .map((reportTemplate, i) => {
                                    return (
                                        <ListItemButton
                                            selected={selectedIndexData ? selectedIndexData.index === i : null}
                                            onClick={e => handleListItemClick(e, i, reportTemplate)}
                                            key={i}
                                        >
                                            {
                                                reportTemplate.name === "Custom…" || reportTemplate.name === "Custom..." ? (
                                                    <ListItemText sx={{ fontStyle: 'italic' }} primary={reportTemplate.name} />
                                                ) : (
                                                    <ListItemText primary={reportTemplate.name} />
                                                )
                                            }
                                        </ListItemButton>
                                    )
                                })
                        }
                    </List>

                }
            {/* </Box> */}
            </div>
        </Container>
    );
}

export default Step3;

