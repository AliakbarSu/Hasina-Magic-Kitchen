import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import { Addon, Dish } from '@/types/application';
import { useDispatch, useSelector } from 'react-redux';
import { addOrUpdate, removeAddon } from '@/store/slice/cart';
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { RootState } from '@/store';
import { formatNZD } from '@/utils/currentcy';
import { optimizeImage } from '@/utils/cloudinary';

type ModalProps = {
    open: boolean;
    setOpen: any;
    addons: Dish[];
};

const CartAddon = ({ item, onUpdateAddon }: { item: Dish, onUpdateAddon: (addon: Addon) => void }) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(0);
    const cartAddons = useSelector((state: RootState) => state.cart.addons);

    const onUpdateAddonHandler = (addon: Dish, quantity: number) => {
        setQuantity(quantity);
        onUpdateAddon({ ...addon, quantity: quantity })
    };


    useEffect(() => {
        const addon = cartAddons.find((addon) => addon.id === item.id);
        if (addon) {
            setQuantity(addon.quantity);
        } else {
            setQuantity(0);
        }
    }, [cartAddons]);

    return (
        <div key={item.id} className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                    src={optimizeImage(item.media.at(0)?.url, 500, 500)}
                    alt={''}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
            </div>
            <div className="my-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {item.name}
                    </h3>
                </div>
                <p className="text-sm font-medium text-gray-900">
                    {formatNZD(item.price)}
                </p>
            </div>
            <div className="flex justify-center">
                <button
                    type="button"
                    onClick={() =>
                        quantity > 0 && onUpdateAddonHandler(item, quantity - 1)
                    }
                    className="relative -ml-px inline-flex rounded-l-md items-center space-x-2  border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                    <MinusIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                </button>
                <span className="relative -ml-px inline-flex items-center space-x-2 border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                    {quantity}
                </span>
                <button
                    type="button"
                    onClick={() =>
                        quantity < 100 && onUpdateAddonHandler(item, quantity + 1)
                    }
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
};

const Modal = ({ open, setOpen, addons }: ModalProps) => {

    const dispatch = useDispatch();
    const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);

    const onUpdateAddon = () => {
        setOpen(false);
        selectedAddons.forEach((addon) => {
            return addon.quantity === 0 ? dispatch(removeAddon(addon.id)) : dispatch(addOrUpdate(addon));
        })


    };

    const onUpdateAddonHandler = (addon: Addon) => {
        const exsisitingAddon = selectedAddons.find((item) => item.id === addon.id);
        if (exsisitingAddon) {
            setSelectedAddons(selectedAddons.map((item) => item.id === addon.id ? addon : item));
        } else {
            setSelectedAddons([...selectedAddons, addon]);
        }

    }

    const onCancelHandler = () => {
        setOpen(false);
        setSelectedAddons([]);
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
                <div className="bg-white fixed inset-0 z-10 overflow-y-auto">
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <div className="flex justify-between">
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                                Addons
                            </h2>
                        </div>
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {addons.map((item) => (
                                <CartAddon onUpdateAddon={onUpdateAddonHandler} key={item.id} item={item} />
                            ))}
                        </div>
                    </div>

                    <div className="sticky bottom-0 shadow-inner bg-white py-3 max-w-7xl lg:mx-auto w-full flex px-2 lg:px-5 justify-center lg:justify-end items-center gap-2 mb-10">
                        <button
                            type="button"
                            className="inline-flex max-w-xs w-full justify-center rounded-md bg-white px-3 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                            onClick={onCancelHandler}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="inline-flex max-w-xs w-full justify-center rounded-md bg-indigo-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                            onClick={onUpdateAddon}
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export function AddExtraDish() {
    const [open, setOpen] = useState(false);
    const dishes = useSelector((state: RootState) => state.menu.dishes);
    const addedAddons = useSelector((state: RootState) => state.cart.addons);

    return (
        <div className="my-20 ">
            <Modal open={open} setOpen={setOpen} addons={dishes} />
            <div className="flex items-center">
                <h2 className="text-sm font-medium text-gray-500 mr-2">
                    Add Extra Dish
                </h2>
                <button
                    onClick={() => setOpen(true)}
                    type="button"
                    className="rounded-full bg-gray-400 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                </button>
            </div>
            <div className="relative mt-4 flex bg-gray-100 border rounded-md pb-10 pt-2">
                {addedAddons.map((item) => (
                    <div className="mx-2 bg-green-600 p-1 rounded-md text-white text-md" key={item.id}>
                        <span>{item.name}</span>
                        <span className="text-sm px-1">x</span>
                        <span>{item.quantity}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
