import React from 'react';
import { Box, Button, ListItem } from '@mui/material';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

const NavItem = ({ href, icon, title, ...others }) => {
    let resolved = useResolvedPath(href);
    let active = useMatch({ path: resolved.pathname, end: true });

    return (
        <ListItem
            disableGutters
            sx={{
                display: 'flex',
                mb: 0.5,
                py: 0,
                px: 2
            }}
            {...others}
        >
            <Button
                component={Link}
                to={href}
                startIcon={icon}
                disableRipple
                sx={{
                    backgroundColor: active && 'rgba(255,255,255, 0.08)',
                    borderRadius: 1,
                    color: active ? 'secondary.main' : 'light.main',
                    fontWeight: active && 'fontWeightBold',
                    justifyContent: 'flex-start',
                    px: 3,
                    textAlign: 'left',
                    textTransform: 'none',
                    width: '100%',
                    '& .MuiButton-startIcon': {
                        color: active ? 'secondary.main' : 'light.main'
                    },
                    '&:hover': {
                        backgroundColor: 'rgba(255,255,255, 0.08)'
                    }
                }}
            >
                <Box sx={{ flexGrow: 1 }}>
                    {title}
                </Box>
            </Button>
        </ListItem>
    )
}

export default NavItem