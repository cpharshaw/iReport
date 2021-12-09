import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const Step1 = props => {


    const { currentStep, reportType, handleReportType } = props;

    // const classes = useStyles();

    if (currentStep !== 1) return null;

    return (
        <Container>
            <br />

            <Box mb={0} sx={{ width: "100%", display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', alignItems: "center" }}>
                <div style={{ textAlign: "center" }}>
                    <Button variant="contained" color="neutral" component="span" onClick={e => handleReportType(e, "append")}>
                        I want to append to a file...
                    </Button>
                </div>

                <div style={{ textAlign: "center" }}>
                    <Button variant="contained" color="neutral" component="span" onClick={e => handleReportType(e, "portfolio")}>
                        I want to pull data based on criteria...
                    </Button>
                </div>
            </Box>


        </Container>
    );
}

export default Step1;