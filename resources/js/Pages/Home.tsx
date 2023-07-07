import MenuComponent from '@/Components/Menu';
import Header from '@/Layouts/Header';
import Nav from '@/Layouts/Nav';
import Filter from '@/Components/Filter';
import { Menu } from '@/types/application';
import { Footer } from '@/Components/UI/Footer';

function Home({ menu }: { menu: Menu[] }) {
    return (
        <>
            <Nav />
            <Header />
            <Filter />
            {/* <Deal /> */}
            <MenuComponent menu={menu} />
            <Footer />
        </>
    );
}

export default Home;





function Deal() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:pt-12 lg:max-w-7xl">
                <div className="relative overflow-hidden rounded-lg lg:h-96">
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                            alt=""
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                    <div
                        aria-hidden="true"
                        className="relative h-96 w-full lg:hidden"
                    />
                    <div
                        aria-hidden="true"
                        className="relative h-32 w-full lg:hidden"
                    />
                    <div className="absolute inset-x-0 bottom-0 rounded-bl-lg rounded-br-lg bg-orange-600 bg-opacity-75 p-6 backdrop-blur backdrop-filter sm:flex sm:items-center sm:justify-between lg:inset-x-auto lg:inset-y-0 lg:w-96 lg:flex-col lg:items-start lg:rounded-br-none lg:rounded-tl-lg">
                        <div>
                            <h2 className="text-6xl font-bold text-white">
                                Combo Deals!
                            </h2>
                            <p className="mt-1 text-xl text-gray-100">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. starting from just $27!
                            </p>
                        </div>
                        <a
                            href="#"
                            className="mt-6 text-xl font-extrabold flex flex-shrink-0 items-center justify-center rounded-md border border-white border-opacity-25 bg-white bg-opacity-0 px-4 py-3 text-white hover:bg-opacity-10 sm:ml-8 sm:mt-0 lg:ml-0 lg:w-full"
                        >
                            Order Now!
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ----------------------------------------------------------------
const products = [
    {
        id: 1,
        name: 'Basic Tee 8-Pack',
        href: '#',
        price: '$256',
        description:
            'Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.',
        options: '8 colors',
        imageSrc:
            'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-01.jpg',
        imageAlt:
            'Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.',
    },
    {
        id: 2,
        name: 'Basic Tee',
        href: '#',
        price: '$32',
        description:
            'Look like a visionary CEO and wear the same black t-shirt every day.',
        options: 'Black',
        imageSrc:
            'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-02.jpg',
        imageAlt: 'Front of plain black t-shirt.',
    },
    // More products...
];

