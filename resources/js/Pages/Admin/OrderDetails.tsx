import { useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import { CurrencyDollarIcon, ClockIcon, CalendarIcon } from '@heroicons/react/24/outline'
import { Order, OrderStatus } from './Orders'
import OrderMenu from "./Components/OrderMenu"
import OrderAddons from "./Components/OrderAddons"
import { Head, Link } from '@inertiajs/react'
import OrderStatusBadges from './Components/OrderStatusBadges'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types'

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
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg',
            imageAlt: "Back of women's Basic Tee in black.",
            primary: true,
        },
        {
            id: 2,
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-01.jpg',
            imageAlt: "Side profile of women's Basic Tee in black.",
            primary: false,
        },
        {
            id: 3,
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-02.jpg',
            imageAlt: "Front of women's Basic Tee in black.",
            primary: false,
        },
    ],
    colors: [
        { name: 'Black', bgColor: 'bg-gray-900', selectedColor: 'ring-gray-900' },
        { name: 'Heather Grey', bgColor: 'bg-gray-400', selectedColor: 'ring-gray-400' },
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
}
const policies = [
    // { name: 'International delivery', icon: GlobeAmericasIcon, description: 'Get your order in 2 years' },
    // { name: 'Loyalty rewards', icon: CurrencyDollarIcon, description: "Don't look at other tees" },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function OrderDetails({ auth, order }: PageProps<{ order: Order }>) {
    const [selectedColor, setSelectedColor] = useState(product.colors[0])
    const [selectedSize, setSelectedSize] = useState(product.sizes[2])

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Order ID: {order.id}</h2>}
        >
            <Head title="Orders" />
            <div>
                <div className="pb-16 pt-6 sm:pb-24">

                    <div className="mx-auto mt-8 max-w-4xl px-4 sm:px-6 lg:max-w-4xl lg:px-8">
                        <div className="">
                            <div className="lg:col-span-5 lg:col-start-8">
                                <div className="flex justify-between">
                                    <h1 className="text-xl font-medium text-gray-900">Customer: {order.customer_name}</h1>
                                    <p className="text-xl font-medium text-gray-900">${order.total}NZD</p>
                                </div>
                                {/* Reviews */}
                                <div className="mt-4">

                                    <div className="flex items-center">
                                        <Link
                                            href={route("admin.orders")}
                                            className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >

                                            همه سفارشات
                                        </Link>
                                        {/* <p className="text-sm text-gray-700">
                                        {product.rating}
                                        <span className="sr-only"> out of 5 stars</span>
                                    </p>
                                    <div className="ml-1 flex items-center">
                                        {[0, 1, 2, 3, 4].map((rating) => (
                                            <StarIcon
                                                key={rating}
                                                className={classNames(
                                                    product.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                                                    'h-5 w-5 flex-shrink-0'
                                                )}
                                                aria-hidden="true"
                                            />
                                        ))}
                                    </div> */}
                                        <div aria-hidden="true" className="ml-4 text-sm text-gray-300">
                                            ·
                                        </div>
                                        <div className="ml-4 flex">
                                            <OrderStatusBadges status={order.status as OrderStatus} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 lg:col-span-5">

                                <OrderMenu order={order} />
                                <div className="my-10">
                                    <h2 className="text-sm font-medium text-gray-900">Addons</h2>

                                </div>
                                <OrderAddons order={order} />

                                {/* Product details */}
                                <div className="mt-10">
                                    <h2 className="text-sm font-medium text-gray-900">Note</h2>

                                    <div
                                        className="prose prose-sm mt-4 text-gray-500"

                                    >{order.note}</div>
                                </div>

                                <div className="mt-8 border-t border-gray-200 pt-8">
                                    <h2 className="text-sm font-medium text-gray-900">Delievery Details</h2>

                                    <div className="prose prose-sm mt-4 text-gray-500">
                                        <ul role="list">
                                            <li><b>Customer: </b>{order.customer_name}</li>
                                            <li><b>Phone: </b>{order.phone}</li>
                                            <li><b>Email: </b>{order.email}</li>
                                            <li><b>Address: </b>{order.address}</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="mt-8 border-t border-gray-200 pt-8">
                                    <h2 className="text-sm font-medium text-gray-900">Extra Details</h2>

                                    <div className="prose prose-sm mt-4 text-gray-500">
                                        <ul role="list">
                                            <li><b>Placed on: </b>{order.created_at}</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Policies */}
                                <section aria-labelledby="policies-heading" className="mt-10">
                                    <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                                            <dt>
                                                <CalendarIcon className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                                <span className="mt-4 text-sm font-medium text-gray-900">Date</span>
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-500">{order.date}</dd>
                                        </div>
                                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                                            <dt>
                                                <ClockIcon className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                                <span className="mt-4 text-sm font-medium text-gray-900">Time</span>
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-500">{order.time}</dd>
                                        </div>
                                    </dl>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </AuthenticatedLayout>
    )
}
