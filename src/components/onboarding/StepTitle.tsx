import React from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { OnboardingStep, ThemeSettings } from "../../../pages/api/mockDatabase/databaseHelpers";

type StepTitleProps = {
    children?: React.ReactNode;
    stepInfo: OnboardingStep | undefined;
    clientSettings: ThemeSettings | undefined;
};

export default function StepTitle({ stepInfo, clientSettings }: StepTitleProps) {
    const { title, subtitle, name } = stepInfo || {};
    const { titleStyle, subTitleStyle } = clientSettings || {};
    return (
        <Grid item xs={12} flexGrow={0}>
            <Box padding='4em 20em 1em'>
                <Typography variant="h4" color="inherit" component="div" align="center" sx={(titleStyle && { ...titleStyle })} gutterBottom>
                    {title || name}
                </Typography>
                <Typography variant="subtitle1" color="inherit" component="div" align="center" sx={(subTitleStyle && { ...subTitleStyle })}>
                    { subtitle}
                </Typography>
            </Box>
        </Grid>
    );
}
