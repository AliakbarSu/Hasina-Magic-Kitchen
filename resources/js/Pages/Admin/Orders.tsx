import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import OrderList from './Components/OrderList';
import { Addon, Dish, Media } from '@/types/application';

export enum OrderStatus {
    Created = 'created',
    Confirmed = 'confirmed',
    Make = 'make',
    Completed = 'completed',
    Canceled = 'canceled',
}

export interface Order {
    id: string;
    customer_name: string;
    status: OrderStatus;
    subtotal: number;
    delivery_fee: number;
    tax: number;
    total: number;
    date: string;
    time: string;
    address: string;
    email: string;
    phone: string;
    note: string;
    created_at: string;
    items: {
        id: string;
        name: string;
        quantity: number;
        price: number;
        description: string;
        media: Media[];
        dishes: Dish[];
        order_dishes: Dish[];
    }[];
    addons: Addon[];
}

export default function Orders({
    auth,
    orders,
}: PageProps<{ mustVerifyEmail: boolean; status?: string; orders: Order[] }>) {
    const { errors } = useForm({
        status: 'pending',
        order_id: '',
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Orders
                </h2>
            }
        >
            <Head title="Orders" />
            {errors.order_id ? <div>{errors.order_id}</div> : null}

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <OrderList orders={orders} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
