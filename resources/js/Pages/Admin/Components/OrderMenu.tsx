import { Order } from '../Orders';

export default function OrderMenu({ order }: { order: Order }) {
    return (
        <div className="bg-gray-900">
            <div className="mx-auto max-w-7xl">
                <div className="bg-gray-900 py-10">
                    <div className="px-4 sm:px-6 lg:px-8">
                        {/* <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <h1 className="text-base font-semibold leading-6 text-white">Users</h1>
                                <p className="mt-2 text-sm text-gray-300">
                                    A list of all the users in your account including their name, title, email and role.
                                </p>
                            </div>

                        </div> */}
                        <div className="mt-8 flow-root">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <table className="min-w-full divide-y divide-gray-700">
                                        <thead>
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="py-3.5 pl-4 pr-3 text-left text-xl font-semibold text-white sm:pl-0"
                                                >
                                                    منو
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-3 py-3.5 text-left text-xl font-semibold text-white"
                                                >
                                                    غذا
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-3 py-3.5 text-left text-xl font-semibold text-white"
                                                >
                                                    جمع
                                                </th>
                                                {/* <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                                    Role
                                                </th>
                                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                                    <span className="sr-only">Edit</span>
                                                </th> */}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-800">
                                            {order.items.map((ord) => (
                                                <tr key={ord.id}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                                                        {ord.name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                                        {ord.order_dishes
                                                            .map(
                                                                (dish) =>
                                                                    dish.name
                                                            )
                                                            .join(', ')}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                                        {ord.quantity}
                                                    </td>
                                                    {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{person.role}</td>
                                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                        <a href="#" className="text-indigo-400 hover:text-indigo-300">
                                                            Edit<span className="sr-only">, {person.name}</span>
                                                        </a>
                                                    </td> */}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
