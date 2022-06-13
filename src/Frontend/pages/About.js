import React from 'react';
import { Typography, Container, Grid, Paper } from '@mui/material';

const About = () => {
    return (
        <>
            <Container sx={{ my: 1 }}>
                <Paper variant='outlined' sx={{ p: 1 }}>
                    <Grid container>
                        <Grid item xs={7}>
                            <Typography variant='h3' component='h1'>About CMS</Typography>
                            <Typography variant='featureSubtitle' component='p' sx={{ mt: 1 }}>In college administration, all departments are interrelated. They are manually maintained. As a result, they must
                                be automated and consolidated, as data from one department will be needed by others.</Typography>
                            <Typography variant='featureSubtitle' component='p' sx={{ mt: 1 }}>CMS is advantageous since it has a simple user interface. The system employs sophisticated database
                                administration, data retrieval, and data manipulation capabilities. CMS makes it easier to handle data
                                than manually entering it into documents. The initiative is beneficial in terms of decreasing paperwork and
                                saving time.
                            </Typography>
                        </Grid>
                        <Grid item xs={5}></Grid>
                    </Grid>

                </Paper>
            </Container>
        </>
    )
}

export default About