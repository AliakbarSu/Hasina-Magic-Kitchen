import { ClockIcon } from "@heroicons/react/20/solid";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker, TimePickerProps } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from "dayjs";
import { TimeValidationError } from "@mui/x-date-pickers";

const today = dayjs();
const fiveAM = dayjs().set('hour', 5).startOf('hour');
const ninePM = dayjs().set('hour', 22).startOf('hour');

export function TimeInput(props: {
    state: string;
    setState: (value: string) => void;
    setError: (value: string) => void;
}) {

    const shouldDisableTime: TimePickerProps<Dayjs>['shouldDisableTime'] = (
        value,
        view,
    ) => view === 'hours' && value.hour() >= 20;

    const timeChangeHandler = (value: any) => {
        console.log(value)
        props.setState(`${value.$H}:${value.$m}`)
    }

    const onErrorHandler = (error: TimeValidationError) => {
        if (error === "minTime" || error === "maxTime") {
            props.setError("Please select a valid time")
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker onError={onErrorHandler} minTime={fiveAM} maxTime={ninePM} label="Order time" onAccept={timeChangeHandler} />
        </LocalizationProvider>
    );
}