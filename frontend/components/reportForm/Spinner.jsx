import React from 'react';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Spinner = props => {

    const {
        currentStep,
        executingQuery
    } = props;

    if (!executingQuery) return null;

    return (
        <Container>
            <Box
                // mb={2}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    margin: "0 auto",
                    flexDirection: "column"
                }}
            >
                <CircularProgress sx={{ display: "", background: "" }} color="secondary" />
                <p style={{ background: "" }}>Running report</p>
            </Box>
        </Container>

                    // alignContent: "center",
                    // justifyContent: "center",
                    // textAlign: "center",
                    // verticalAlign: "center",
                    // background: "",        
    );
}

export default Spinner;

