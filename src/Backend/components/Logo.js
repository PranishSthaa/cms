import { Typography } from '@mui/material';
import { Link } from "react-router-dom";
import React from 'react'

const Logo = () => {
    return (
        <Typography variant='logo' component={Link} to="/dashboard">
            CMS
        </Typography>
    )
}

export default Logo