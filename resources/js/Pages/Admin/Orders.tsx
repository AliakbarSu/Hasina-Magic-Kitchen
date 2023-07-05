import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import DeleteUserForm from './Partials/DeleteUserForm';
// import UpdatePasswordForm from './Partials/UpdatePasswordForm';
// import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import OrderList from './Components/OrderList';

export interface Order {
    id: string;
    customer_name: string;
    status: string;
    total: string;
    date: string;
    time: string;
    address: string;
    email: string;
    phone: string;
    note: string;
    created_at: string;
    addons: {
        quantity: number;
        id: string;
        items: {
            id: string;
            name: string;
        }[]
    }[]
    items: {
        quantity: string;
        menu: {
            id: string;
            name: string;
            price: string;
            description: string;
            created_at: string;
        },
        dishes: [{
            id: string;
            name: string;
        }[]]
    }[]
}

export default function Orders({ auth, mustVerifyEmail, status, orders }: PageProps<{ mustVerifyEmail: boolean, status?: string, orders: any[] }>) {
    const { data, setData, patch, processing, errors, reset, setError } = useForm({
        status: 'pending',
        order_id: '',
    });





    const onSubmitHandler = (order: any) => {
        patch(route('admin.orders.update.status'));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Orders</h2>}
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
