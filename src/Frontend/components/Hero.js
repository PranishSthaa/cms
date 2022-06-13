import { Box, Card, Grid, Typography, Button, Divider } from '@mui/material';
import { Link } from "react-router-dom";
import React from 'react';

const Hero = ({ currentUser }) => {
    return (
        <>
            <Box sx={{ m: 1 }}>
                <Card variant="contained" sx={{ p: 1 }}>
                    <Grid container>
                        <Grid item xs={7}>
                            <Typography variant='h3' component='h1'>College Management System</Typography>
                            <Divider sx={{ my: 1 }} />
                            <Typography variant='featureSubtitle' component='p'>CMS brings you easy to use and hassle free college management system that helps administrators, instructors and students.</Typography>
                            <Box sx={{ mt: 3 }}>
                                {currentUser ? null : <Button component={Link} to="login" variant='outlined' color='dark'>Login</Button>}
                                <Button component={Link} to="about" variant='outlined' color='info' sx={{ ml: 1 }}>Learn More</Button>
                            </Box>
                        </Grid>
                        <Grid item xs={5}>
                            <Box>
                                <img src={require("../assets/cms-dashboard.png")} alt="cms" height={400} />
                            </Box>
                        </Grid>
                    </Grid>
                </Card>
            </Box>
        </>
    )
}

export default Hero