import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';


const useStyles = makeStyles((theme) => ({
    root: {
        // display: 'flex',
        width: "100%",
    },
    formControl: {
        margin: '-3px 0 0 0',
        padding: '0 12px 6px 12px'
    },
}));

const Step5 = (props) => {

    const { currentStep, fieldList, handleFieldListChange } = props;

    let fields = fieldList;

    // useEffect(() => {
    //     console.log("x.) fieldList updated")
    //   }, [fieldList]);



    const classes = useStyles();

    if (currentStep !== 5) return null;

    const groups = [...new Set(
        fields.map(field => {
            return field.group
        })
    )];


    return (
        <Container>
            <div className={classes.root}>
                <p>Select any and all fields/columns you would like to display in your report.</p>
                <div style={{ paddingLeft: "20%", paddingRight: "20%", maxWidth: "" }}>
                    {
                        groups.map((group, i) => {

                            return (

                                <Accordion key={group + i} TransitionProps={{ unmountOnExit: true }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography className={classes.heading}>{group}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails className={classes.formControl}>
                                        <FormControl component="fieldset" className={classes.formControl}>
                                            <FormGroup>
                                                {
                                                    fields.map((fieldInfo, j) => {
                                                        if (fieldInfo.group !== group) return null;
                                                        const fieldName = fieldInfo.field;
                                                        const checked = fieldInfo.selected;
                                                        const groupName = fieldInfo.group;
                                                        return (
                                                            <FormControlLabel
                                                                key={fieldName + j} control={<Checkbox color="secondary" checked={checked} onChange={(data) => handleFieldListChange(fieldInfo)} name={fieldName} />}
                                                                label={fieldName}
                                                            />
                                                        )
                                                    })
                                                }
                                            </FormGroup>
                                        </FormControl>
                                    </AccordionDetails>
                                </Accordion>

                            )
                        })

                    }
                </div>
            </div>
        </Container>

    );

}

export default Step5;

