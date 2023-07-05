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


import { Dish } from '@/store/slice/cart';
export default function MenuList({ menu }: { menu: Menu[] }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="bg-white">
                <div className="max-w-2xl lg:max-w-6xl mx-auto pt-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 pl-4 sm:pl-6">
                        {'All Menus!'}
                    </h2>

                    <div className="bg-white">
                        <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6  lg:max-w-7xl ">
                            <h2 className="sr-only">Products</h2>

                            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
                                {menu.map((product) => (
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

            <Modal open={open} setOpen={setOpen} />
            {/* <Example open={open} setOpen={setOpen} /> */}
        </>
    );
}

import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '@/store/slice/cart';
import { RootState } from '@/store';

export function MenuItem({
    product,
    setOpen,
}: {
    product: Menu;
    setOpen: (value: boolean) => void;
}) {
    const [numOfPeople, setNumOfPeople] = useState(15);

    const dispatch = useDispatch();

    const addToCartHandler = () => {
        // dispatch(addItem({ ...product, numOfPeople: numOfPeople }));
    };

    const cartItem = useSelector((state: RootState) =>
        state.cart.items.filter((item) => item.id === product.id)
    );

    return (
        <div className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                <img
                    src={product.media.length ? product.media[0].url : ''}
                    alt={'Menu Plate'}
                    className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                />
            </div>
            <div className="flex flex-1 flex-col space-y-2 p-4">
                <h3 className="text-xl font-medium text-gray-900">
                    {/* <a href={product.href}> */}
                    {/* <span aria-hidden="true" className="absolute inset-0" /> */}
                    {product.name}
                    {/* </a> */}
                </h3>
                <p className="text-sm text-gray-700">{product.description}</p>
                <p className="text-base font-extrabold text-gray-500  pb-4">
                    {`$${product.price} Per Person`}
                </p>

                {cartItem[0] ? (
                    <>
                        {/* {JSON.stringify(cartItem)} */}
                        <PeopleInput
                            state={numOfPeople}
                            setState={setNumOfPeople}
                        />
                        { }
                        <button
                            onClick={() => setOpen(true)}
                            className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Customize
                        </button>
                    </>
                ) : (
                    <button
                        onClick={addToCartHandler}
                        className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Add to cart
                    </button>
                )}
            </div>
        </div>
    );
}

import { UsersIcon, PlusIcon, MinusIcon } from '@heroicons/react/20/solid';
function PeopleInput(props: {
    state: number;
    setState: (value: number) => void;
}) {
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
import { Menu } from '@/types/application';

export function Example({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: (value: boolean) => void;
}) {
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
