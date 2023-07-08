import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Addon, Dish, Menu } from '@/types/application';
import { useDispatch, useSelector } from 'react-redux';
import { addOrUpdate, removeAddon, updateMenuItem } from '@/store/slice/cart';
import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { RootState } from "@/store";
import { formatNZD } from "@/utils/currentcy";


type ModalProps = {
    open: boolean,
    setOpen: any,
    addons: Dish[]
}



const CartAddon = ({ item }: { item: Dish }) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1)
    const cartAddons = useSelector((state: RootState) => state.cart.addons);

    const onUpdateAddon = (addon: Dish, quantity: number) => {
        setQuantity(quantity)
        if (quantity === 0) {
            dispatch(removeAddon(addon.id))
            return
        }
        dispatch(addOrUpdate({ dish_id: addon.id, quantity, name: addon.name }))
    }

    useEffect(() => {
        const addon = cartAddons.find(addon => addon.dish_id === item.id)
        if (addon) {
            setQuantity(addon.quantity)
        }
    }, [cartAddons])

    return (<div key={item.id} className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <img
                src={item.media.length ? item.media[0].url : ''}
                alt={""}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
        </div>
        <div className="mt-4 flex justify-between">
            <div>
                <h3 className="text-sm text-gray-700">

                    <span aria-hidden="true" className="absolute inset-0" />
                    {item.name}

                </h3>

            </div>
            <p className="text-sm font-medium text-gray-900">{formatNZD(item.price)}</p>
        </div>
        <div className="flex justify-center">
            <button
                type="button"
                onClick={() => onUpdateAddon(item, quantity - 1)}
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
                onClick={() => onUpdateAddon(item, quantity + 1)}
                className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
                <PlusIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                />
            </button>
        </div>
    </div>)
}

const Modal = ({ open, setOpen, addons }: ModalProps) => {
    const increaseBtnRef = useRef(null)
    return <Transition.Root show={open} as={Fragment}>
        <Dialog
            as="div"
            className="relative z-10"
            // initialFocus={increaseBtnRef}
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
            <div className="bg-white fixed inset-0 z-10 overflow-y-auto">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <div className="flex justify-between">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Addons</h2>
                        <button className="text-sm tracking-tight text-gray-900" type="button" onClick={() => setOpen(false)}>Close</button>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {addons.map((item) => (
                            <CartAddon key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </Dialog>
    </Transition.Root>
}

export function AddExtraDish() {
    const [open, setOpen] = useState(false)
    const dishes = useSelector((state: RootState) => state.menu.dishes);
    const addedAddons = useSelector((state: RootState) => state.cart.addons);

    return (
        <div className="my-20 ">
            <Modal open={open} setOpen={setOpen} addons={dishes} />
            <div className="flex items-center">
                <h2 className="text-sm font-medium text-gray-500 mr-2" >
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
                    <div className="mx-2 bg-green-600 p-1 rounded-md text-white text-md" key={item.dish_id}>
                        <span>{item.name}</span>
                        <span className="text-sm px-1">x</span>
                        <span>{item.quantity}</span>
                    </div>
                ))}
            </div>
        </div >
    );
}