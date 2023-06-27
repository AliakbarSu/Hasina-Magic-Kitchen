const product = {
    name: 'Basic Tee',
    price: '$35',
    rating: 3.9,
    reviewCount: 512,
    href: '#',
    breadcrumbs: [
        { id: 1, name: 'Women', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
    ],
    images: [
        {
            id: 1,
            imageSrc:
                'https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg',
            imageAlt: "Back of women's Basic Tee in black.",
            primary: true,
        },
        {
            id: 2,
            imageSrc:
                'https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-01.jpg',
            imageAlt: "Side profile of women's Basic Tee in black.",
            primary: false,
        },
        {
            id: 3,
            imageSrc:
                'https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-02.jpg',
            imageAlt: "Front of women's Basic Tee in black.",
            primary: false,
        },
    ],
    colors: [
        {
            name: 'Black',
            bgColor: 'bg-gray-900',
            selectedColor: 'ring-gray-900',
        },
        {
            name: 'Heather Grey',
            bgColor: 'bg-gray-400',
            selectedColor: 'ring-gray-400',
        },
    ],
    sizes: [
        { name: 'XXS', inStock: true },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: false },
    ],
    description: `
    <p>The Basic tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and sewn locally, with a special dye technique that gives each tee it's own look.</p>
    <p>Looking to stock your closet? The Basic tee also comes in a 3-pack or 5-pack at a bundle discount.</p>
  `,
    details: [
        'Only the best materials',
        'Ethically and locally made',
        'Pre-washed and pre-shrunk',
        'Machine wash cold with similar colors',
    ],
};
const policies = [
    {
        name: 'International delivery',
        description: 'Get your order in 2 years',
    },
    {
        name: 'Loyalty rewards',
        description: "Don't look at other tees",
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export function Modal() {
    return (
        <div className="bg-white">
            <div className="pb-16 pt-6 sm:pb-24">
                <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
                        <div className="lg:col-span-5 lg:col-start-8">
                            <div className="flex justify-between">
                                <h1 className="text-xl font-medium text-gray-900">
                                    {product.name}
                                </h1>
                                <p className="text-xl font-medium text-gray-900">
                                    {product.price}
                                </p>
                            </div>
                        </div>

                        {/* Image gallery */}
                        <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
                            <h2 className="sr-only">Images</h2>

                            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                                {/* {product.images.map((image) => (
                                    <img
                                        key={image.id}
                                        src={image.imageSrc}
                                        alt={image.imageAlt}
                                        className={classNames(
                                            image.primary
                                                ? 'lg:col-span-2 lg:row-span-2'
                                                : 'hidden lg:block',
                                            'rounded-lg'
                                        )}
                                    />
                                ))} */}
                            </div>
                        </div>

                        <div className="mt-8 lg:col-span-5">
                            {/* Product details */}
                            <div className="mt-10">
                                <h2 className="text-sm font-medium text-gray-900">
                                    Description
                                </h2>

                                <div
                                    className="prose prose-sm mt-4 text-gray-500"
                                    dangerouslySetInnerHTML={{
                                        __html: product.description,
                                    }}
                                />
                            </div>

                            <div className="mt-8 border-t border-gray-200 pt-8">
                                <h2 className="text-sm font-medium text-gray-900">
                                    Fabric &amp; Care
                                </h2>

                                <div className="prose prose-sm mt-4 text-gray-500">
                                    <ul role="list">
                                        {product.details.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Policies */}
                            <section
                                aria-labelledby="policies-heading"
                                className="mt-10"
                            >
                                <h2 id="policies-heading" className="sr-only">
                                    Our Policies
                                </h2>

                                <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                                    {policies.map((policy) => (
                                        <div
                                            key={policy.name}
                                            className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center"
                                        >
                                            <dt>
                                                <span className="mt-4 text-sm font-medium text-gray-900">
                                                    {policy.name}
                                                </span>
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-500">
                                                {policy.description}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';

export default function Example({ open, setOpen }) {
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-6xl sm:p-6">
                                <Modal />
                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                                        onClick={() => setOpen(false)}
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
