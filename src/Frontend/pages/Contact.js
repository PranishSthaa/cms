import React from 'react';
import { Typography, Container, Grid, Paper, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import { FaEnvelope, FaGithub, FaPhoneAlt } from 'react-icons/fa';
import ContactForm from '../components/ContactForm';

const Contact = () => {
    const contactData = [
        {
            id: 1,
            icon: <FaEnvelope />,
            text: "pranish99912@gmail.com",
        },
        {
            id: 2,
            icon: <FaPhoneAlt />,
            text: "+977-980-826-9836",
        },
        {
            id: 3,
            icon: <FaGithub />,
            text: "PranishSthaa"
        }
    ];
    return (
        <>
            <Container sx={{ my: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xs={7}>
                        <Paper variant='outlined' sx={{ p: 1 }}>
                            <Typography variant='h3' component='h1' sx={{ mb: 1 }}>Get In Touch</Typography>
                            {contactData.map((data) => {
                                return <ListItemButton key={data.id}>
                                    <ListItemIcon sx={{ color: 'dark.main' }}>
                                        {data.icon}
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Typography variant='featureSubtitle' component='p'>{data.text}</Typography>
                                    </ListItemText>
                                </ListItemButton>
                            })}
                        </Paper>
                    </Grid>
                    <Grid item xs={5}>
                        <ContactForm />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Contact