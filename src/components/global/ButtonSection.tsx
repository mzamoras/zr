import React from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import Box from '@mui/material/Box';
import { ScreenButtons, ThemeSettings } from "../../../pages/api/mockDatabase/databaseHelpers";

const boxStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 8rem',
}

type ButtonSectionProps = {
    onNext: (e: React.SyntheticEvent) => void;
    onPrev: (e: React.SyntheticEvent) => void;
    canGoNext: boolean;
    buttons?: ScreenButtons;
    clientSettings?: ThemeSettings

};
export const ButtonSection = ({ onNext, onPrev, buttons, canGoNext, clientSettings }: ButtonSectionProps) => {
    const bothDirections = buttons?.prev && buttons?.next;
    const { sx, useIcons } = clientSettings?.buttons || {};

    return (
        <Grid item xs={12}>
            <Box sx={{...boxStyle, justifyContent: bothDirections ? 'space-between' : 'center'}}>
                {/* PREV BUTTON CONFIGURATION */}
                {!!buttons?.prev && 
                    <Button onClick={onPrev} variant="contained" disableElevation sx={sx}>
                        {buttons.prev.icon && useIcons && <Icon>{buttons.prev.icon}</Icon>}
                        {buttons.prev.label || 'Previous'}
                    </Button>
                }
                {/* NEXT BUTTON CONFIGURATION */}
                {!!buttons?.next &&
                    <Button onClick={onNext} disabled={!canGoNext} variant="contained" disableElevation sx={sx}>
                        {buttons.next.label || 'Next'}
                        {buttons.next.icon && useIcons && <Icon>{buttons.next.icon}</Icon>}
                    </Button>
                }
            </Box>
        </Grid>
    );
};
