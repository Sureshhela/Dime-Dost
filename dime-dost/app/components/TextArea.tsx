'use client'
import React from 'react';
import { TextField } from '@mui/material';
 interface TextAreaInputField {
    inputText: string | number;
    setInputText: (value: string | number) => void ;
    setHelperText: (value: string | number | null) => void;
    error: string | null;
    style: object;
    maxRows: number;
    minRows: number;
    label: string;
}
const TextAreas: React.FC<TextAreaInputField> = ({ inputText, setInputText, setHelperText, error, style, maxRows, minRows, label }) => {
    const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
        setHelperText('');
    }
    return (
        <TextField
            label = {label}
            value={inputText}
            onChange={handleChangeText}
            helperText={error}
            error={!!error}
            margin="normal"
            size="small"
            multiline
            maxRows={maxRows}
            minRows={minRows}
            autoFocus
            className= 'text-inputs border-white rounded'
            InputLabelProps={{
            style: { fontWeight: 600, color: '#495057', fontSize: '17px' },
            }}
            style={style}
        />
    );
};

export default TextAreas;
