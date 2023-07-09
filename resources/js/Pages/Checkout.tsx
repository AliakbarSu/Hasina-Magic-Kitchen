import { FormEvent, useState } from 'react';
import Nav from '@/Layouts/Nav';
import {
    PaymentElement,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js';
import { Head, router, useForm } from '@inertiajs/react';
import { Order } from '@/types/application';
import axios from 'axios';
import { Footer } from '@/Components/UI/Footer';
import { formatNZD } from '@/utils/currentcy';
import Calander from '@/Components/Checkout/Calander';
import { AddressInput } from '@/Components/Checkout/AddressInput';
import { PhoneNumberInput } from '@/Components/Checkout/PhoneNumberInput';
import { z } from 'zod';
import OrderFailed from '@/Components/Checkout/OrderFailed';

const DEV_FEE = 25;
const GST = 0.15;

function Checkout() {
    return (
        <>
            <Head title="Checkout" />
            <Nav />
            <InfoSection />
            <Footer />
        </>
    );
}

export default Checkout;

import { useSelector } from 'react-redux/es/hooks/useSelector';
import { CartItem, clearCart, selectCartTotal } from '@/store/slice/cart';
import { RootState } from '@/store';
import { EmailInput } from '@/Components/Checkout/EmailInput';
import { TimeInput } from '@/Components/Checkout/TimeInput';
import { NameInput } from '@/Components/Checkout/NameInput';
import { NoteInput } from '@/Components/Checkout/NoteInput';
import { classNames } from '@/utils/classNames';
import { useDispatch } from 'react-redux';

function InfoSection() {
    const { setData, data, post, errors, setError, clearErrors } = useForm({
        customer_name: '',
        address: '',
        date: '',
        time: '',
        phone: 0,
        email: '',
        note: '',
    });
    const elements = useElements();
    const stripe = useStripe();
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState('');
    const [orderFailedModal, setOrderFailedModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const cartTotal = useSelector(selectCartTotal);
    const cartAddons = useSelector((state: RootState) => state.cart.addons);

    const formSchema = z.object({
        customer_name: z.string().min(2).max(20),
        address: z.string().min(5).max(80),
        date: z.string().min(8).max(10),
        time: z.string().min(4).max(5),
        phone: z.string().min(6).max(14),
        email: z.string().email(),
        note: z.string().max(600).optional(),
    });

    const errorMessages = {
        customer_name:
            'Name is required and should be 2 to 20 characters long.',
        address: 'Address is required and must be valid.',
        date: 'Date is required.',
        time: 'Time is required.',
        phone: 'Mobile number is required and must be valid.',
        email: 'Email is required and must be valid.',
        note: 'Note should not exceed 600 characters',
    };

    const handleError = (error: Error) => {
        setLoading(false);
        setErrorMessage(error.message);
    };

    const formHandler = async (e: FormEvent) => {
        e.preventDefault();
        if (!stripe) {
            return;
        }

        const submittedElements = await elements?.submit();

        // Do validation here
        clearErrors();
        const results = formSchema.safeParse({ ...data });
        if (!results.success) {
            results.error.issues.forEach((issue) => {
                setError(
                    issue.path.at(0) as any,
                    errorMessages[
                    issue.path.at(0) as keyof typeof errorMessages
                    ]
                );
            });
            return;
        }

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
            time: data.time.toString(),
            note: data.note,
            items: cartItems.map(({ id, dishes, numOfPeople }: CartItem) => ({
                menu_id: id,
                dishes: dishes.map(({ id }) => id),
                quantity: numOfPeople,
            })),
            addons: cartAddons,
        };
        if (!elements) return;
        try {
            setLoading(true);
            const { data } = await axios.post(route('order.add'), order);
            const paymentMethod = await stripe?.createPaymentMethod({
                elements,
            });
            await stripe?.confirmCardPayment(data.client_secret, {
                payment_method: paymentMethod?.paymentMethod?.id,
            });
            dispatch(clearCart())
            router.visit(route('order.summary', { id: data.id }));
        } catch (err) {
            setOrderFailedModal(true);
        } finally {
            setLoading(false);
        }
    };

    function calculateGST(price: number) {
        const result = price * GST;
        return result;
    }

    const getTotal = (price: number) => {
        const tax = calculateGST(price);
        return price + tax + DEV_FEE;
    };

    return (
        <div className="bg-white relative">
            <OrderFailed
                open={orderFailedModal}
                setOpen={setOrderFailedModal}
            />
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
                    className="row-start-2 bg-gray-100 py-12 text-gray-500 md:px-10 lg:col-start-2 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:bg-transparent lg:px-0 lg:pb-24 lg:pt-0"
                >
                    <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                        <h2 id="summary-heading" className="sr-only">
                            Order summary
                        </h2>

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
                                        src={item.media.at(0)?.url}
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
                                <dd className="text-base">
                                    {formatNZD(getTotal(cartTotal))} NZD
                                </dd>
                            </div>
                        </dl>
                    </div>
                    <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0 mt-6">
                        <PaymentElement />
                    </div>
                    <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
                        <button
                            form='checkout-form'
                            disabled={loading}
                            type="submit"
                            className={classNames(
                                'rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50',
                                loading && 'disabled'
                            )}
                        >
                            {loading ? 'Submitting..' : 'Pay now'}
                        </button>
                    </div>
                </section>

                <section
                    aria-labelledby="payment-and-shipping-heading"
                    className="py-16 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:pb-24 lg:pt-0"
                >
                    <h2 id="payment-and-shipping-heading" className="sr-only">
                        Delivery details
                    </h2>

                    <form onSubmit={formHandler} id='checkout-form'>
                        <div className="@container mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0 flex flex-col gap-3.5">
                            {/* Content goes here */}
                            {/* <InfoTab /> */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">
                                    Delivery date & time
                                </h3>

                                <div className="mt-6 flex flex-col gap-3.5">
                                    <Calander
                                        setState={(value) =>
                                            setData('date', value)
                                        }
                                        setError={(value) =>
                                            setError('date', value)
                                        }
                                    />
                                    {errors.date && (
                                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs ml-1">
                                            {errors.date}
                                        </span>
                                    )}
                                    <TimeInput
                                        state={data.time}
                                        setState={(time) =>
                                            setData('time', time)
                                        }
                                        setError={(error) =>
                                            setError('time', error)
                                        }
                                    />
                                    {errors.time && (
                                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs ml-1">
                                            {errors.time}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="mt-10">
                                <h3 className="text-lg font-medium text-gray-900">
                                    Personal information
                                </h3>

                                <div className="mt-6 flex flex-col gap-3.5">
                                    <NameInput
                                        state={data.customer_name}
                                        setState={(name) =>
                                            setData('customer_name', name)
                                        }
                                    />
                                    {errors.customer_name && (
                                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs ml-1">
                                            {errors.customer_name}
                                        </span>
                                    )}
                                    <PhoneNumberInput
                                        state={data.phone as unknown as string}
                                        setState={(number) =>
                                            setData(
                                                'phone',
                                                number as unknown as number
                                            )
                                        }
                                    />
                                    {errors.phone && (
                                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs ml-1">
                                            {errors.phone}
                                        </span>
                                    )}
                                    <EmailInput
                                        state={data.email}
                                        setState={(email) =>
                                            setData('email', email)
                                        }
                                    />
                                    {errors.email && (
                                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs ml-1">
                                            {errors.email}
                                        </span>
                                    )}
                                    <AddressInput
                                        setState={(address) =>
                                            setData('address', address)
                                        }
                                        setError={(error) =>
                                            error && setError('address', error)
                                        }
                                    />
                                    {errors.address && (
                                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs ml-1">
                                            {errors.address}
                                        </span>
                                    )}
                                    <NoteInput
                                        state={data.note}
                                        setState={(note) =>
                                            setData('note', note)
                                        }
                                    />
                                    {errors.note && (
                                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs ml-1">
                                            {errors.note}
                                        </span>
                                    )}
                                </div>
                            </div>


                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
}
