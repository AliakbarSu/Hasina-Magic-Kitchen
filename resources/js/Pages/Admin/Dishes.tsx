import { Dish } from '@/types/application';
import axios from 'axios';
import { useState } from 'react';

export default function Dishes({ dishes }: { dishes: Dish[] }) {
    const [allDishes, setAllDishes] = useState<Dish[]>(dishes);

    const onDeleteDish = async (id: string) => {
        axios
            .delete(`/api/dish/${id}`)
            .catch((err) => {
                console.log(err.response.data);
            })
            .then(() => {
                setAllDishes(allDishes.filter((dish) => dish.id !== id));
                alert('Category deleted successfully');
            });
    };

    return (
        <div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Description
                                        </th>
                                        <th
                                            scope="col"
                                            className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                        >
                                            <span className="sr-only">
                                                Delete
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {allDishes.map((dish) => (
                                        <tr key={dish.id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {dish.name}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {dish.description}
                                            </td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <span
                                                    onClick={() =>
                                                        onDeleteDish(dish.id)
                                                    }
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    Delete
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
