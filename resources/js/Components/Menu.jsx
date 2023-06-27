import Modal from '@/Components/CustomizeModal';

const menuType = [
    {
        type: 'Pre Made!',
    },
    {
        type: 'Base Food!',
    },
    {
        type: 'AddOns!',
    },
    {
        type: 'Snack!',
    },
];
const products = [
    {
        id: 1,
        name: 'Kabuli Palau',
        href: '#',
        price: '$256',
        description:
            'Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.',

        imageSrc:
            'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
        imageAlt:
            'Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.',
    },
    {
        id: 2,
        name: 'Chicken',
        href: '#',
        price: '$32',
        description:
            'Look like a visionary CEO and wear the same black t-shirt every day.',

        imageSrc:
            'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
        imageAlt: 'Front of plain black t-shirt.',
    },
    {
        id: 3,
        name: 'German Rolls',
        href: '#',
        price: '$32',
        description:
            'Look like a visionary CEO and wear the same black t-shirt every day.',

        imageSrc:
            'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
        imageAlt: 'Front of plain black t-shirt.',
    },
    // More products...
];

export default function Menu() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {menuType.map((menuTypes) => (
                <>
                    <div key={menuType.type} className="bg-white">
                        <div className="max-w-6xl mx-auto pt-8">
                            <h2 className="text-3xl font-extrabold text-gray-900 pl-4">
                                {menuTypes.type}
                            </h2>

                            <div className="bg-white">
                                <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6  lg:max-w-7xl lg:px-8">
                                    <h2 className="sr-only">Products</h2>

                                    <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
                                        {products.map((product) => (
                                            <MenuItem
                                                key={product.id}
                                                product={product}
                                                setOpen={setOpen}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ))}
            <Modal open={open} setOpen={setOpen} />
            {/* <Example open={open} setOpen={setOpen} /> */}
        </>
    );
}

export function MenuItem({ product, setOpen }) {
    return (
        <div className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                <img
                    src={product.imageSrc}
                    alt={'Menu Plate'}
                    className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                />
            </div>
            <div className="flex flex-1 flex-col space-y-2 p-4">
                <h3 className="text-xl font-medium text-gray-900">
                    {/* <a href={product.href}> */}
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                    {/* </a> */}
                </h3>
                <p className="text-sm text-gray-700">{product.description}</p>
                <p className="text-base font-extrabold text-gray-500  pb-4">
                    {product.price + ' Per Person'}
                </p>

                <PeopleInput />
                <button className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Add to cart
                </button>
                <button
                    onClick={() => setOpen(true)}
                    className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Customize
                </button>
            </div>
        </div>
    );
}

import { UsersIcon, PlusIcon, MinusIcon } from '@heroicons/react/20/solid';
function PeopleInput() {
    return (
        <div>
            <label
                htmlFor="number"
                className="block text-sm font-medium text-gray-700"
            >
                For how many people?
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
                <div className="relative flex flex-grow items-stretch focus-within:z-10">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <UsersIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </div>
                    <input
                        type="number"
                        name="number"
                        id="number"
                        min="10"
                        max="200"
                        className="block w-full rounded-none rounded-l-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Minimum 15 people"
                    />
                </div>
                <button
                    type="button"
                    className="relative -ml-px inline-flex items-center space-x-2  border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                    <MinusIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                </button>
                <button
                    type="button"
                    className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                    <PlusIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                </button>
            </div>
        </div>
    );
}

import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';

export function Example({ open, setOpen }) {
    const cancelButtonRef = useRef(null);

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                initialFocus={cancelButtonRef}
                onClose={setOpen}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <div>
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                        <CheckIcon
                                            className="h-6 w-6 text-green-600"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-base font-semibold leading-6 text-gray-900"
                                        >
                                            Payment successful
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Lorem ipsum, dolor sit amet
                                                consectetur adipisicing elit.
                                                Eius aliquam laudantium
                                                explicabo pariatur iste dolorem
                                                animi vitae error totam. At
                                                sapiente aliquam accusamus
                                                facere veritatis.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                                        onClick={() => setOpen(false)}
                                    >
                                        Deactivate
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
