import { Fragment, PropsWithChildren, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function Modal({
    children,
    show = false,
    maxWidth = '2xl',
    closeable = true,
    onClose = () => {},
}: PropsWithChildren<{
    show: boolean;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    closeable?: boolean;
    onClose: CallableFunction;
}>) {
    const close = () => {
        if (closeable) {
            onClose();
        }
    };

    const maxWidthClass = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
    }[maxWidth];

    return (
        <Transition show={show} as={Fragment} leave="duration-200">
            <Dialog
                as="div"
                id="modal"
                className="fixed inset-0 flex overflow-y-auto px-4 py-6 sm:px-0 items-center z-50 transform transition-all"
                onClose={close}
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
                    <div className="absolute inset-0 bg-gray-500/75" />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <Dialog.Panel
                        className={`mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto ${maxWidthClass}`}
                    >
                        {children}
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
}

const projects = [
    {
        name: 'Graph API',
        initials: 'GA',
        href: '#',
        members: 16,
        bgColor: 'bg-pink-600',
    },
    {
        name: 'Component Design',
        initials: 'CD',
        href: '#',
        members: 12,
        bgColor: 'bg-purple-600',
    },
    {
        name: 'Templates',
        initials: 'T',
        href: '#',
        members: 16,
        bgColor: 'bg-yellow-500',
    },
    {
        name: 'React Components',
        initials: 'RC',
        href: '#',
        members: 8,
        bgColor: 'bg-green-500',
    },
];
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';

function Tags() {
    return (
        <div className="h-[80px]">
            <h2 className="text-sm font-medium text-gray-500">Base Foods</h2>

            <ul
                role="list"
                className="mt-1 flex max-h-11 flex-col flex-wrap gap-1 overflow-x-scroll"
            >
                {projects.map((project) => (
                    <li
                        key={project.name}
                        className="flex rounded-md shadow-sm"
                    >
                        <div className="flex flex-1 items-center justify-between truncate rounded-md border border-gray-200 bg-white">
                            <div className="flex-1 truncate px-4 py-2 text-sm">
                                <p className="font-medium text-gray-900 hover:text-gray-600">
                                    {project.name}
                                </p>
                            </div>
                            <div className="flex-shrink-0 pr-2">
                                <button
                                    type="button"
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    <span className="sr-only">
                                        Open options
                                    </span>
                                    <EllipsisVerticalIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
