import React from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { IconInfo } from "../../../pages/api/mockDatabase/databaseHelpers";
import StepIcon from "../onboarding/StepIcon";
import ClientContext from "../../globalContext";

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
                <ClientContext.Consumer>
                    { clientCtx  => {
                        const { settings: iconSettings, sx:iconSx} = clientCtx.clientSettings?.icons || {};
                        return (
                            <Box sx={containerStyle}>
                                {(icons || []).map((icon, index) => (
                                    <StepIcon key={index} iconInfo={icon} iconSettings={iconSettings} iconSx={iconSx}/>
                                ))}
                            </Box>
                        );
                    }}
                </ClientContext.Consumer>
            </Grid>
    );
};
