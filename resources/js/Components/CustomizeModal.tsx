import { Menu } from '@/types/application';
import { useDispatch, useSelector } from 'react-redux';
import { updateMenuItem as updateMenuItemInCart } from '@/store/slice/cart';
import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CustomizeItem } from './Menu/CustomizeItem';
import { getSelectedMenu } from '@/store/slice/menu';

export default function CustomizeModal({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: any;
}) {
    const cancelButtonRef = useRef(null);
    const dispatch = useDispatch();
    const selectedMenu = useSelector(getSelectedMenu) as Menu;

    const onApplyHandler = () => {
        dispatch(updateMenuItemInCart(selectedMenu));
        setOpen(false);
    };

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
                    <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all w-full sm:p-6">
                                <CustomizeItem
                                    setOpen={setOpen}
                                    cancelButtonRef={cancelButtonRef}
                                    onApplyHandler={onApplyHandler}
                                />
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
