import React from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { IconInfo } from "../../../pages/api/mockDatabase/databaseHelpers";
import StepIcon from "../onboarding/StepIcon";

type IconsSectionProps = {
    children?: React.ReactNode;
    icons?: IconInfo[];
};

const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin: 0,
}

export default function IconsSection ({ icons = [] }: IconsSectionProps) {
    return ( !icons.length ? null :
            <Grid item xs={12}>
                <Box sx={containerStyle}>
                    {(icons || []).map((icon, index) => (
                        <StepIcon key={index} iconInfo={icon}/>
                    ))}
                </Box>
            </Grid>
    );
};
