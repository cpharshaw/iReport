import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Link from 'next/link';

const ButtonBack = (props) => {

    const { currentStep, handleClick } = props;

    // useEffect(() => {
    //     if (currentStep) console.log("currentStep: ", currentStep);
    // }, [currentStep]);

    return (<>
        {currentStep === 1 ?
            <Link href="/" color="inherit" variant="inherit">
                <Button
                    variant="outlined"
                    color="secondary"
                    component="span"
                    onClick={handleClick}
                >
                    Back
                </Button>
            </Link>
            :
            <Button
                variant="outlined"
                color="secondary"
                component="span"
                onClick={handleClick}
            >
                Back
            </Button>
        }
    </>);
}

export default ButtonBack;

