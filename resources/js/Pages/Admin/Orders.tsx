import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import DeleteUserForm from './Partials/DeleteUserForm';
// import UpdatePasswordForm from './Partials/UpdatePasswordForm';
// import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import OrderList from './Components/OrderList';

export interface Order {
    id: string;
    status: string;
    total: string;
    date: string;
    time: string;
    address: string;
    email: string;
    phone: string;
    note: string;
    items: {
        quantity: string;
        menu: {
            id: string;
            name: string;
            price: string;
            description: string;
            created_at: string;
        }
    }[]
}

export default function Orders({ auth, mustVerifyEmail, status, orders }: PageProps<{ mustVerifyEmail: boolean, status?: string, orders: any[] }>) {
    const { data, setData, patch, processing, errors, reset } = useForm({
        status: 'pending',
        order_id: '',
    });

    const onConfirmHandler = (order: any) => {
        setData((prevData) => ({ ...prevData, order_id: order.id }));
        setData((prevData) => ({ ...prevData, status: "confirmed" }));
        patch(route('admin.orders.update.status'));
    }
    const onCancelHandler = (order: any) => {
        setData((prevData) => ({ ...prevData, order_id: order.id }));
        setData((prevData) => ({ ...prevData, status: "cancelled" }));
        patch(route('admin.orders.update.status'));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Orders</h2>}
        >
            <Head title="Orders" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <OrderList onCancel={onCancelHandler} onConfirm={onConfirmHandler} orders={orders} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
