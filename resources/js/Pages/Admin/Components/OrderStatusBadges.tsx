
export enum OrderStatus {
    'placed' = "placed",
    'confirmed' = 'confirmed',
    'canceled' = 'canceled',
    'completed' = 'completed',
    'make' = 'make'
}

export default function OrderStatusBadges({ status }: { status: OrderStatus }) {
    if (status === OrderStatus.placed) {
        return <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-orange-300 ring-1 ring-inset ring-gray-500/10">
            قرار داده شده
        </span>
    } else if (status === OrderStatus.confirmed) {
        return <span className="inline-flex items-center rounded-md bg-yellow-400 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10">
            تکمیل
        </span>
    } else if (status === OrderStatus.make) {
        return <span className="inline-flex items-center rounded-md bg-orange-300 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10">
            در ساخت
        </span>
    } else if (status === OrderStatus.completed) {
        return <span className="inline-flex items-center rounded-md bg-green-600 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10">
            تکمیل
        </span>
    } else {
        return <span className="inline-flex items-center rounded-md bg-red-600 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10">
            لغو
        </span>
    }

}
