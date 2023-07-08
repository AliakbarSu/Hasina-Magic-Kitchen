import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Dish, Menu as MenuType } from '@/types/application';
import { classNames } from '@/utils/classNames';
import { ReplaceOptionsModal } from './ReplaceOptions';


type DropdownProps = {
    menu: MenuType,
    item: Dish,
    onApply: (id: string) => void,
    onRemove: (id: string) => void
}


export default function Dropdown({ menu, onApply, onRemove, item }: DropdownProps) {
    const [onReplace, setOnReplace] = useState(false);
    const availableOptions = menu.options.filter(({ id }) => menu.dishes.find(({ id: dishId }) => dishId === id) === undefined);
    return (
        <Menu as="div" className="relative inline-block text-left" >
            <ReplaceOptionsModal dishes={availableOptions} setOpen={setOnReplace} onApply={onApply} open={onReplace} />
            <div>
                <Menu.Button className="overflow-visible inline-flex h-8 w-8 items-center justify-center rounded-full bg-white bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">

                    <span className="sr-only">
                        Open options
                    </span>

                    <EllipsisVerticalIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                    />

                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <p
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                    onClick={() => onRemove(item.id)}
                                >
                                    Remove
                                </p>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <p
                                    onClick={onReplace ? () => setOnReplace(false) : () => setOnReplace(true)}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    Replace
                                </p>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

