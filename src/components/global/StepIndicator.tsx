import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ClientContext from "../../globalContext";

type StepIndicatorProps = {
    children?: React.ReactNode;
    currentStep: number;
    totalSteps: number;
};
const indicatorWrapper = {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
};
const indicatorElement = {
    minWidth: '50px',
    margin: '5px 4px',
    height: '4px',
    backgroundColor: 'gray',
};


export const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
    const stepsArray = Array.from({ length: totalSteps }, (_, i) => i);
    return (
        <ClientContext.Consumer>
            { clientCtx => {
                const { settings: stepperTextSettings, sx:stepperTextSx} = clientCtx.clientSettings?.stepperText || {};
                const { settings: stepperCounterSettings, sx:stepperCounterSx} = clientCtx.clientSettings?.stepperCounter || {};
                return (
                    <Box flexGrow={1}>
                        {stepperTextSettings && stepperTextSettings.position === 'UP' && 
                            <Typography variant="body2" color="inherit" align="center" sx={stepperTextSx}>
                                Step {currentStep + 1} of {totalSteps}
                            </Typography>
                        }
                        <Box sx={indicatorWrapper}>
                            {stepsArray.map((step, index) => (
                                <Box key={step} sx={
                                    { 
                                        ...indicatorElement,
                                        ...stepperCounterSx,
                                        ...(index <= currentStep && { 
                                            backgroundColor: stepperCounterSettings?.selectedColor || 'primary.main' 
                                        })
                                    }
                                } />
                            ))}
                        </Box>
                        {stepperTextSettings && stepperTextSettings.position !== 'UP' && 
                            <Typography variant="body2" color="inherit" align="center">
                                Step {currentStep + 1} of {totalSteps}
                            </Typography>
                        }
                    </Box>
                )
            }}
        </ClientContext.Consumer>
    );
};

export default StepIndicator;