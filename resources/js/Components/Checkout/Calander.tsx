import { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { classNames } from '@/utils/classNames';

type CalendarDate = {
    date: string,
    isCurrentMonth?: boolean,
    isToday?: boolean,
    isSelected?: boolean
    isDisabled?: boolean
}

export function Calander(props: {
    state: string;
    setState: (value: string) => void;
}) {

    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [days, setDays] = useState<CalendarDate[]>([]);

    const onDateClick = (date: string) => {
        props.setState(date)
    }

    const onIncrementMonth = () => {
        setCurrentMonth(currentMonth => currentMonth + 1);
    }
    const onDecrementMonth = () => {
        setCurrentMonth(currentMonth => currentMonth - 1);
    }

    const getMonthName = (monthNumber: number) => {
        const date = new Date();
        date.setMonth(monthNumber - 1);
        const monthName = date.toLocaleString('default', { month: 'long' });
        return monthName;
    }
    const compareDates = (dateString1: string, dateString2: string) => {
        const date1 = new Date(dateString1).getTime();
        const date2 = new Date(dateString2).getTime();
        return date1 < date2
    }


    const getMonthDays = (month: number) => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = month || currentDate.getMonth();
        const today = currentDate.getDate();

        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        const arrayOfObjects = [];

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentYear, currentMonth, day);

            const object = {
                date: date.toLocaleDateString('en-NZ'),
                isCurrentMonth: true,
                isToday: day === today && currentMonth === currentDate.getMonth() + 1 && currentYear === currentDate.getFullYear(),
                isSelected: false,
                isDisabled: compareDates(date.toString(), currentDate.toString())
            };

            arrayOfObjects.push(object);
        }

        return arrayOfObjects;
    }

    useEffect(() => {
        setDays(getMonthDays(currentMonth))
    }, [currentMonth])



    return (
        <div className="text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 xl:col-start-9">
            <div className="flex items-center text-gray-900">
                <button
                    onClick={onDecrementMonth}
                    type="button"
                    className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                    <span className="sr-only">Previous month</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <div className="flex-auto text-sm font-semibold">{getMonthName(currentMonth)}</div>
                <button
                    onClick={onIncrementMonth}
                    type="button"
                    className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                    <span className="sr-only">Next month</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
            </div>
            <div className="mt-4 grid grid-cols-7 text-xs leading-6 text-gray-500">
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
                <div>S</div>
            </div>
            <div className="isolate mt-1 grid grid-cols-7 gap-px rounded-lg border border-gray-300 bg-gray-200 text-sm shadow-sm">
                {days.map((day, dayIdx) => (
                    <button
                        onClick={() => onDateClick(day.date)}
                        key={day.date}
                        disabled={day.isDisabled}
                        type="button"
                        className={classNames(
                            'py-1.5 hover:bg-gray-100 focus:z-10',
                            day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                            (day.isSelected || day.isToday) && 'font-semibold',
                            day.isSelected && 'text-white',
                            !day.isSelected &&
                            day.isCurrentMonth &&
                            !day.isToday &&
                            'text-gray-900',
                            !day.isSelected &&
                            !day.isCurrentMonth &&
                            !day.isToday &&
                            'text-gray-400',
                            day.isToday && !day.isSelected && 'text-indigo-600',
                            dayIdx === 0 && 'rounded-tl-lg',
                            dayIdx === 6 && 'rounded-tr-lg',
                            dayIdx === days.length - 7 && 'rounded-bl-lg',
                            dayIdx === days.length - 1 && 'rounded-br-lg',
                            day.isDisabled && 'cursor-not-allowed opacity-25'
                        )}
                    >
                        <time
                            dateTime={day.date}
                            className={classNames(
                                'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                                day.isSelected &&
                                day.isToday &&
                                'bg-indigo-600',
                                day.isSelected && !day.isToday && 'bg-gray-900'
                            )}
                        >
                            {day.date.split('/')[0]?.replace(/^0/, '')}
                        </time>
                    </button>
                ))}
            </div>
        </div >
    );
}