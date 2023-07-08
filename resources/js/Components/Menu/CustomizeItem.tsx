import { Menu } from '@/types/application';
import { formatNZD } from '@/utils/currentcy';
import { AddExtraDish } from './AddExtraDish';
import { MenuItems } from './MenuItems';
import { useSelector } from 'react-redux';

const policies = [
    {
        name: 'International delivery',
        description: 'Get your order in 2 years',
    },
    {
        name: 'Loyalty rewards',
        description: "Don't look at other tees",
    },
];

export function CustomizeItem() {
    const selectedMenu = useSelector((state: any) => state.menu.selectedMenu);
    return (
        <div className="bg-white">
            <div className="pb-4 pt-6 sm:pb-4">
                <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
                        <div className="lg:col-span-5 lg:col-start-8">
                            <div className="flex justify-between">
                                <h1 className="text-xl font-medium text-gray-900">
                                    {selectedMenu.name}
                                </h1>
                                <p className="text-xl font-medium text-gray-900">
                                    {formatNZD(selectedMenu.price)}
                                </p>
                            </div>
                        </div>

                        {/* Image and Description */}
                        <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
                            <h2 className="sr-only">Images</h2>

                            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 ">
                                <img
                                    src={`https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80`}
                                    alt={'food'}
                                    className={'col-span-2 row-span-2'}
                                />
                                <div className="mt-10 col-span-2 ">
                                    <h2 className="text-sm font-medium text-gray-900 ">
                                        Description
                                    </h2>

                                    <div
                                        className="prose prose-sm mt-4 text-gray-500"

                                    >{selectedMenu.description}</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 lg:col-span-5">
                            {/* Product details */}
                            <MenuItems menu={selectedMenu} items={selectedMenu.dishes} />
                            <AddExtraDish />
                            {/* <Tags /> */}
                            {/* Policies */}
                            {/* <section
                                aria-labelledby="policies-heading"
                                className="mt-10"
                            >
                                <h2 id="policies-heading" className="sr-only">
                                    Our Policies
                                </h2>

                                <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                                    {policies.map((policy) => (
                                        <div
                                            key={policy.name}
                                            className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center"
                                        >
                                            <dt>
                                                <span className="mt-4 text-sm font-medium text-gray-900">
                                                    {policy.name}
                                                </span>
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-500">
                                                {policy.description}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </section> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

