import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import SignupForm from '../components/SignupForm';

const Signup = () => {
    return (
        <>
            <Container sx={{ my: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xs={7}>
                        <Box>
                            <Typography variant='h3' component='h1'>Contact us to signup</Typography>
                            <Typography variant='body1' component='p'>Fill the form and send it to us to get a quote for CMS. <br />After that we can setup your CMS according to your preferences.</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={5}>
                        <SignupForm />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Signup