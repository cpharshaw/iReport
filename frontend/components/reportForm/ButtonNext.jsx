import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

const ButtonNext = (props) => {

    const { currentStep, handleClick, disabled } = props;

    return (<> { disabled ?
        <Button 
            variant="outlined" 
            color="secondary" 
            component="span"
            onClick={handleClick}
            disabled
        >
            Next
        </Button>
        :
        <Button 
            variant="outlined" 
            color="secondary" 
            component="span"
            onClick={handleClick}
        >
            Next
        </Button>
}</>);
}

export default ButtonNext;

