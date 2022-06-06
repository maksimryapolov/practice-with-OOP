import * as React from 'react';
import Box from '@mui/material/Box';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dateF from "date-and-time";

export const CustomDatepicker = ({ handler }) => {
    const [value, setValue] = React.useState(new Date());

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label="Custom input"
                inputFormat="MM.Y"
                value={value}
                views={['month', 'year']}
                onChange={(newValue) => {
                    handler(dateF.format(newValue, "MM.YYYY"));
                    setValue(newValue);
                }}
                renderInput={({ inputRef, inputProps, InputProps }) => (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <input ref={inputRef} {...inputProps} className="focus:outline-none w-[50%] border border-gray-300 pl-2 py-1 rounded-md" />
                        {InputProps?.endAdornment}
                    </Box>
                )}
            />
        </LocalizationProvider>
    );
}
