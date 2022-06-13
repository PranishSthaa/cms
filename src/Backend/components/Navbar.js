import styled from '@emotion/styled';
import { Box, Button, AppBar, Toolbar } from '@mui/material';
import AuthService from "../../services/auth.service";

const NavbarRoot = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.light.main,
    boxShadow: '0px 1px 4px rgba(100, 116, 139, 0.12)',
}));

const Navbar = ({ ...other }) => {

    return (
        <>
            <NavbarRoot sx={{
                left: {
                    lg: 280
                },
                width: {
                    lg: 'calc(100% - 280px)'
                }
            }}
                {...other}>
                <Toolbar
                    disableGutters
                    sx={{
                        minHeight: 64,
                        left: 0,
                        px: 2,
                    }}
                >
                    <Box sx={{ flexGrow: 1 }} />
                    <Button variant='outlined' color='error' sx={{ ml: 1 }} onClick={() => {
                        AuthService.logout();
                        window.location.reload();
                    }}>Logout</Button>
                </Toolbar>
            </NavbarRoot>
            {/* <Box>
                <Paper elevation={0} variant="outlined" square sx={{ backgroundColor: 'dark.main' }}>
                    <Box sx={{ my: 1, mx: 2 }}>
                        <Grid container>
                            <Grid item xs={4}>

                            </Grid>
                            <Grid item xs={4} >

                            </Grid>
                            <Grid item xs={4}>
                                <Box sx={{ textAlign: 'end' }}>
                                    <Button variant='outlined' color='error' sx={{ ml: 1 }} onClick={() => {
                                        AuthService.logout();
                                        window.location.reload();
                                    }}>Logout</Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Box> */}
        </>
    )
}

export default Navbar