import { Grid, Toolbar } from '@mui/material';
import React from 'react';

export const ViewALayout = ({ children }) => {
    return (
        <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
            { children }
            <Toolbar />
        </Grid>
    )
}
