import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers';

export default function BasicDateCalendar({
    setState,
    setError,
}: {
    setState: (value: string) => void;
    setError: (value: string) => void;
}) {
    const onDateChangeHandler = (value: {
        $D: string;
        $M: string;
        $y: string;
    }) => {
        setState(`${value.$D}-${value.$M}-${value.$y}`);
    };
    const onErrorHandler = () => {
        setError('Please select a valid date');
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* <DateCalendar /> */}
            <DesktopDatePicker
                onError={onErrorHandler}
                label="Order date"
                disablePast
                onChange={(e: unknown) =>
                    onDateChangeHandler(
                        e as {
                            $D: string;
                            $M: string;
                            $y: string;
                        }
                    )
                }
            />
        </LocalizationProvider>
    );
}
