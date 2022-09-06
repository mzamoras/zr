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
} & { 
    iconInfo: IconInfo,
    iconSettings: { [key:string]: string } | undefined,
    iconSx: { [key:string]: string } | undefined,
};

export default function StepIcon({ iconInfo, iconSettings, iconSx } : StepIconProps) {
    const { icon, label, color, size = 64, className = 'material-icons' } = iconInfo;
    const iconStyle =  {'&.material-icons': { fontSize: (Number(size)), ...(color && { color }) }};
    
    return (
        <Box sx={iconWrapperStyle}>
            <Icon sx={{...iconStyle, ...(iconSx && { iconSx })}} color="primary" className={className}>{icon}</Icon>
            <Typography variant="subtitle2" color="inherit" component="div" align="center">
                {label}
            </Typography>
        </Box>
    );
}