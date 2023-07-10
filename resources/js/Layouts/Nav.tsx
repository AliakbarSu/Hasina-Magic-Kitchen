import { Disclosure } from '@headlessui/react';
import {
    Bars3Icon,
    ShoppingCartIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Link } from '@inertiajs/react';
import { classNames } from '@/utils/classNames';

export default function Example() {
    const isCartEmpty = useSelector((state: RootState) =>
        state.cart.items.length > 0 ? true : false
    );

    return (
        <Disclosure as="nav" className="bg-blue-600 shadow mb-1">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between">
                            <div className="flex">
                                <div className="flex flex-shrink-0 items-center">
                                    <Link href={route('main.home')}>
                                        <h1 className="font-extrabold font-mono text-white text-2xl">
                                            HSM
                                        </h1>
                                    </Link>
                                </div>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex ">
                                <div className="hidden sm:mr-6 sm:flex sm:space-x-8">
                                    <Link
                                        href={route('main.home')}
                                        className={classNames(
                                            'inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-md font-medium text-white hover:border-gray-300 hover:text-gray-300'
                                        )}
                                    >
                                        Menu
                                    </Link>
                                    <Link
                                        href={route('about')}
                                        className={classNames(
                                            'inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-md font-medium text-white hover:border-gray-300 hover:text-gray-300'
                                        )}
                                    >
                                        About
                                    </Link>
                                    <Link
                                        href={route('contact')}
                                        className={classNames(
                                            'inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-md font-medium text-white hover:border-gray-300 hover:text-gray-300'
                                        )}
                                    >
                                        Contact
                                    </Link>
                                    <Link
                                        href={route('faqs')}
                                        className={classNames(
                                            'inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-md font-medium text-white hover:border-gray-300 hover:text-gray-300'
                                        )}
                                    >
                                        FAQS
                                    </Link>
                                </div>
                                <button
                                    type="button"
                                    className="relative rounded-full p-1 text-white hover:text-gray-300"
                                >
                                    {isCartEmpty && (
                                        <div className="rounded-full h-3 w-3 bg-red-500 absolute top-4 -right-1 animate-bounce" />
                                    )}
                                    <Link href={route('profile.checkout')}>
                                        <ShoppingCartIcon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </Link>
                                </button>
                            </div>
                            <div className="-mr-2 flex items-center sm:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-white  hover:bg-gray-100 hover:text-gray-500">
                                    <span className="sr-only">
                                        Open main menu
                                    </span>
                                    {open ? (
                                        <XMarkIcon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <Bars3Icon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 pb-3 pt-2">
                            {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                            <Disclosure.Button
                                as={Link}
                                href={route('main.home')}
                                className={classNames(
                                    'block border-l-4 py-2 pl-3 pr-4 text-base font-medium hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700',
                                    route().current('main.home') &&
                                        'text-indigo-700 border-indigo-500 bg-indigo-50',
                                    !route().current('main.home') &&
                                        'text-white border-transparent'
                                )}
                            >
                                Menu
                            </Disclosure.Button>
                            <Disclosure.Button
                                as={Link}
                                href={route('about')}
                                className={classNames(
                                    'block border-l-4 py-2 pl-3 pr-4 text-base font-medium hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700',
                                    route().current('about') &&
                                        'text-indigo-700 border-indigo-500 bg-indigo-50',
                                    !route().current('about') &&
                                        'text-white border-transparent'
                                )}
                            >
                                About
                            </Disclosure.Button>
                            <Disclosure.Button
                                as={Link}
                                href={route('contact')}
                                className={classNames(
                                    'block border-l-4 py-2 pl-3 pr-4 text-base font-medium hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700',
                                    route().current('contact') &&
                                        'text-indigo-700 border-indigo-500 bg-indigo-50',
                                    !route().current('contact') &&
                                        'text-white border-transparent'
                                )}
                            >
                                Contact
                            </Disclosure.Button>
                            <Disclosure.Button
                                as={Link}
                                href={route('faqs')}
                                className={classNames(
                                    'block border-l-4 py-2 pl-3 pr-4 text-base font-medium hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700',
                                    route().current('faqs') &&
                                        'text-indigo-700 border-indigo-500 bg-indigo-50',
                                    !route().current('faqs') &&
                                        'text-white border-transparent'
                                )}
                            >
                                FAQS
                            </Disclosure.Button>
                            <Disclosure.Button
                                as={Link}
                                href={route('profile.checkout')}
                                className={classNames(
                                    'relative block border-l-4 py-2 pl-3 pr-4 text-base font-medium hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700',
                                    route().current('profile.checkout') &&
                                        'text-indigo-700 border-indigo-500 bg-indigo-50',
                                    !route().current('profile.checkout') &&
                                        'text-white border-transparent'
                                )}
                            >
                                {isCartEmpty && (
                                    <div className="rounded-full h-3 w-3 bg-red-500 absolute top-1 left-8 animate-bounce" />
                                )}
                                <ShoppingCartIcon
                                    className="h-6 w-6 hover:stroke-black"
                                    aria-hidden="true"
                                />
                            </Disclosure.Button>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}
