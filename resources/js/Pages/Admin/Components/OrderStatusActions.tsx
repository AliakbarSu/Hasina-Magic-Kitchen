import { useForm } from "@inertiajs/react";
import { Order } from "../Orders";

const orderStatus = [
    { id: 'confirmed', title: 'Confirm' },
    { id: 'canceled', title: 'Cancel' },
    { id: 'make', title: 'In Progress' },
    { id: 'completed', title: 'Completed' },
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
            {/* <label className="text-base font-semibold text-gray-900">Status</label> */}
            <p className="text-sm text-gray-500">Update order status</p>
            <fieldset className="mt-4">
                <legend className="sr-only">Order Status</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                    {orderStatus.map((orderStatus) => (
                        <div key={orderStatus.id} className="flex items-center">
                            <input
                                id={orderStatus.id}
                                name={order.id + "order-status"}
                                type="radio"
                                defaultChecked={orderStatus.id === order.status}
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
                    className="rounded bg-indigo-600 px-2 py-1 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Update
                </button>

            </div>

        </div>
    )
}
