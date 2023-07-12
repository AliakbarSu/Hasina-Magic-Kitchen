import { Head } from '@inertiajs/react'
import Nav from '@/Layouts/Nav'
import Header from '@/Layouts/Header'
import { Footer } from '@/Components/UI/Footer'

import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
    { name: 'Product', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Resources', href: '#' },
    { name: 'Company', href: '#' },
]
const stats = [
    { label: 'Meals delieverd', value: '44000' },
    { label: 'Customers served', value: '122' },
    { label: 'Positive reviews recieved', value: '101' },
]
const values = [
    {
        name: 'Authenticity',
        description:
            'We are committed to preserving the authentic flavors and culinary techniques of Middle Eastern and Afghan cuisine. Every dish we prepare reflects the true essence of these cultures, ensuring an immersive dining experience for our customers.',
    },
    {
        name: 'Quality Ingredients',
        description:
            'We believe that great food starts with the finest ingredients. We meticulously source fresh, high-quality ingredients to create flavorful and wholesome dishes that satisfy even the most discerning palates.',
    },
    {
        name: 'Cultural Appreciation',
        description:
            'Our passion extends beyond food. We strive to foster an appreciation for Middle Eastern and Afghan cultures by showcasing their culinary heritage. Through our dishes, we aim to share the rich traditions, stories, and customs that make these regions so captivating.',
    },
    {
        name: 'Exquisite Flavors',
        description:
            'Our chefs masterfully combine aromatic spices, herbs, and seasonings to create an explosion of flavors in each bite. We take pride in delivering a culinary experience that leaves a lasting impression and keeps our customers coming back for more.',
    },
    {
        name: 'Cultural Exchange',
        description:
            'We believe that food has the power to bring people together and foster cultural exchange. Through our cuisine, we aim to bridge gaps, promote understanding, and create a sense of unity by sharing the delicious and diverse flavors of the Middle East and Afghanistan.',
    },
    {
        name: 'Customer Satisfaction',
        description:
            'Your satisfaction is our top priority. We go the extra mile to ensure that each customer\'s experience exceeds expectations.Our team is responsive, accommodating, and dedicated to providing exceptional service that leaves you delighted and satisfied.',
    },
]
const team = [
    {
        name: 'Hasina Dilawari',
        role: 'Founder & Chief',
        imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    },
    // More people...
]
const blogPosts = [
    {
        id: 1,
        title: 'Vel expedita assumenda placeat aut nisi optio voluptates quas',
        href: '#',
        description:
            'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
        imageUrl:
            'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
        date: 'Mar 16, 2020',
        datetime: '2020-03-16',
        author: {
            name: 'Michael Foster',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    },
    // More posts...
]


export default function About() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    return (
        <div>
            <Head title='About' />
            <Nav />
            <div className="bg-white pb-24">


                <main className="isolate">
                    {/* Hero section */}
                    <div className="relative isolate -z-10">
                        <svg
                            className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
                            aria-hidden="true"
                        >
                            <defs>
                                <pattern
                                    id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                                    width={200}
                                    height={200}
                                    x="50%"
                                    y={-1}
                                    patternUnits="userSpaceOnUse"
                                >
                                    <path d="M.5 200V.5H200" fill="none" />
                                </pattern>
                            </defs>
                            <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                                <path
                                    d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                                    strokeWidth={0}
                                />
                            </svg>
                            <rect width="100%" height="100%" strokeWidth={0} fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)" />
                        </svg>
                        <div
                            className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
                            aria-hidden="true"
                        >
                            <div
                                className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                                style={{
                                    clipPath:
                                        'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
                                }}
                            />
                        </div>
                        <div className="overflow-hidden">
                            <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
                                <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                                    <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                            Discover the Authentic Flavors of Middle Eastern and Afghan Cuisine.
                                        </h1>
                                        <p className="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                                            Welcome to our culinary journey through the rich and vibrant flavors of Middle Eastern and Afghan cuisine.
                                            At Hasina's Magic Kitchen, we are passionate about bringing you an authentic dining experience that tantalizes your
                                            taste buds and transports you to the heart of these fascinating cultures.
                                        </p>
                                    </div>
                                    <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                                        <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                                            <div className="relative">
                                                <img
                                                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                                                    alt=""
                                                    className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                                />
                                                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                            </div>
                                        </div>
                                        <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                                            <div className="relative">
                                                <img
                                                    src="https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                                                    alt=""
                                                    className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                                />
                                                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                            </div>
                                            <div className="relative">
                                                <img
                                                    src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=396&h=528&q=80"
                                                    alt=""
                                                    className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                                />
                                                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                            </div>
                                        </div>
                                        <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                                            <div className="relative">
                                                <img
                                                    src="https://images.unsplash.com/photo-1670272504528-790c24957dda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=left&w=400&h=528&q=80"
                                                    alt=""
                                                    className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                                />
                                                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                            </div>
                                            <div className="relative">
                                                <img
                                                    src="https://images.unsplash.com/photo-1670272505284-8faba1c31f7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                                                    alt=""
                                                    className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                                />
                                                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content section */}
                    <div className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8">
                        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our mission</h2>
                            <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
                                <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                                    <p className="text-xl leading-8 text-gray-600">
                                        We take great pride in sourcing the finest ingredients to ensure an authentic dining experience.
                                        Each dish is prepared with meticulous attention to detail, using traditional cooking
                                        techniques that capture the true essence of Middle Eastern and Afghan cuisine.
                                        Whether you're planning a corporate event, wedding, or intimate gathering,
                                        our catering services will elevate your occasion and leave a lasting impression on your guests.
                                    </p>
                                    <div className="mt-10 max-w-xl text-base leading-7 text-gray-700">
                                        <p>
                                            Experience the warmth and hospitality of Afghan cuisine, where bold flavors and wholesome ingredients take center stage.
                                            From succulent kabuli pulao to savory mantu dumplings and comforting qorma, our Afghan dishes are a
                                            testament to the rich cultural heritage and culinary expertise of this captivating region.
                                        </p>
                                        <p className="mt-10">
                                            Immerse yourself in the culinary traditions of the Middle East, where our skilled chefs artfully blend spices, herbs,
                                            and premium ingredients to create iconic dishes like falafel, shawarma, hummus, and tabbouleh.
                                            Savor the aromatic wonders of Persian cuisine with flavorful kebabs, fragrant rice dishes, and delectable
                                            stews that will leave you craving for more.
                                        </p>
                                    </div>
                                </div>
                                <div className="lg:flex lg:flex-auto lg:justify-center">
                                    <dl className="w-64 space-y-8 xl:w-80">
                                        {stats.map((stat) => (
                                            <div key={stat.label} className="flex flex-col-reverse gap-y-4">
                                                <dt className="text-base leading-7 text-gray-600">{stat.label}</dt>
                                                <dd className="text-5xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image section */}
                    <div className="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
                        <img
                            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                            alt=""
                            className="aspect-[5/2] w-full object-cover xl:rounded-3xl"
                        />
                    </div>

                    {/* Values section */}
                    <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:mx-0">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our values</h2>
                            {/* <p className="mt-6 text-lg leading-8 text-gray-600">
                                Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in
                                accusamus quisquam.
                            </p> */}
                        </div>
                        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                            {values.map((value) => (
                                <div key={value.name}>
                                    <dt className="font-semibold text-gray-900">{value.name}</dt>
                                    <dd className="mt-1 text-gray-600">{value.description}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    {/* Logo cloud */}
                    {/* <div className="relative isolate -z-10 mt-32 sm:mt-48">
                        <div className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 justify-center overflow-hidden [mask-image:radial-gradient(50%_45%_at_50%_55%,white,transparent)]">
                            <svg className="h-[40rem] w-[80rem] flex-none stroke-gray-200" aria-hidden="true">
                                <defs>
                                    <pattern
                                        id="e9033f3e-f665-41a6-84ef-756f6778e6fe"
                                        width={200}
                                        height={200}
                                        x="50%"
                                        y="50%"
                                        patternUnits="userSpaceOnUse"
                                        patternTransform="translate(-100 0)"
                                    >
                                        <path d="M.5 200V.5H200" fill="none" />
                                    </pattern>
                                </defs>
                                <svg x="50%" y="50%" className="overflow-visible fill-gray-50">
                                    <path d="M-300 0h201v201h-201Z M300 200h201v201h-201Z" strokeWidth={0} />
                                </svg>
                                <rect width="100%" height="100%" strokeWidth={0} fill="url(#e9033f3e-f665-41a6-84ef-756f6778e6fe)" />
                            </svg>
                        </div>
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
                                Trusted by the world’s most innovative teams
                            </h2>
                            <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                                <img
                                    className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                                    src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
                                    alt="Transistor"
                                    width={158}
                                    height={48}
                                />
                                <img
                                    className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                                    src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg"
                                    alt="Reform"
                                    width={158}
                                    height={48}
                                />
                                <img
                                    className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                                    src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg"
                                    alt="Tuple"
                                    width={158}
                                    height={48}
                                />
                                <img
                                    className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
                                    src="https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg"
                                    alt="SavvyCal"
                                    width={158}
                                    height={48}
                                />
                                <img
                                    className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
                                    src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg"
                                    alt="Statamic"
                                    width={158}
                                    height={48}
                                />
                            </div>
                        </div>
                    </div> */}

                    {/* Team section */}
                    <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-48 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:mx-0">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our team</h2>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                Sit facilis neque ab nulla vel. Cum eos in laudantium. Temporibus eos totam in dolorum. Nemo vel facere
                                repellendus ut eos dolores similique.
                            </p>
                        </div>
                        <ul
                            role="list"
                            className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
                        >
                            {team.map((person) => (
                                <li key={person.name}>
                                    <img className="mx-auto h-24 w-24 rounded-full" src={person.imageUrl} alt="" />
                                    <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                                    <p className="text-sm leading-6 text-gray-600">{person.role}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Blog section */}
                    {/* <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Dish of the Day</h2>
                            <p className="mt-2 text-lg leading-8 text-gray-600">
                                Vel dolorem qui facilis soluta sint aspernatur totam cumque.
                            </p>
                        </div>
                        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                            {blogPosts.map((post) => (
                                <article
                                    key={post.id}
                                    className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
                                >
                                    <img src={post.imageUrl} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
                                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                                    <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

                                    <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                                        <time dateTime={post.datetime} className="mr-8">
                                            {post.date}
                                        </time>
                                        <div className="-ml-4 flex items-center gap-x-4">
                                            <svg viewBox="0 0 2 2" className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                                                <circle cx={1} cy={1} r={1} />
                                            </svg>
                                            <div className="flex gap-x-2.5">
                                                <img src={post.author.imageUrl} alt="" className="h-6 w-6 flex-none rounded-full bg-white/10" />
                                                {post.author.name}
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                                        <a href={post.href}>
                                            <span className="absolute inset-0" />
                                            {post.title}
                                        </a>
                                    </h3>
                                </article>
                            ))}
                        </div>
                    </div> */}
                </main>


            </div>
            <Footer />
        </div>

    )
}