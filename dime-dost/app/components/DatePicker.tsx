import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

const MyDatePicker = () => {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Select Date"
        value={selectedDate}
        onChange={(newValue) => setSelectedDate(newValue)}
        slotProps={{ textField: { fullWidth: true } }} // Use slotProps instead of renderInput
      />
    </LocalizationProvider>
  );
};

export default MyDatePicker;
