import { FormEvent, useState } from 'react';
import Nav from '@/Layouts/Nav';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useForm } from '@inertiajs/react';
import { Order } from '@/types/application';
import axios from 'axios';
import { Footer } from '@/Components/UI/Footer';
import { formatNZD } from '@/utils/currentcy';
import { Calander } from '@/Components/Checkout/Calander';
import { AddressInput } from '@/Components/Checkout/AddressInput';
import { PhoneNumberInput } from '@/Components/Checkout/PhoneNumberInput';

const DEV_FEE = 25;
const GST = 0.15;


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
import { CartItem, selectCartTotal } from '@/store/slice/cart';
import { RootState } from '@/store';
import { EmailInput } from '@/Components/Checkout/EmailInput';
import { TimeInput } from '@/Components/Checkout/TimeInput';
import { NameInput } from '@/Components/Checkout/NameInput';
import { NoteInput } from '@/Components/Checkout/NoteInput';

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
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const cartTotal = useSelector(selectCartTotal);

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
            items: cartItems.map(({ id, dishes, numOfPeople }: CartItem) => ({
                menu_id: id,
                dishes: dishes.map(({ id }) => id),
                quantity: numOfPeople
            })),
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



    function calculateGST(price: number) {
        const result = price * GST;
        return result;
    }

    const getTotal = (price: number) => {
        const tax = calculateGST(price);
        return price + tax + DEV_FEE;
    }

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

                        {/* <dl>
                            <dt className="text-sm font-medium">
                                Total Amount
                            </dt>
                            <dd className="mt-1 text-3xl font-bold tracking-tight text-black">
                                ${formatNZD(cartTotal)} NZD
                            </dd>
                        </dl> */}

                        <ul
                            role="list"
                            className="divide-y divide-white divide-opacity-10 text-sm font-medium"
                        >
                            {cartItems.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex items-start space-x-4 py-6"
                                >
                                    <img
                                        src={item.media[0].url}
                                        alt={`Image of ${item.name} menu`}
                                        className="border h-20 w-20 flex-none rounded-md object-cover object-center"
                                    />
                                    <div className="flex-auto space-y-1">
                                        <h3 className="text-black">
                                            {item.name}
                                        </h3>
                                        <p>{item.description}</p>
                                        <p className="text-gray-900 font-extrabold">{`For ${item.numOfPeople} people`}</p>
                                    </div>
                                    <p className="flex-none text-base font-medium text-black">
                                        {formatNZD(item.price)}
                                    </p>
                                </li>
                            ))}
                        </ul>

                        <dl className="space-y-6 border-t border-black border-opacity-10 pt-6 text-sm font-medium">
                            <div className="flex items-center justify-between">
                                <dt>Subtotal</dt>
                                <dd>{formatNZD(cartTotal)}</dd>
                            </div>

                            <div className="flex items-center justify-between">
                                <dt>Shipping</dt>
                                <dd>{formatNZD(DEV_FEE)}</dd>
                            </div>

                            <div className="flex items-center justify-between">
                                <dt>GST</dt>
                                <dd>{formatNZD(calculateGST(cartTotal))}</dd>
                            </div>

                            <div className="flex items-center justify-between border-t border-black border-opacity-10 pt-6 text-black">
                                <dt className="text-base">Total</dt>
                                <dd className="text-base">{formatNZD(getTotal(cartTotal))} NZD</dd>
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
                                    <Calander
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
                                    <PhoneNumberInput
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













