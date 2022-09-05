import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {ThemeSettings} from "../../../pages/api/mockDatabase/databaseHelpers";

type StepIndicatorProps = {
    children?: React.ReactNode;
    currentStep: number;
    totalSteps: number;
    clientName?: string;
    clientSettings?: ThemeSettings;
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


export const StepIndicator = ({ currentStep, totalSteps, clientName, clientSettings }: StepIndicatorProps) => {
    const stepsArray = Array.from({ length: totalSteps }, (_, i) => i);
    const { stepperCounterStyle } = clientSettings || {};
    return (
        <Box flexGrow={1}>
            {stepperCounterStyle && stepperCounterStyle.position === 'UP' && <Typography variant="body2" color="inherit" align="center">
                Step {currentStep + 1} of {totalSteps}
            </Typography>}
            <Box sx={indicatorWrapper}>
                {stepsArray.map((step, index) => (
                    <Box key={step} sx={{ ...indicatorElement, ...(index <= currentStep && { backgroundColor: 'primary.main' }) }} />
                ))}
            </Box>
            {stepperCounterStyle && stepperCounterStyle.position !== 'UP' && <Typography variant="body2" color="inherit" align="center">
                Step {currentStep + 1} of {totalSteps}
            </Typography>}
        </Box>
    );
};

export default StepIndicator;