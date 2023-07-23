import Modal from '@/Components/CustomizeModal';
import { useEffect, useState } from 'react';
import { Menu } from '@/types/application';
import { setSelectedMenu } from '@/store/slice/menu';
import { UsersIcon, PlusIcon, MinusIcon } from '@heroicons/react/20/solid';
import { optimizeImage } from '@/utils/cloudinary';

export default function MenuList({ menu }: { menu: Menu[] }) {
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
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <Example open={open} setOpen={setOpen} /> */}
        </>
    );
}

import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, updateQuantity } from '@/store/slice/cart';
import { RootState } from '@/store';

export function MenuItem({ product }: { product: Menu }) {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const [numOfPeople, setNumOfPeople] = useState(15);

    const addToCartHandler = () => {
        dispatch(addItem({ ...product, numOfPeople: numOfPeople }));
    };

    const cartItem = useSelector((state: RootState) =>
        state.cart.items.filter((item) => item.id === product.id)
    );

    const onRemoveItemHandler = () => {
        dispatch(removeItem(product.id));
    };

    useEffect(() => {
        dispatch(updateQuantity({ id: product.id, quantity: numOfPeople }));
    }, [numOfPeople]);

    const onCustomizeClickHandler = () => {
        dispatch(setSelectedMenu(product));
        setOpen(true);
    };
    return (
        <div className="relative">
            <div className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
                <Modal open={open} setOpen={setOpen} />
                <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                    <img
                        src={optimizeImage(product.media.at(0)?.url)}
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
                    <p className="text-sm text-gray-700">
                        {product.description}
                    </p>
                    <p className="text-base font-extrabold text-gray-500  pb-4">
                        {`$${product.price} Per Person`}
                    </p>

                    {cartItem.length > 0 ? (
                        <>
                            <PeopleInput
                                state={numOfPeople}
                                setState={setNumOfPeople}
                            />
                            {}
                            <div className="flex gap-2">
                                <button
                                    onClick={onCustomizeClickHandler}
                                    className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Customize
                                </button>
                                <button
                                    onClick={onRemoveItemHandler}
                                    className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                >
                                    Remove
                                </button>
                            </div>
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
        </div>
    );
}

function PeopleInput(props: {
    state: number;
    setState: (value: number) => void;
}) {
    const onIncreaseHandler = () => {
        if (props.state < 200) {
            props.setState(props.state + 1);
        }
    };

    const onDecreaseHandler = () => {
        if (props.state > 15) {
            props.setState(props.state - 1);
        }
    };

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
                        min="15"
                        max="200"
                        value={props.state}
                        onChange={() => null}
                        className="block w-full rounded-none rounded-l-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Minimum 15 people"
                    />
                </div>
                <button
                    type="button"
                    onClick={onDecreaseHandler}
                    className="relative -ml-px inline-flex items-center space-x-2  border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                    <MinusIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                </button>
                <button
                    type="button"
                    onClick={onIncreaseHandler}
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
