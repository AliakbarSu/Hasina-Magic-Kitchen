import { useRef, useState } from 'react'
import { Head, useForm } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types'
import axios from 'axios'


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function AddCategory({ auth }: PageProps<{}>) {

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const fileRef = useRef(null);
    const [photoPreviews, setPhotoPreviews] = useState<string[] | ArrayBuffer[]>([]);
    const { data, setData, reset, errors, setError, clearErrors } = useForm({
        name: '',
        description: ''
    })

    const onAddCategorySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            clearErrors();
            setLoading(true);
            const result = await axios.post('/api/category', data)
            reset()
            setPhotoPreviews([]);
            setMessage('Category added successfully');
        } catch (err: any) {
            if (err.response.data.errors) {
                const errors = err.response.data.errors;
                const keys = Object.keys(errors);
                keys.forEach((key) => {
                    setError(key as any, errors[key][0]);
                });
            }
        }
        finally {
            setLoading(false);
        }

    }


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add a Category</h2>}
        >
            <Head title="Add Category" />
            <div className='mx-auto my-6 max-w-4xl'>
                <form onSubmit={onAddCategorySubmit}>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Category</h2>
                            {message.length > 0 && <p className="mt-1 text-md leading-6 text-green-600">
                                {message}
                            </p>}

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Category Name
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                                            <input
                                                value={data.name}
                                                type="text"
                                                name="name"
                                                id="name"
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                placeholder="Mantoo"
                                            />

                                        </div>
                                        {errors.name && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-2 ml-1">
                                            {errors.name}
                                        </span>}
                                    </div>
                                </div>



                                <div className="col-span-full">
                                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                        Description
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            value={data.description}
                                            id="description"
                                            name="description"
                                            rows={3}
                                            onChange={(e) => setData('description', e.target.value)}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                        />
                                    </div>
                                    {errors.description && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-2 ml-1">
                                        {errors.description}
                                    </span>}
                                    <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about the category.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
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
        </AuthenticatedLayout >
    )
}
