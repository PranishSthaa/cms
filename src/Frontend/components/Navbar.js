import { Box, Button, Container, Paper, Grid } from '@mui/material';
import { Link } from "react-router-dom";
import React from 'react';
import NavbarMenu from './NavbarMenu';
import Logo from './Logo';
import AuthService from '../../services/auth.service';

const Navbar = ({ currentUser }) => {

    return (
        <>
            <Box>
                <Paper elevation={0} variant="outlined" square sx={{ backgroundColor: 'dark.main' }}>
                    <Container sx={{ my: 1 }}>
                        <Grid container>
                            <Grid item xs={4}>
                                <Logo />
                            </Grid>
                            <Grid item xs={4} >
                                <NavbarMenu />
                            </Grid>
                            <Grid item xs={4}>
                                <Box sx={{ textAlign: 'end' }}>
                                    {currentUser
                                        ?
                                        <Box>
                                            <Button component={Link} to="dashboard" variant='outlined' color='light'>Dashboard</Button>
                                            <Button variant='outlined' color='error' sx={{ ml: 1 }} onClick={() => {
                                                AuthService.logout();
                                                window.location.reload();
                                            }}>Logout</Button>
                                        </Box>
                                        : <Box>
                                            <Button component={Link} to="login" variant='outlined' color='light'>Login</Button>
                                            <Button component={Link} to="signup" variant='outlined' color='warning' sx={{ ml: 1 }}>Signup</Button>
                                        </Box>
                                    }
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Paper>
            </Box>
        </>
    )
}

export default Navbar