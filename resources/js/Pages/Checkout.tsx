import { FormEvent, useEffect, useState } from 'react';
import Nav from '@/Layouts/Nav';
import { Footer } from './Home';

import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';




function Checkout() {
    return (
        <>
            <Nav />
            <InfoSection />
            <Footer />
        </>
    );
}

export default Checkout;

import { useSelector } from 'react-redux/es/hooks/useSelector';
import { CartItem } from '@/store/slice/cart';
import { RootState } from '@/store';

function InfoSection() {
    const { setData, data, post } = useForm({
        customer_name: '',
        address: '',
        date: '',
        time: '',
        phone: 0,
        email: '',
        note: ''
    })
    const [isPickup, setIsPickup] = useState(false);
    const elements = useElements();
    const stripe = useStripe();
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleError = (error: Error) => {
        setLoading(false);
        setErrorMessage(error.message);
    }

    const formHandler = async (e: FormEvent) => {
        e.preventDefault();
        if (!stripe) {
            return;
        }

        setLoading(true);

        const submittedElements = await elements?.submit();
        if (submittedElements?.error) {
            handleError(submittedElements.error as unknown as Error);
            return;
        }

        const order: Order = {
            customer_name: data.customer_name,
            phone: data.phone,
            email: data.email,
            address: data.address,
            date: data.date,
            time: data.time,
            note: data.note,
            items: [{
                menu_id: "999265ff-5e4d-43df-ac5b-fc5e10d9c4f1",
                dishes: ["999265ff-5c61-42ec-9d43-bf1ed9bd6b7b"],
                quantity: 150
            }],
            addons: []
        }
        if (!elements) return
        try {
            const { data } = await axios.post(route('order.add'), order);
            const paymentMethod = await stripe?.createPaymentMethod({
                elements
            })
            const result = await stripe?.confirmCardPayment(data.client_secret, {
                payment_method: paymentMethod?.paymentMethod?.id,
            },)
            console.log(result)

        } finally {
            setLoading(false)
        }



    };

    const cartItems = useSelector((state: RootState) => state.cart.items);

    return (
        <div className="bg-white relative">
            {/* Background color split screen for large screens */}

            <div
                className="absolute left-0 top-0 hidden h-full w-1/2 bg-white lg:block"
                aria-hidden="true"
            />
            <div
                className="absolute right-0 top-0 hidden h-full w-1/2 bg-gray-100 lg:block"
                aria-hidden="true"
            />

            <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 lg:pt-16">
                <h1 className="sr-only">Checkout</h1>

                <section
                    aria-labelledby="summary-heading"
                    className="bg-gray-100 py-12 text-gray-500 md:px-10 lg:col-start-2 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:bg-transparent lg:px-0 lg:pb-24 lg:pt-0"
                >
                    <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                        <h2 id="summary-heading" className="sr-only">
                            Order summary
                        </h2>

                        <dl>
                            <dt className="text-sm font-medium">
                                Total Amount
                            </dt>
                            <dd className="mt-1 text-3xl font-bold tracking-tight text-black">
                                $642.60
                            </dd>
                        </dl>

                        <ul
                            role="list"
                            className="divide-y divide-white divide-opacity-10 text-sm font-medium"
                        >
                            {cartItems.map((product: CartItem) => (
                                <li
                                    key={product.id}
                                    className="flex items-start space-x-4 py-6"
                                >
                                    <img
                                        src={product.image}
                                        alt={`Image of ${product.name} menu`}
                                        className="border h-20 w-20 flex-none rounded-md object-cover object-center"
                                    />
                                    <div className="flex-auto space-y-1">
                                        <h3 className="text-black">
                                            {product.name}
                                        </h3>
                                        <p>{product.description}</p>
                                        <p className="text-gray-900 font-extrabold">{`For ${product.numOfPeople} people`}</p>
                                    </div>
                                    <p className="flex-none text-base font-medium text-black">
                                        ${product.price}
                                    </p>
                                </li>
                            ))}
                        </ul>

                        <dl className="space-y-6 border-t border-black border-opacity-10 pt-6 text-sm font-medium">
                            <div className="flex items-center justify-between">
                                <dt>Subtotal</dt>
                                <dd>$570.00</dd>
                            </div>

                            <div className="flex items-center justify-between">
                                <dt>Shipping</dt>
                                <dd>$25.00</dd>
                            </div>

                            <div className="flex items-center justify-between">
                                <dt>Taxes</dt>
                                <dd>$47.60</dd>
                            </div>

                            <div className="flex items-center justify-between border-t border-black border-opacity-10 pt-6 text-black">
                                <dt className="text-base">Total</dt>
                                <dd className="text-base">$642.60</dd>
                            </div>
                        </dl>
                    </div>
                    <div className='mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0 mt-6'>
                        <PaymentElement />
                    </div>
                </section>

                <section
                    aria-labelledby="payment-and-shipping-heading"
                    className="py-16 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:pb-24 lg:pt-0"
                >
                    <h2 id="payment-and-shipping-heading" className="sr-only">
                        Delivery details
                    </h2>

                    <form onSubmit={formHandler}>
                        <div className="@container mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0 flex flex-col gap-3.5">
                            {/* Content goes here */}
                            {/* <InfoTab /> */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">
                                    Delivery date & time
                                </h3>

                                <div className="mt-6 flex flex-col gap-3.5">
                                    <DateCalender
                                        state={data.date}
                                        setState={(date) => setData('date', date)}
                                    />
                                    <TimeInput
                                        state={data.time}
                                        setState={(time) => setData('time', time)}
                                    />
                                    <div className="mt-2">
                                        <input
                                            id="same-as-shipping"
                                            name="same-as-shipping"
                                            type="checkbox"
                                            checked={isPickup}
                                            onChange={() =>
                                                setIsPickup(isPickup)
                                            }
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <label
                                            htmlFor="same-as-shipping"
                                            className="ml-2 text-md font-medium text-blue-600"
                                        >
                                            I want to pick up
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h3 className="text-lg font-medium text-gray-900">
                                    Personal information
                                </h3>

                                <div className="mt-6 flex flex-col gap-3.5">
                                    <NameInput
                                        state={data.customer_name}
                                        setState={name => setData('customer_name', name)}
                                    />
                                    <MobileNumInput
                                        state={data.phone as unknown as string}
                                        setState={number => setData('phone', number as unknown as number)}
                                    />
                                    <EmailInput
                                        state={data.email}
                                        setState={email => setData('email', email)}
                                    />
                                    <AddressInput setState={address => setData('address', address)} />
                                    <NoteInput
                                        state={data.note}
                                        setState={note => setData('note', note)}
                                    />
                                </div>
                            </div>

                            <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
                                <button
                                    type="submit"
                                    className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                >
                                    Pay now
                                </button>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
}

// ----------------------------------------------------------------

function MobileNumInput(props: {
    state: string;
    setState: (value: string) => void;
}) {
    return (
        <div>
            <label
                htmlFor="mobile-number"
                className="block text-sm font-medium text-gray-700"
            >
                Mobile Number
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center">
                    <label htmlFor="country" className="sr-only">
                        Country
                    </label>
                    <select
                        id="country"
                        name="country"
                        autoComplete="country"
                        className="h-full rounded-md border-transparent bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        <option>+64</option>
                    </select>
                </div>
                <input
                    value={props.state}
                    onChange={(e) => props.setState(e.target.value)}
                    type="text"
                    name="mobile-number"
                    id="mobile-number"
                    className="block w-full rounded-md border-gray-300 pl-16 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="(555) 987-6543"
                />
            </div>
        </div>
    );
}

import { EnvelopeIcon } from '@heroicons/react/20/solid';
function EmailInput(props: {
    state: string;
    setState: (value: string) => void;
}) {
    return (
        <div>
            <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
            >
                Email
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <EnvelopeIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                </div>
                <input
                    value={props.state}
                    onChange={(e) => props.setState(e.target.value)}
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="you@example.com"
                />
            </div>
        </div>
    );
}
interface Address {
    address1: string;
    suburb: string;
    city: string;
    postCode: string;
}

function AddressInput(props: { setState: (value: string) => void }) {
    const [address1, setAddress1] = useState('');
    const [suburb, setSuburb] = useState('');
    const [city, setCity] = useState('Auckland');
    const [postCode, setPostCode] = useState('');
    const [error, setError] = useState('');
    const [hasError, setHasError] = useState(false);


    let timeout: any;
    var debounce = function (func: () => Promise<void>, delay: number) {
        clearTimeout(timeout);
        timeout = setTimeout(func, delay);
    };


    useEffect(() => {
        const address = {
            address1,
            suburb,
            city,
            postCode,
        };
        debounce(() => axios.post('/api/validate/address', {
            address: `${address1}, ${suburb}`
        }).then(result => {
            const isValid = result.data.validation_result
            setHasError(!isValid)
            if (!isValid) {
                setError('Invalid address');
            } else {
                setError('')
            }
        }), 200);

        props.setState(`${address.address1}, ${address.suburb}`);
    }, [address1, suburb, city, postCode]);

    return (
        <div>
            <fieldset>
                <legend className="block text-sm font-medium text-gray-700">
                    Delivery Address
                </legend>
                <div className="mt-1 -space-y-px rounded-md bg-white shadow-sm">
                    <div>
                        <label htmlFor="address" className="sr-only">
                            Address Line 1
                        </label>
                        <input
                            value={address1}
                            onChange={({ target }) => setAddress1(target.value)}
                            type="text"
                            name="address"
                            id="address"
                            className="relative block w-full rounded-none rounded-t-md border-gray-300 bg-transparent focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Address Line 1"
                        />
                    </div>
                    <div>
                        <label htmlFor="suburb" className="sr-only">
                            Suburb
                        </label>
                        <input
                            value={suburb}
                            onChange={({ target }) => setSuburb(target.value)}
                            type="text"
                            name="suburb"
                            id="suburb"
                            className="relative block w-full rounded-none border-gray-300 bg-transparent focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Suburb"
                        />
                    </div>
                    <div className="flex -space-x-px">
                        <div className="w-1/2 min-w-0 flex-1">
                            <label htmlFor="city" className="sr-only">
                                City
                            </label>
                            <input
                                disabled
                                onChange={({ target }) => setCity(target.value)}
                                value={city}
                                type="text"
                                name="city"
                                id="city"
                                className="relative block w-full rounded-none rounded-bl-md border-gray-300 bg-gray-100 text-gray-400 sm:text-sm"
                                placeholder="Auckland"
                            />
                        </div>
                        <div className="min-w-0 flex-1">
                            <label htmlFor="postcode" className="sr-only">
                                Postcode
                            </label>
                            <input
                                value={postCode}
                                onChange={({ target }) => setPostCode(target.value)}
                                type="text"
                                name="postcode"
                                id="postcode"
                                className="relative block w-full rounded-none rounded-br-md border-gray-300 bg-transparent focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Postcode"
                            />
                        </div>
                    </div>

                </div>
                {hasError && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-2 ml-1">
                    {error}
                </span>}
            </fieldset>
        </div>
    );
}

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';



type CalendarDate = {
    date: string,
    isCurrentMonth?: boolean,
    isToday?: boolean,
    isSelected?: boolean
    isDisabled?: boolean
}
function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}
function DateCalender(props: {
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
                isToday: day === today && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear(),
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

import { ClockIcon } from '@heroicons/react/24/solid';
import { useForm } from '@inertiajs/react';
import { Order } from '@/types/application';
import axios from 'axios';
export function TimeInput(props: {
    state: string;
    setState: (value: string) => void;
}) {
    return (
        <div>
            <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                Time
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <ClockIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                </div>
                <input
                    value={props.state}
                    onChange={(e) => props.setState(e.target.value)}
                    type="time"
                    name="time"
                    id="time"
                    className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Select time"
                />
            </div>
        </div>
    );
}

export function NoteInput(props: {
    state: string;
    setState: (value: string) => void;
}) {
    return (
        <>
            <div>
                <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-700"
                >
                    Note
                </label>
                <div className="mt-2">
                    <textarea
                        value={props.state}
                        onChange={(e) => props.setState(e.target.value)}
                        id="about"
                        name="about"
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={''}
                    />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                    Anything we should know? tell us!
                </p>
            </div>
        </>
    );
}

function NameInput(props: {
    state: string;
    setState: (value: string) => void;
}) {
    return (
        <div>
            <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                Name
            </label>
            <div className="mt-2">
                <input
                    value={props.state}
                    onChange={(e) => props.setState(e.target.value)}
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
        </div>
    );
}
