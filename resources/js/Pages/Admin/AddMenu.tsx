import { useRef, useState } from 'react'
import { Head, useForm } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { Dish } from '@/types/application'
import axios from 'axios'


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function AddMenu({ auth, dishes }: PageProps<{ dishes: Dish[] }>) {

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const fileRef = useRef(null);
    const [photoPreviews, setPhotoPreviews] = useState<string[] | ArrayBuffer[]>([]);
    const { data, setData, reset, errors, setError, clearErrors } = useForm<{
        name: string,
        price: string,
        description: string,
        dishes: string[],
        options: string[],
        image: string
    }>({
        name: '',
        price: '',
        description: '',
        dishes: [],
        options: [],
        image: ''
    })

    const onAddMenuSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (photoPreviews.length == 0) {
            setError('image', 'Please upload a photo');
            return
        }
        try {
            clearErrors();
            setLoading(true);
            const result = await axios.post('/api/menu', data)
            const menuId = result.data.id;
            await uploadphotos(menuId)
            reset()
            setPhotoPreviews([]);
            setMessage('Menu added successfully');
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

    const uploadphotos = (id: string) => {
        const form = new FormData();
        form.append('id', id);
        if (fileRef?.current && (fileRef?.current as any).files.length > 0) {
            form.append('image', (fileRef?.current as any).files[0]);
            return axios.post('/api/menu/media', form);
        } else {
            return Promise.resolve()
        }
    }

    const setPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = (e.target as any).files;
        for (let i = 0; i < files.length; i++) {
            setPhotoPreviews((prevs) => [...prevs, URL.createObjectURL(files[i]) as any]);
        };
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add a Menu</h2>}
        >
            <Head title="add Menu" />
            <div className='mx-auto my-6 max-w-4xl'>
                <form onSubmit={onAddMenuSubmit}>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Menu</h2>
                            {message.length > 0 && <p className="mt-1 text-md leading-6 text-green-600">
                                {message}
                            </p>}

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Menu Name
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
                                                placeholder="Basic Menu"
                                            />

                                        </div>
                                        {errors.name && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-2 ml-1">
                                            {errors.name}
                                        </span>}
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                        Price
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                value={data.price}
                                                type="number"
                                                name="price"
                                                id="price"
                                                onChange={(e) => setData('price', e.target.value)}
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                placeholder="24.0"
                                            />
                                        </div>
                                        {errors.price && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-2 ml-1">
                                            {errors.price}
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
                                    <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about the menu.</p>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                        Menu Photo
                                    </label>
                                    <div className="mt-2 flex items-center gap-x-3">
                                        {photoPreviews.length == 0 && <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />}
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
                                        <input onChange={setPreview} accept='image/jpg,png' multiple ref={fileRef} type='file' id='photo' name="photo" hidden />
                                        <button
                                            onClick={() => (fileRef?.current as any).click()}
                                            type="button"

                                            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                        >
                                            Change
                                        </button>
                                    </div>
                                    {errors.image && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-2 ml-1">
                                        {errors.image}
                                    </span>}
                                </div>


                            </div>
                        </div>

                        <div className="border-b border-gray-900/10 pb-12">


                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                <div className="sm:col-span-3">
                                    <label htmlFor="dishes" className="block text-sm font-medium leading-6 text-gray-900">
                                        Dishes
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            value={data.dishes}
                                            onChange={(e) => setData('dishes', Array.from(e.target.selectedOptions, (option) => option.value))}
                                            id="dishes"
                                            name="dishes"
                                            multiple
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            {dishes.map(({ name, id }) => (<option key={id} value={id}>{name}</option>))}
                                        </select>
                                    </div>
                                    {errors.dishes && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-2 ml-1">
                                        {errors.dishes}
                                    </span>}
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="options" className="block text-sm font-medium leading-6 text-gray-900">
                                        Options
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            value={data.options}
                                            onChange={(e) => setData('options', Array.from(e.target.selectedOptions, (option) => option.value))}
                                            id="options"
                                            name="options"
                                            multiple
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            {dishes.map(({ name, id }) => (<option key={id} value={id}>{name}</option>))}
                                        </select>
                                    </div>
                                    {errors.options && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-2 ml-1">
                                        {errors.options}
                                    </span>}
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
