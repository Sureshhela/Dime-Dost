'use client';
import React from 'react'
import { TextField } from '@mui/material';
import InputField from '../entities/textfield';
const TextFields: React.FC<InputField>  = ({ inputText, setInputText, setHelperText, error, label, style, type, InputProps }) => {
    const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value;
      if (type === 'number' && parseFloat(value) < 0) {
        value = ''; // Clear the value if it's negative
      }
        setInputText(value);
        setHelperText('');
    }
  return (
    <TextField
        value={inputText}
        onChange={handleChangeText}
        helperText={error}
        error={!!error}
        margin="normal"
        size="small"
        label= {label}
        type= {type}
        InputProps={InputProps}
        autoFocus
        variant="standard"
        className= 'text-inputs border-white rounded'
        InputLabelProps={{ // Apply custom styles to the input label
          style: { fontWeight: 600, color: '#495057', fontSize: '17px' },
        }}
        FormHelperTextProps={{
          style: { margin: 0 },
      }}
        rows={1}
        style={style}
    />
  )
}

export default TextFields;
