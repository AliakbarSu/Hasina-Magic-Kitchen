import { useForm } from "@inertiajs/react";
import { Order } from "../Orders";

const orderStatus = [
    { id: 'confirm', title: 'Confirm' },
    { id: 'reject', title: 'Reject' },
    { id: 'cancel', title: 'Cancel' },
]

export default function OrderStatusActions({ onSelect, order }: { onSelect: (value: string) => void, order: Order }) {
    const { data, setData, patch, processing, errors, reset, setError } = useForm({
        status: "pending",
        order_id: ""
    });

    const onSelectHandler = (status: string) => {
        setData({ status: status, order_id: order.id })
    }

    const onSubmitHandler = () => {
        patch(route('admin.orders.update.status'));
    }
    return (
        <div>
            <label className="text-base font-semibold text-gray-900">Status</label>
            <p className="text-sm text-gray-500">Your order status</p>
            <fieldset className="mt-4">
                <legend className="sr-only">Order Status</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                    {orderStatus.map((orderStatus) => (
                        <div key={orderStatus.id} className="flex items-center">
                            <input
                                id={orderStatus.id}
                                name={order.id + "order-status"}
                                type="radio"
                                defaultChecked={orderStatus.id === 'confirm'}
                                onChange={() => onSelectHandler(orderStatus.id)}
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label htmlFor={orderStatus.id} className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                                {orderStatus.title}
                            </label>
                        </div>
                    ))}
                </div>
            </fieldset>
            <div className="py-3">
                <button
                    onClick={onSubmitHandler}
                    type="button"
                    className="flex w-1/6 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-2.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:flex-grow-0"
                >
                    Update
                </button>
            </div>

        </div>
    )
}
