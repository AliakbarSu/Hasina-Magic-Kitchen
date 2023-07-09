import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Nav from '@/Layouts/Nav';
import { Footer } from '@/Components/UI/Footer';
import MessageSent from '@/Components/Contact/MessageSent';
import { z } from 'zod';
import { PhoneNumberInput } from '@/Components/Checkout/PhoneNumberInput';

export default function Contact() {
    const [agreed, setAgreed] = useState(false);
    const [messageSent, setMessageSent] = useState(false);
    const { post, data, setData, setError, errors, hasErrors, clearErrors } =
        useForm({
            first_name: '',
            last_name: '',
            company: '',
            email: '',
            number: 0,
            message: '',
            terms: true,
        });

    const formSchema = z.object({
        first_name: z.string().min(2).max(20),
        last_name: z.string().min(2).max(20),
        company: z.string().max(40).optional(),
        email: z.string().email(),
        number: z.string().min(6).max(14),
        message: z.string().min(20).max(900),
        terms: z.boolean(),
    });

    const errorMessages = {
        first_name:
            'First name is required and should be 2 to 20 characters long.',
        last_name:
            'Last name is required and should be 2 to 20 characters long.',
        company: 'Company name should be valid and not exceed 40 characters',
        email: 'Email is required and must be valid.',
        number: 'Mobile number is required and must be valid.',
        message: 'Message should be between 20 to 900 characters',
        terms: '',
    };

    const onSubmitHandler = (e: any) => {
        e.preventDefault();

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

        post('api/contact', {
            onSuccess: () => {
                setMessageSent(true);
            },
        });
    };

    return (
        <div>
            <Head title="Contact" />
            <MessageSent open={messageSent} setOpen={setMessageSent} />
            <Nav />
            <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
                <Head title="Contact" />
                <div
                    className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Contact us
                    </h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        Please use the form below to contact us. We will get
                        back to you as soon as possible.
                    </p>
                </div>
                <form
                    onSubmit={onSubmitHandler}
                    action="#"
                    method="POST"
                    className="mx-auto mt-16 max-w-xl sm:mt-20"
                >
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="first-name"
                                className="block text-sm font-semibold leading-6 text-gray-900"
                            >
                                First name
                            </label>
                            <div className="mt-2.5">
                                <input
                                    value={data.first_name}
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    onChange={(e) =>
                                        setData('first_name', e.target.value)
                                    }
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {errors.first_name && (
                                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-2 ml-1">
                                    {errors.first_name}
                                </span>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="last-name"
                                className="block text-sm font-semibold leading-6 text-gray-900"
                            >
                                Last name
                            </label>
                            <div className="mt-2.5">
                                <input
                                    value={data.last_name}
                                    type="text"
                                    name="last-name"
                                    id="last-name"
                                    autoComplete="family-name"
                                    onChange={(e) =>
                                        setData('last_name', e.target.value)
                                    }
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {errors.last_name && (
                                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-2 ml-1">
                                    {errors.last_name}
                                </span>
                            )}
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="company"
                                className="block text-sm font-semibold leading-6 text-gray-900"
                            >
                                Company
                            </label>
                            <div className="mt-2.5">
                                <input
                                    value={data.company}
                                    type="text"
                                    name="company"
                                    id="company"
                                    autoComplete="organization"
                                    onChange={(e) =>
                                        setData('company', e.target.value)
                                    }
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {errors.company && (
                                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-2 ml-1">
                                    {errors.company}
                                </span>
                            )}
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold leading-6 text-gray-900"
                            >
                                Email
                            </label>
                            <div className="mt-2.5">
                                <input
                                    value={data.email}
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="email"
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {errors.email && (
                                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-2 ml-1">
                                    {errors.email}
                                </span>
                            )}
                        </div>
                        <div className="sm:col-span-2">
                            <PhoneNumberInput
                                state={data.number as unknown as string}
                                setState={(number) =>
                                    setData(
                                        'number',
                                        number as unknown as number
                                    )
                                }
                            />
                            {errors.number && (
                                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-2 ml-1">
                                    {errors.number}
                                </span>
                            )}
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="message"
                                className="block text-sm font-semibold leading-6 text-gray-900"
                            >
                                Message
                            </label>
                            <div className="mt-2.5">
                                <textarea
                                    value={data.message}
                                    name="message"
                                    id="message"
                                    rows={4}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e) =>
                                        setData('message', e.target.value)
                                    }
                                />
                            </div>
                            {errors.message && (
                                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-2 ml-1">
                                    {errors.message}
                                </span>
                            )}
                        </div>
                        {/* <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2" onChange={(e) => setData('terms', (e.target as any).value)}>
                            <div className="flex h-6 items-center">
                                <Switch
                                    checked={agreed}
                                    onChange={setAgreed}
                                    className={classNames(
                                        agreed ? 'bg-indigo-600' : 'bg-gray-200',
                                        'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                    )}
                                >
                                    <span className="sr-only">Agree to policies</span>
                                    <span
                                        aria-hidden="true"
                                        className={classNames(
                                            agreed ? 'translate-x-3.5' : 'translate-x-0',
                                            'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                                        )}
                                    />
                                </Switch>
                            </div>
                            <Switch.Label className="text-sm leading-6 text-gray-600">
                                By selecting this, you agree to our{' '}
                                <a href="#" className="font-semibold text-indigo-600">
                                    privacy&nbsp;policy
                                </a>
                                .
                            </Switch.Label>
                        </Switch.Group> */}
                    </div>
                    <div className="mt-10">
                        <button
                            type="submit"
                            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Let's talk
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}
