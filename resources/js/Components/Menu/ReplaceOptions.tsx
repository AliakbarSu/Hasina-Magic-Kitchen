import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Dish } from '@/types/application';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type OptionsModalProps = {
    dishes: Dish[];
    open: boolean;
    setOpen: (state: boolean) => void;
    onApply: (id: string) => void;
};

export function ReplaceOptionsModal({
    open,
    setOpen,
    dishes = [],
    onApply,
}: OptionsModalProps) {
    const cancelButtonRef = useRef(null);
    const [options, setOptions] = useState<string>('');

    useEffect(() => {
        setOptions(() => dishes.at(0)?.id || '');
    }, [dishes]);

    const onInputChangeHandler = (e: SelectChangeEvent) => {
        setOptions(() => e.target.value);
    };

    const onApplyHandler = () => {
        setOpen(false);
        onApply(options);
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
                    <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-2xl sm:p-6">
                                <div className="sm:col-span-3">
                                    <form className="mt-2">
                                        <FormControl fullWidth>
                                            <InputLabel id="select-dishes">
                                                Dishes
                                            </InputLabel>
                                            <Select
                                                labelId="select-dishes"
                                                id="select-dishes"
                                                value={dishes.at(0)?.id}
                                                label="Age"
                                                onChange={onInputChangeHandler}
                                            >
                                                {dishes.map(({ name, id }) => (
                                                    <MenuItem
                                                        value={id}
                                                        key={id}
                                                    >
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </form>
                                </div>
                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                                        onClick={onApplyHandler}
                                    >
                                        Apply
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
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
