import { Category } from "@/types/application";



const options = [
    {
        name: 'Vegetarian',

        imageUrl:
            'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1036&q=80',
    },
    {
        name: 'Vegan',

        imageUrl:
            'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },
    {
        name: 'Groumet',

        imageUrl:
            'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=984&q=80',
    },
];


function Filter({ categories }: { categories: Category[] }) {
    return (
        <ul
            role="list"
            className="mx-auto px-4 pt-24 pb-16 max-w-6xl gap-5 sm:gap-10 flex flex-wrap justify-center items-center overflow-y-scroll"
        >
            {options.map((option) => (
                <li
                    key={option.name}
                    className="flex flex-col justify-center items-center"
                >
                    <img
                        className="mx-auto h-24 w-24 rounded-full border-8 border-blue-100"
                        src={option.imageUrl}
                        alt=""
                    />
                    <h3 className="mt-6 text-md font-extrabold leading-7 tracking-tight text-gray-900">
                        {option.name}
                    </h3>
                </li>
            ))}
        </ul>
    );
}

export default Filter;

