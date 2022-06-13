import React from 'react';
import { Container, Box, Card, CardContent, Tooltip, List, ListItem, ListItemText, Typography, IconButton } from '@mui/material';


const Dashboard = () => {
    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth={false}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            m: -1
                        }}>
                        <Typography
                            sx={{ m: 1 }}
                            variant="h4"
                        >
                            Dashboard
                        </Typography>

                    </Box>
                </Container>
                <Box sx={{ mt: 3 }}>
                    <Card>
                        <Box sx={{ minWidth: 1050 }}>
                            <CardContent>
                                <List disablePadding>
                                    <ListItem
                                        divider
                                    >
                                        <ListItemText
                                            primary={"Welcome to CMS Dashboard"}
                                        >
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary={"Use Sidebar for navigation."}
                                        >
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary={"Don't forget to change your password if you are using this for first time."}
                                        >
                                        </ListItemText>
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Box>
                    </Card>
                </Box>
            </Box>
        </>
    )
}

export default Dashboard