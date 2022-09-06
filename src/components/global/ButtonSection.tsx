import React from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import Box from '@mui/material/Box';
import ClientContext from "../../globalContext";

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
};
export const ButtonSection = ({ onNext, onPrev, canGoNext }: ButtonSectionProps) => {
    
    return (
        <Grid item xs={12}>
            <ClientContext.Consumer>
                { clientCtx => {
                    const { settings: buttonSettings, sx:buttonsSx} = clientCtx.clientSettings?.buttons || {};
                    const { next: nextBtn, prev: prevBtn } = clientCtx.currentStep?.buttons || {};
                    const bothDirections = nextBtn && prevBtn;
                    
                    return (
                        <Box sx={{...boxStyle, justifyContent: bothDirections ? 'space-between' : 'center'}}>
                            {/* PREV BUTTON CONFIGURATION */}
                            {!!prevBtn && 
                                <Button onClick={onPrev} variant={prevBtn?.variant || 'contained'} disableElevation color={prevBtn.color} sx={{...buttonsSx}}>
                                    {prevBtn.icon && buttonSettings?.useIcons && <Icon>{prevBtn.icon}</Icon>}
                                    {prevBtn.label || 'Previous'}
                                </Button>
                            }
                            {/* NEXT BUTTON CONFIGURATION */}
                            {!!nextBtn &&
                                <Button onClick={onNext} disabled={!canGoNext} variant={nextBtn?.variant || 'contained'} disableElevation color={nextBtn.color} sx={{...buttonsSx}}>
                                    {nextBtn.label || 'Next'}
                                    {nextBtn.icon && buttonSettings?.useIcons && <Icon>{nextBtn.icon}</Icon>}
                                </Button>
                            }
                        </Box>
                    );
                }}
            </ClientContext.Consumer>
        </Grid>
    );
};
