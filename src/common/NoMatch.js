import React from 'react'
import { Grid, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'

const NoMatch = () => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >

            <Grid item xs={12} >
                <Typography variant='h3'>Page Not Found!</Typography>
            </Grid>
            <Grid item xs={12}>
                <Button component={Link} to="/" variant='outlined' color='dark' sx={{ mt: 1, mx: 'auto' }}>Go Back</Button>
            </Grid>

        </Grid>
    )
}

export default NoMatch