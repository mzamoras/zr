import React, { ChangeEvent } from "react";
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import { ControlInfo } from "../../../pages/api/mockDatabase/databaseHelpers";

type CustomSelectProps = {
    children?: React.ReactNode;
    control?: ControlInfo;
    onChange: (event: React.ChangeEvent<HTMLInputElement>, isValid: boolean) => void;
};
export const CustomSelect = ({ control, onChange }: CustomSelectProps) => {
    function handleOnChange(event: SelectChangeEvent) {
        onChange(event as React.ChangeEvent<HTMLInputElement>, true);
    }
    return (
        <FormControl>
            <InputLabel id="demo-simple-select-helper-label">{control?.label}</InputLabel>
            <Select label={control?.label} onChange={handleOnChange} defaultValue='' name={control?.name}>
                {control?.options.map((option, index) => {
                    return (
                        <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                    );
                })}
            </Select>
            <FormHelperText>{control?.helperText}</FormHelperText>
        </FormControl>
    );
};
