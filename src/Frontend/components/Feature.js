import { Box, Grid, Card, Typography, Divider, Chip } from '@mui/material';
import React from 'react'

const Feature = ({ content }) => {

    return <>
        <Grid item xs={4}>
            <Card variant='outlined' sx={{ p: 1 }}>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant='featureTitle'>{content.title}</Typography>
                    <Divider sx={{ color: 'light.main' }}>
                        <Chip label={content.icon} sx={{ fontSize: "1rem" }} />
                    </Divider>
                </Box>
                <Typography variant='featureSubtitle' component='p'>{content.subtitle}</Typography>
            </Card>
        </Grid>
    </>;

}

export default Feature