import { FormEvent, useEffect, useState } from 'react';
import Nav from '@/Layouts/Nav';
import { Footer } from './Home';

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

const products = [
    {
        id: 1,
        name: 'High Wall Tote',
        href: '#',
        price: '$210.00',
        color: 'White and black',
        size: '15L',
        imageSrc:
            'https://tailwindui.com/img/ecommerce-images/checkout-page-07-product-01.jpg',
        imageAlt:
            'Front of zip tote bag with white canvas, white handles, and black drawstring top.',
    },
    // More products...
];
function InfoSection() {
    const [isPickup, setIsPickup] = useState(false);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');

    const [address, setAddress] = useState({
        address1: '',
        suburb: '',
        city: '',
        postCode: '',
    });
    const [note, setNote] = useState('');

    const formHandler = (e: FormEvent) => {
        e.preventDefault();

        const formData = {
            isPickup,
            date,
            time,
            name,
            number,
            address,
            note,
        };
    };

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
                            {products.map((product) => (
                                <li
                                    key={product.id}
                                    className="flex items-start space-x-4 py-6"
                                >
                                    <img
                                        src={product.imageSrc}
                                        alt={product.imageAlt}
                                        className="border h-20 w-20 flex-none rounded-md object-cover object-center"
                                    />
                                    <div className="flex-auto space-y-1">
                                        <h3 className="text-black">
                                            {product.name}
                                        </h3>
                                        <p>{product.color}</p>
                                        <p>{product.size}</p>
                                    </div>
                                    <p className="flex-none text-base font-medium text-black">
                                        {product.price}
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
                </section>

                <section
                    aria-labelledby="payment-and-shipping-heading"
                    className="py-16 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:pb-24 lg:pt-0"
                >
                    <h2 id="payment-and-shipping-heading" className="sr-only">
                        Delivery details
                    </h2>

                    <form>
                        <div className="@container mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0 flex flex-col gap-3.5">
                            {/* Content goes here */}
                            {/* <InfoTab /> */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">
                                    Delivery date & time
                                </h3>

                                <div className="mt-6 flex flex-col gap-3.5">
                                    <DateCalender
                                        state={date}
                                        setState={setDate}
                                    />
                                    <TimeInput
                                        state={time}
                                        setState={setTime}
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
                                        state={name}
                                        setState={setName}
                                    />
                                    <MobileNumInput
                                        state={number}
                                        setState={setNumber}
                                    />
                                    <EmailInput
                                        state={email}
                                        setState={setEmail}
                                    />
                                    <AddressInput setState={setAddress} />
                                    <NoteInput
                                        state={note}
                                        setState={setNote}
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
                    onChange={() => props.setState(props.state)}
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
                    onChange={() => props.setState(props.state)}
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

function AddressInput(props: { setState: (value: Address) => void }) {
    const [address1, setAddress1] = useState('');
    const [suburb, setSuburb] = useState('');
    const [city, setCity] = useState('Auckland');
    const [postCode, setPostCode] = useState('');

    useEffect(() => {
        const address = {
            address1,
            suburb,
            city,
            postCode,
        };
        props.setState(address);
    }, []);

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
                            onChange={() => setAddress1(address1)}
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
                            onChange={() => setSuburb(suburb)}
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
                                onChange={() => setCity(city)}
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
                                onChange={() => setPostCode(postCode)}
                                type="text"
                                name="postcode"
                                id="postcode"
                                className="relative block w-full rounded-none rounded-br-md border-gray-300 bg-transparent focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Postcode"
                            />
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>
    );
}

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
const days = [
    { date: '2021-12-27' },
    { date: '2021-12-28' },
    { date: '2021-12-29' },
    { date: '2021-12-30' },
    { date: '2021-12-31' },
    { date: '2022-01-01', isCurrentMonth: true },
    { date: '2022-01-02', isCurrentMonth: true },
    { date: '2022-01-03', isCurrentMonth: true },
    { date: '2022-01-04', isCurrentMonth: true },
    { date: '2022-01-05', isCurrentMonth: true },
    { date: '2022-01-06', isCurrentMonth: true },
    { date: '2022-01-07', isCurrentMonth: true },
    { date: '2022-01-08', isCurrentMonth: true },
    { date: '2022-01-09', isCurrentMonth: true },
    { date: '2022-01-10', isCurrentMonth: true },
    { date: '2022-01-11', isCurrentMonth: true },
    { date: '2022-01-12', isCurrentMonth: true, isToday: true },
    { date: '2022-01-13', isCurrentMonth: true },
    { date: '2022-01-14', isCurrentMonth: true },
    { date: '2022-01-15', isCurrentMonth: true },
    { date: '2022-01-16', isCurrentMonth: true },
    { date: '2022-01-17', isCurrentMonth: true },
    { date: '2022-01-18', isCurrentMonth: true },
    { date: '2022-01-19', isCurrentMonth: true },
    { date: '2022-01-20', isCurrentMonth: true },
    { date: '2022-01-21', isCurrentMonth: true },
    { date: '2022-01-22', isCurrentMonth: true, isSelected: true },
    { date: '2022-01-23', isCurrentMonth: true },
    { date: '2022-01-24', isCurrentMonth: true },
    { date: '2022-01-25', isCurrentMonth: true },
    { date: '2022-01-26', isCurrentMonth: true },
    { date: '2022-01-27', isCurrentMonth: true },
    { date: '2022-01-28', isCurrentMonth: true },
    { date: '2022-01-29', isCurrentMonth: true },
    { date: '2022-01-30', isCurrentMonth: true },
    { date: '2022-01-31', isCurrentMonth: true },
    { date: '2022-02-01' },
    { date: '2022-02-02' },
    { date: '2022-02-03' },
    { date: '2022-02-04' },
    { date: '2022-02-05' },
    { date: '2022-02-06' },
];
function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}
function DateCalender(props: {
    state: string;
    setState: (value: string) => void;
}) {
    return (
        <div className="text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 xl:col-start-9">
            <div className="flex items-center text-gray-900">
                <button
                    type="button"
                    className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                    <span className="sr-only">Previous month</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <div className="flex-auto text-sm font-semibold">January</div>
                <button
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
                        key={day.date}
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
                            dayIdx === days.length - 1 && 'rounded-br-lg'
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
                            {day.date.split('-')?.pop()?.replace(/^0/, '')}
                        </time>
                    </button>
                ))}
            </div>
        </div>
    );
}

import { ClockIcon } from '@heroicons/react/24/solid';
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
                    onChange={() => props.setState(props.state)}
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
                        onChange={() => props.setState(props.state)}
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
                    onChange={() => props.setState(props.state)}
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
