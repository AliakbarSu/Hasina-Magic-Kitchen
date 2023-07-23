import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { TimeValidationError } from '@mui/x-date-pickers';

const fiveAM = dayjs().set('hour', 5).startOf('hour');
const ninePM = dayjs().set('hour', 22).startOf('hour');

export function TimeInput(props: {
    state: string;
    setState: (value: string) => void;
    setError: (value: string) => void;
}) {
    const timeChangeHandler = (value: dayjs.Dayjs | null) => {
        const time = value?.format('HH:MM');
        props.setState(`${time}`);
    };

    const onErrorHandler = (error: TimeValidationError) => {
        if (error === 'minTime' || error === 'maxTime') {
            props.setError('Please select a valid time');
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
                onError={onErrorHandler}
                minTime={fiveAM}
                maxTime={ninePM}
                label="Order time"
                onChange={timeChangeHandler}
            />
        </LocalizationProvider>
    );
}
