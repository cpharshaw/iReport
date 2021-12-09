import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';


import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { getNativeSelectUtilityClasses } from '@mui/material';



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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const getStyles = (name, personName, theme) => {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const Step4 = (props) => {


    const { currentStep, reportType, criteriaList, criteriaValue, handleCriteriaListChange } = props;

    const classes = useStyles();
    const theme = useTheme();

    if (currentStep !== 4) return null;

    if (reportType == "append") {
        return (
            <div>
                <h5>Selection Critieria</h5>
                <h6>N/a - continue to next step</h6>
            </div>
        )
    }

    const entryGroups = [...new Set(
        criteriaList.map(entry => {
            return entry.entryGroup
        })
    )];

    const transactionGroups = [...new Set(
        criteriaList.map(criterion => {
            if (criterion.subGroup !== "n/a") {
                return criterion.subGroup
            }
        })
    )].filter(Boolean);

    return (
        <Container >
            <p>Choose any limits you would like to use in your report.  These will restrict the selection during the query to match any and all values you select.</p>
            < Box sx={{ display: "flex", flexDirection: 'column' }} >
                {
                    entryGroups.map((entryGroup, i) => (
                        <Box key={i} sx={{ display: "flex", flexDirection: 'row', alignItems: "center", marginBottom: "10px" }} >
                            <Box sx={{ display: "flex", flexDirection: 'row', width: "100%" }} >
                                {
                                    entryGroup === "Property State" ?
                                        (
                                            <FormControl sx={{ m: 1, minWidth: "calc(50% - 16px)" }}>
                                                <InputLabel id={entryGroup}>{entryGroup}...</InputLabel>
                                                <Select
                                                    labelId={entryGroup}
                                                    id="demo-multiple-chip"
                                                    multiple
                                                    value={criteriaValue.hasOwnProperty(entryGroup) ? criteriaValue["Property State"] : []}
                                                    onChange={e => handleCriteriaListChange(e, "propstate")}
                                                    input={<OutlinedInput id="select-multiple-chip" label={entryGroup} />}
                                                    renderValue={selectedArr => (
                                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                            {
                                                                selectedArr.length == 0 ? null : selectedArr.map(value => {
                                                                    const entry = JSON.parse(value).entry;
                                                                    return <Chip key={entry} label={entry} />
                                                                })
                                                            }
                                                        </Box>
                                                    )}
                                                    MenuProps={MenuProps}
                                                >
                                                    {
                                                        criteriaList.map((criterion, j) => {
                                                            if (criterion.entryGroup !== entryGroup) return null;

                                                            return (
                                                                <MenuItem
                                                                    key={j}
                                                                    value={JSON.stringify(criterion)}
                                                                // style={getStyles(criterion.entry, criteria.criteriaPropState, theme)}
                                                                >
                                                                    <a data={criterion} >{criterion.entry == "*All / Any" ? <i>{criterion.entry}</i> : criterion.entry}</a>
                                                                </MenuItem>
                                                            )
                                                        })
                                                    }
                                                </Select>
                                            </FormControl>

                                        )
                                        :
                                    entryGroup === "Transaction" ?
                                        transactionGroups.map((subGroup, sg) => {
                                            return (
                                                <FormControl key={sg} sx={{ m: 1, minWidth: "calc(50% - 16px)" }}>
                                                    <InputLabel id={subGroup}>{subGroup}...</InputLabel>
                                                    {/* {console.log("JSON.stringify(criteriaValue[subGroup])", JSON.stringify(criteriaValue[subGroup]))} */}
                                                    <Select
                                                        labelId={subGroup}
                                                        id={subGroup}
                                                        value={criteriaValue.hasOwnProperty(subGroup) ? JSON.stringify(criteriaValue[subGroup]) : ''}
                                                        onChange={
                                                            (
                                                                (!criteriaValue.hasOwnProperty("Transaction Event") || criteriaValue["Transaction Event"].entry == "*All / Any")
                                                                    && 
                                                                subGroup == "Transaction Date Range"
                                                            ) ? console.log('') 
                                                            :
                                                            e => handleCriteriaListChange(e, "othercriteria")
                                                        }
                                                        label={subGroup}
                                                    >
                                                        <MenuItem disabled value="">
                                                            <em>Select desired {subGroup}</em>
                                                        </MenuItem>
                                                        {
                                                            criteriaList.map((criterion, j) => {

                                                                if (criterion.subGroup !== subGroup) return null;

                                                                return (
                                                                    <MenuItem key={j} value={JSON.stringify(criterion)}>
                                                                        <a data={criterion} >{criterion.entry == "*All / Any" ? <i>{criterion.entry}</i> : criterion.entry}</a>
                                                                    </MenuItem>
                                                                )

                                                            })
                                                        }
                                                    </Select>
                                                </FormControl>
                                            )
                                        })
                                        :
                                    (
                                        <FormControl sx={{ m: 1, minWidth: "calc(50% - 16px)" }}>
                                            <InputLabel id={entryGroup}>{entryGroup}...</InputLabel>
                                            <Select
                                                labelId={entryGroup}
                                                id={entryGroup}
                                                value={criteriaValue.hasOwnProperty(entryGroup) ? JSON.stringify(criteriaValue[entryGroup]) : ''}
                                                onChange={e => handleCriteriaListChange(e, "othercriteria")}
                                                label={entryGroup}
                                            >
                                                <MenuItem disabled value="">
                                                    <em>Select desired {entryGroup}</em>
                                                </MenuItem>
                                                {
                                                    criteriaList.map((criterion, j) => {

                                                        if (criterion.entryGroup !== entryGroup) return null;

                                                        return (
                                                            <MenuItem key={j} value={JSON.stringify(criterion)}>
                                                                <a data={criterion} >{criterion.entry == "*All / Any" ? <i>{criterion.entry}</i> : criterion.entry}</a>
                                                            </MenuItem>
                                                        )

                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    )
                                }
                            </Box>
                        </Box>
                    ))
                }

            </Box>
        </Container>


    )
}

export default Step4;

