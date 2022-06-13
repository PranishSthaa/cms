import React from 'react';
import Hero from '../components/Hero';
import Feature from '../components/Feature';
import { useOutletContext } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import { FaShieldAlt, FaDraftingCompass, FaBoxes } from 'react-icons/fa';


const Home = () => {
    const currentUser = useOutletContext();
    var contents = [{
        id: 1,
        title: "Simple UI",
        subtitle: "The UI is designed in such a way that it can be used by everyone with ease.",
        icon: <FaDraftingCompass />

    },
    {
        id: 2,
        title: "Best Security",
        subtitle: "All your data are secured so security is no longer a concern.",
        icon: <FaShieldAlt />
    },
    {
        id: 3,
        title: "One Stop Solution",
        subtitle: "All of educational institution needs in one app so you don't have to pay for multiple apps.",
        icon: <FaBoxes />
    }];
    return (
        <>
            <Container>
                <Hero currentUser={currentUser} />
                <Grid container spacing={0.5} sx={{ my: 1 }}>
                    {contents.map((content) => {
                        return <Feature key={content.id} content={content} />
                    })}
                </Grid>
            </Container>
        </>
    )
}

export default Home