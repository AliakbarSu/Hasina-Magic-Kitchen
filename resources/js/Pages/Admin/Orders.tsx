import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import DeleteUserForm from './Partials/DeleteUserForm';
// import UpdatePasswordForm from './Partials/UpdatePasswordForm';
// import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function Orders({ auth, mustVerifyEmail, status, orders }: PageProps<{ mustVerifyEmail: boolean, status?: string, orders: any[] }>) {
    const { data, setData, patch, processing, errors, reset } = useForm({
        status: 'pending',
        order_id: '',
    });


    const updateOrderStatus = (order: any) => {
        setData((prevData) => ({ ...prevData, order_id: order.id }));
        setData((prevData) => ({ ...prevData, status: "confirmed" }));
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
                    {orders.map((order) => (
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <p className="text-gray-700 text-lg font-semibold">Order #{order.id}</p>
                            <p>Status: {order.status}</p>
                            <button onClick={() => updateOrderStatus(order)}>Update Status</button>
                        </div>
                    ))}



                </div>
            </div>
        </AuthenticatedLayout>
    );
}
