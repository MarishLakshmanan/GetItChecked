import React from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';
import { requiredDocuments } from '@/contants/main';


const options = Object.keys(requiredDocuments)


export default function SelectDropdownWithSearch({ onChange }) {
  return (
    <Box className="w-full ">
      <Autocomplete 
        options={options}
        disablePortal
        onChange={(event, value) => onChange?.(value)}
        renderInput={(params) => (
          <TextField {...params} label="Select a Service" variant="outlined"  />
        )}

        sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#60a5fabf'
              }
            },
            '& .MuiInputBase-root::placeholder': {
            color: '#60a5fabf'
          },
          }}
        filterSelectedOptions
      />
    </Box>
  );
}
