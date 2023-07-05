import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingCartIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Order } from '../Orders'
import OrderStatusActions from "./OrderStatusActions"
import { Link } from '@inertiajs/react'
import OrderStatusBadges, { OrderStatus } from './OrderStatusBadges'

const currencies = ['CAD', 'USD', 'AUD', 'EUR', 'GBP']
const navigation = {
    categories: [
        {
            name: 'Women',
            featured: [
                { name: 'Sleep', href: '#' },
                { name: 'Swimwear', href: '#' },
                { name: 'Underwear', href: '#' },
            ],
            collection: [
                { name: 'Everything', href: '#' },
                { name: 'Core', href: '#' },
                { name: 'New Arrivals', href: '#' },
                { name: 'Sale', href: '#' },
            ],
            categories: [
                { name: 'Basic Tees', href: '#' },
                { name: 'Artwork Tees', href: '#' },
                { name: 'Bottoms', href: '#' },
                { name: 'Underwear', href: '#' },
                { name: 'Accessories', href: '#' },
            ],
            brands: [
                { name: 'Full Nelson', href: '#' },
                { name: 'My Way', href: '#' },
                { name: 'Re-Arranged', href: '#' },
                { name: 'Counterfeit', href: '#' },
                { name: 'Significant Other', href: '#' },
            ],
        },
        {
            name: 'Men',
            featured: [
                { name: 'Casual', href: '#' },
                { name: 'Boxers', href: '#' },
                { name: 'Outdoor', href: '#' },
            ],
            collection: [
                { name: 'Everything', href: '#' },
                { name: 'Core', href: '#' },
                { name: 'New Arrivals', href: '#' },
                { name: 'Sale', href: '#' },
            ],
            categories: [
                { name: 'Artwork Tees', href: '#' },
                { name: 'Pants', href: '#' },
                { name: 'Accessories', href: '#' },
                { name: 'Boxers', href: '#' },
                { name: 'Basic Tees', href: '#' },
            ],
            brands: [
                { name: 'Significant Other', href: '#' },
                { name: 'My Way', href: '#' },
                { name: 'Counterfeit', href: '#' },
                { name: 'Re-Arranged', href: '#' },
                { name: 'Full Nelson', href: '#' },
            ],
        },
    ],
    pages: [
        { name: 'Company', href: '#' },
        { name: 'Stores', href: '#' },
    ],
}
const orders = [
    {
        number: '4376',
        status: 'Delivered on January 22, 2021',
        href: '#',
        invoiceHref: '#',
        products: [
            {
                id: 1,
                name: 'Machined Brass Puzzle',
                href: '#',
                price: '$95.00',
                color: 'Brass',
                size: '3" x 3" x 3"',
                imageSrc: 'https://tailwindui.com/img/ecommerce-images/order-history-page-07-product-01.jpg',
                imageAlt: 'Brass puzzle in the shape of a jack with overlapping rounded posts.',
            },
            // More products...
        ],
    },
    // More orders...
]
const footerNavigation = {
    account: [
        { name: 'Manage Account', href: '#' },
        { name: 'Saved Items', href: '#' },
        { name: 'Orders', href: '#' },
        { name: 'Redeem Gift card', href: '#' },
    ],
    service: [
        { name: 'Shipping & Returns', href: '#' },
        { name: 'Warranty', href: '#' },
        { name: 'FAQ', href: '#' },
        { name: 'Find a store', href: '#' },
        { name: 'Get in touch', href: '#' },
    ],
    company: [
        { name: 'Who we are', href: '#' },
        { name: 'Press', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Terms & Conditions', href: '#' },
        { name: 'Privacy', href: '#' },
    ],
    connect: [
        { name: 'Instagram', href: '#' },
        { name: 'Pinterest', href: '#' },
        { name: 'Twitter', href: '#' },
    ],
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}


type OrderListProps = {
    orders: Order[];
}

export default function OrderList({ orders }: OrderListProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)


    const orderStatusColor = (status: string) => {
        if (status === "placed") {
            return "text-orange-300";
        } else if (status === "confirmed") {
            return "text-green-600";
        } else if (status === "completed") {
            return "text-green-800";
        } else if (status === "make") {
            return "text-orange-600";
        } else if (status === "canceled") {
            return "text-red-600"
        } else {
            return "text-green-600"
        }
    }

    return (
        <main className="mx-auto px-4 py-16 sm:px-6 sm:pb-32 sm:pt-24 lg:px-8" >
            <div className="mx-auto max-w-2xl">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Your Orders</h1>
                <p className="mt-2 text-sm text-gray-500">
                    Check the status of recent orders, manage returns, and discover similar products.
                </p>
            </div>

            <div className="mx-auto max-w-2xl mt-12 space-y-16 sm:mt-16">
                {orders.map((order) => (
                    <section key={order.id} aria-labelledby={`${order.id}-heading`}>
                        <div className="space-y-1 md:flex md:items-baseline md:space-x-4 md:space-y-0">
                            <h2 id={`${order.id}-heading`} className="text-lg font-medium text-gray-900 md:flex-shrink-0 w-2/4">
                                Order for <b>{order.customer_name}</b>
                            </h2>
                            <div className="space-y-5 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 md:min-w-0 md:flex-1">
                                {/* <p className="text-sm font-medium text-gray-500">{order.status}</p> */}
                                <div className="flex text-sm font-medium">
                                    {/* <span className={classNames(orderStatusColor(order.status), "hover:" + orderStatusColor(order.status))}>
                                        {order.status}
                                    </span> */}
                                    <OrderStatusBadges status={order.status as OrderStatus} />
                                    <div className="ml-4 border-l border-gray-200 pl-4 sm:ml-6 sm:pl-6">
                                        <Link href={route('admin.order_details', { id: order.id })} className="text-indigo-600 hover:text-indigo-500 text-xl">
                                            دیدن سفارش
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="mt-6 space-y-4 sm:ml-6 sm:mt-0 sm:w-40 sm:flex-none">
                                <button
                                    onClick={() => onConfirm(order)}
                                    type="button"
                                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-2.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-full sm:flex-grow-0"
                                >
                                    Confirm
                                </button>
                                <button
                                    onClick={() => onCancel(order)}
                                    type="button"
                                    className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-full sm:flex-grow-0"
                                >
                                    Cancel
                                </button>
                            </div> */}
                        </div>
                        <OrderStatusActions order={order} onSelect={() => null} />



                    </section>
                ))}
            </div>
        </main>



    )
}
