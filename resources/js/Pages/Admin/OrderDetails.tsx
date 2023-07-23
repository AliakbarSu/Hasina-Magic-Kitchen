import { ClockIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { Order, OrderStatus } from './Orders';
import OrderMenu from './Components/OrderMenu';
import OrderAddons from './Components/OrderAddons';
import { Head, Link } from '@inertiajs/react';
import OrderStatusBadges from './Components/OrderStatusBadges';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';

export default function OrderDetails({
    auth,
    order,
}: PageProps<{ order: Order }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Order ID: {order.id}
                </h2>
            }
        >
            <Head title="Orders" />
            <div>
                <div className="pb-16 pt-6 sm:pb-24">
                    <div className="mx-auto mt-8 max-w-4xl px-4 sm:px-6 lg:max-w-4xl lg:px-8">
                        <div className="">
                            <div className="lg:col-span-5 lg:col-start-8">
                                <div className="flex justify-between">
                                    <h1 className="text-xl font-medium text-gray-900">
                                        Customer: {order.customer_name}
                                    </h1>
                                    <p className="text-xl font-medium text-gray-900">
                                        ${order.total}NZD
                                    </p>
                                </div>
                                {/* Reviews */}
                                <div className="mt-4">
                                    <div className="flex items-center">
                                        <Link
                                            href={route('admin.orders')}
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
                                        <div
                                            aria-hidden="true"
                                            className="ml-4 text-sm text-gray-300"
                                        >
                                            ·
                                        </div>
                                        <div className="ml-4 flex">
                                            <OrderStatusBadges
                                                status={
                                                    order.status as OrderStatus
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 lg:col-span-5">
                                <OrderMenu order={order} />
                                <div className="my-10">
                                    <h2 className="text-sm font-medium text-gray-900">
                                        Addons
                                    </h2>
                                </div>
                                <OrderAddons order={order} />

                                {/* Product details */}
                                <div className="mt-10">
                                    <h2 className="text-sm font-medium text-gray-900">
                                        Note
                                    </h2>

                                    <div className="prose prose-sm mt-4 text-gray-500">
                                        {order.note}
                                    </div>
                                </div>

                                <div className="mt-8 border-t border-gray-200 pt-8">
                                    <h2 className="text-sm font-medium text-gray-900">
                                        Delievery Details
                                    </h2>

                                    <div className="prose prose-sm mt-4 text-gray-500">
                                        <ul role="list">
                                            <li>
                                                <b>Customer: </b>
                                                {order.customer_name}
                                            </li>
                                            <li>
                                                <b>Phone: </b>
                                                {order.phone}
                                            </li>
                                            <li>
                                                <b>Email: </b>
                                                {order.email}
                                            </li>
                                            <li>
                                                <b>Address: </b>
                                                {order.address}
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="mt-8 border-t border-gray-200 pt-8">
                                    <h2 className="text-sm font-medium text-gray-900">
                                        Extra Details
                                    </h2>

                                    <div className="prose prose-sm mt-4 text-gray-500">
                                        <ul role="list">
                                            <li>
                                                <b>Placed on: </b>
                                                {order.created_at}
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Policies */}
                                <section
                                    aria-labelledby="policies-heading"
                                    className="mt-10"
                                >
                                    <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                                            <dt>
                                                <CalendarIcon
                                                    className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                                <span className="mt-4 text-sm font-medium text-gray-900">
                                                    Date
                                                </span>
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-500">
                                                {order.date}
                                            </dd>
                                        </div>
                                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                                            <dt>
                                                <ClockIcon
                                                    className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                                <span className="mt-4 text-sm font-medium text-gray-900">
                                                    Time
                                                </span>
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-500">
                                                {order.time}
                                            </dd>
                                        </div>
                                    </dl>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
