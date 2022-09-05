import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import { ControlInfo } from "../../../pages/api/mockDatabase/databaseHelpers";

type CustomInputProps = {
    children?: React.ReactNode;
    control: {
        autoFocus?: boolean;
    } & ControlInfo;
    onChange: (event: React.ChangeEvent<HTMLInputElement>, isValid: boolean) => void;
};

export default function CustomInput({ control, onChange }: CustomInputProps) {
    const { validation, type, name, label, placeholder, helperText, autoFocus, defaultValue } = control;
    const [ val, setVal ] = useState('');
    function handleChange (event: React.ChangeEvent<HTMLInputElement>) : void {
        if ( validation) {
            const { value } = event.target;
            const { required, min, max, minLength, maxLength, pattern } = control?.validation || {};
            const isValidMin = !!min && type === 'number' ? Number(value) >= Number(min) : true;
            const isValidMax = !!max && type === 'number' ? Number(value) <= Number(max) : true;
            const isValidMinLength = !!minLength ? value.length >= Number(minLength) : true;
            const isValidMaxLength = !!maxLength ? value.length <= Number(maxLength) : true;
            const isValidPattern = !!pattern ? new RegExp(pattern).test(value) : true;
            const isValidRequired = !!required ? value.length > 0 : true;
            const isValid = isValidMin && isValidMax && isValidMinLength && isValidMaxLength && isValidPattern && isValidRequired;

            //if (isValidMin && isValidMax && isValidMinLength && isValidMaxLength && isValidPattern && isValidRequired) {
            onChange(event, isValid);
            //}
            if (isValidPattern && isValidMaxLength) {
                setVal(value);
            }

        } else {
            onChange(event, true);
        }
    };

    return (
        <TextField
            autoFocus={autoFocus}
            type={type}
            variant="outlined"
            label={label}
            name={name}
            placeholder={placeholder}
            InputLabelProps={{
                shrink: true,
            }}
            value={val}
            onChange={handleChange}
            helperText={helperText} />
    )
};