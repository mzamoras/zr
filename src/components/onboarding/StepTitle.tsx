import React from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { OnboardingStep, ThemeSettings } from "../../../pages/api/mockDatabase/databaseHelpers";
import ClientContext from "../../globalContext";

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
            <ClientContext.Consumer>
                { clientCtx  => {
                    const { settings: titleSettings = {}, sx: titleSx = {} } = clientCtx.clientSettings?.title || {};
                    const { settings: subtitleSettings = {}, sx: subtitleSx = {} } = clientCtx.clientSettings?.subtitle || {};
                    return (    
                        <Box padding='4em 20em 1em'>
                        <Typography variant="h4" color="inherit" component="div" align="center" sx={titleSx} gutterBottom>
                            {title || name}
                        </Typography>
                        <Typography variant="subtitle1" color="inherit" component="div" align="center" sx={subtitleSx}>
                            { subtitle}
                        </Typography>
                    </Box>
                    );
                }}
            </ClientContext.Consumer>
        </Grid>
    );
}
