import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import NavbarMenu from './NavbarMenu';
import Logo from './Logo';

const Footer = () => {
    return (
        <>
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    backgroundColor: 'dark.main',
                    color: 'light.main',
                }}
            >
                <Container>
                    <Grid container spacing={1}>
                        <Grid item xs={10}>
                            <NavbarMenu />

                            <Typography variant="body2">
                                © 2022 Pranish Shrestha
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Box sx={{ mx: "auto", textAlign: 'end' }}>
                                <Logo />
                                <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>
                                    College Management System
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}

export default Footer