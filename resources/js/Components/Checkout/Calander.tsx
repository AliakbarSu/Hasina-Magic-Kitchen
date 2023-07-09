import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateValidationError, DesktopDatePicker } from '@mui/x-date-pickers';

export default function BasicDateCalendar({
    setState,
    setError,
}: {
    setState: (value: string) => void;
    setError: (value: string) => void;
}) {
    const onDateChangeHandler = (value: any) => {
        setState(`${value.$D}-${value.$M}-${value.$y}`);
    };
    const onErrorHandler = (error: DateValidationError) => {
        setError('Please select a valid date');
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* <DateCalendar /> */}
            <DesktopDatePicker
                onError={onErrorHandler}
                label="Order date"
                disablePast
                onChange={onDateChangeHandler}
            />
        </LocalizationProvider>
    );
}
