import React from "react";
import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import { IconInfo } from "../../../pages/api/mockDatabase/databaseHelpers";
const iconWrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
}

type StepIconProps = {
    children?: React.ReactNode;
} & { iconInfo: IconInfo };

export default function StepIcon({ iconInfo } : StepIconProps) {
    const { icon, label, color, size = 64 } = iconInfo;
    const iconStyle =  {'&.material-icons': { fontSize: (Number(size)), ...(color && { color }) }};
    
    return (
        <Box sx={iconWrapperStyle}>
            <Icon sx={iconStyle} color="primary" className="material-icons-outlined">{icon}</Icon>
            <Typography variant="subtitle2" color="inherit" component="div" align="center">
                {label}
            </Typography>
        </Box>
    );
}