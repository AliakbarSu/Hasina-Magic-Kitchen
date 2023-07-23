import { useRef, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { Category, Dish } from '@/types/application';
import axios from 'axios';
import Dishes from './Dishes';

export default function AddDish({
    auth,
    categories,
    dishes,
}: PageProps<{ categories: Category[]; dishes: Dish[] }>) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const fileRef = useRef(null);
    const [photoPreviews, setPhotoPreviews] = useState<
        string[] | ArrayBuffer[]
    >([]);
    const { data, setData, reset, errors, setError, clearErrors } = useForm({
        name: '',
        price: '',
        description: '',
        category: categories.at(0)?.id,
        image: '',
    });

    const onAddDishSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (photoPreviews.length == 0) {
            setError('image', 'Please upload a photo');
            return;
        }
        try {
            clearErrors();
            setLoading(true);
            const result = await axios.post('/api/dish', data);
            const dishId = result.data.id;
            await uploadphotos(dishId);
            reset();
            setPhotoPreviews([]);
            setMessage('Dish added successfully');
        } catch (err: unknown) {
            type ErrorType = {
                response: {
                    data: {
                        errors: { [key: string]: string };
                    };
                };
            };
            if ((err as ErrorType).response.data.errors) {
                const errors = (err as ErrorType).response.data.errors;
                const keys = Object.keys(errors) as (keyof typeof data)[];
                keys.forEach((key) => {
                    setError(key, errors[key][0]);
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const uploadphotos = (id: string) => {
        const form = new FormData();
        form.append('id', id);
        if (
            fileRef?.current &&
            (fileRef?.current as { files: File[] }).files.length > 0
        ) {
            form.append(
                'image',
                (fileRef?.current as { files: File[] }).files[0]
            );
            return axios.post('/api/dish/media', form);
        } else {
            return Promise.resolve();
        }
    };

    const setPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = (e.target as unknown as { files: File[] }).files;
        for (let i = 0; i < files.length; i++) {
            setPhotoPreviews(
                (prevs) =>
                    [...prevs, URL.createObjectURL(files[i])] as
                        | string[]
                        | ArrayBuffer[]
            );
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Add a Dish
                </h2>
            }
        >
            <Head title="Orders" />
            <div className="mx-auto my-6 max-w-4xl">
                <Dishes dishes={dishes} />
                <form onSubmit={onAddDishSubmit}>
                    {/* <input type="hidden" name="_token" value={ } /> */}
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            {message.length > 0 && (
                                <p className="mt-1 text-md leading-6 text-green-600">
                                    {message}
                                </p>
                            )}

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <label
                                        htmlFor="username"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Dish Name
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                value={data.name}
                                                type="text"
                                                name="name"
                                                id="name"
                                                onChange={(e) =>
                                                    setData(
                                                        'name',
                                                        e.target.value
                                                    )
                                                }
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                placeholder="Mantoo"
                                            />
                                        </div>
                                        {errors.name && (
                                            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-2 ml-1">
                                                {errors.name}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label
                                        htmlFor="price"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Price
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                value={data.price}
                                                type="number"
                                                name="price"
                                                id="price"
                                                onChange={(e) =>
                                                    setData(
                                                        'price',
                                                        e.target.value
                                                    )
                                                }
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                placeholder="24.0"
                                            />
                                        </div>
                                        {errors.price && (
                                            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-2 ml-1">
                                                {errors.price}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label
                                        htmlFor="description"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Description
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            value={data.description}
                                            id="description"
                                            name="description"
                                            rows={3}
                                            onChange={(e) =>
                                                setData(
                                                    'description',
                                                    e.target.value
                                                )
                                            }
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    {errors.description && (
                                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-2 ml-1">
                                            {errors.description}
                                        </span>
                                    )}
                                    <p className="mt-3 text-sm leading-6 text-gray-600">
                                        Write a few sentences about the dish.
                                    </p>
                                </div>

                                <div className="col-span-full">
                                    <label
                                        htmlFor="photo"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Dish Photo
                                    </label>
                                    <div className="mt-2 flex items-center gap-x-3">
                                        {photoPreviews.length == 0 && (
                                            <UserCircleIcon
                                                className="h-12 w-12 text-gray-300"
                                                aria-hidden="true"
                                            />
                                        )}
                                        <div>
                                            {photoPreviews.map((preview, i) => (
                                                <img
                                                    className="h-10 w-10 rounded-full"
                                                    src={preview as string}
                                                    key={i}
                                                    alt=""
                                                />
                                            ))}
                                        </div>
                                        <input
                                            onChange={setPreview}
                                            accept="image/jpg,png"
                                            multiple
                                            ref={fileRef}
                                            type="file"
                                            id="photo"
                                            name="photo"
                                            hidden
                                        />
                                        <button
                                            onClick={() =>
                                                (
                                                    fileRef?.current as unknown as HTMLInputElement
                                                ).click()
                                            }
                                            type="button"
                                            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                        >
                                            Change
                                        </button>
                                    </div>
                                    {errors.image && (
                                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-2 ml-1">
                                            {errors.image}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="border-b border-gray-900/10 pb-12">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="category"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Category
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            value={data.category}
                                            onChange={(e) =>
                                                setData(
                                                    'category',
                                                    e.target.value
                                                )
                                            }
                                            id="category"
                                            name="category"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            {categories.map(({ name, id }) => (
                                                <option key={id} value={id}>
                                                    {name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.category && (
                                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-2 ml-1">
                                            {errors.category}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            type="button"
                            className="text-sm font-semibold leading-6 text-gray-900"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={loading}
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {loading ? 'Submitting' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
