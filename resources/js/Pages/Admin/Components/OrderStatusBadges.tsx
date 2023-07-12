import { OrderStatus } from "../Orders"


export default function OrderStatusBadges({ status }: { status: OrderStatus }) {
    if (status === OrderStatus.Created) {
        return <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-orange-300 ring-1 ring-inset ring-gray-500/10">
            Created
        </span>
    } else if (status === OrderStatus.Confirmed) {
        return <span className="inline-flex items-center rounded-md bg-yellow-400 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10">
            Confirmed
        </span>
    } else if (status === OrderStatus.Make) {
        return <span className="inline-flex items-center rounded-md bg-orange-300 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10">
            Make
        </span>
    } else if (status === OrderStatus.Completed) {
        return <span className="inline-flex items-center rounded-md bg-green-600 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10">
            Completed
        </span>
    } else if (status === OrderStatus.Canceled) {
        return <span className="inline-flex items-center rounded-md bg-red-600 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10">
            Canceled
        </span>
    } else {
        return <span className="inline-flex items-center rounded-md bg-red-600 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10">
            Unknown
        </span>
    }

}
