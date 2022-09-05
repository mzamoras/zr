import React, { ChangeEvent } from "react";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { ControlInfo } from "../../../pages/api/mockDatabase/databaseHelpers";
import { CustomSelect } from "./CustomSelect";
import CustomInput from "./CustomInput";
import { Item } from "./Item";

type ControlsSectionProps = {
    children?: React.ReactNode;
    controls?: ControlInfo[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>, isValid?: boolean) => void;
};
export const ControlsSection = ({ controls, onChange }: ControlsSectionProps) => {
    return (
        <Grid item xs={12}>
            {controls?.map((control, index) => {
                const { type } = control;
                const isTextOrNumber = type === 'text' || type === 'number'
                return (
                    <Item key={index}>
                        {isTextOrNumber ?
                            <CustomInput control={control} onChange={onChange} /> :
                            <CustomSelect control={control} onChange={onChange} />}
                    </Item>
                );
            })}
        </Grid>
    );
};
