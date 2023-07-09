export function PhoneNumberInput(props: {
    state: string;
    setState: (value: string) => void;
}) {
    return (
        <div>
            <label
                htmlFor="mobile-number"
                className="block text-sm font-medium text-gray-700"
            >
                Mobile Number
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center">
                    <label htmlFor="country" className="sr-only">
                        Country
                    </label>
                    <select
                        id="country"
                        name="country"
                        autoComplete="country"
                        className="h-full rounded-md border-transparent bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        <option>+64</option>
                    </select>
                </div>
                <input
                    value={props.state}
                    onChange={(e) => props.setState(e.target.value)}
                    type="number"
                    name="mobile-number"
                    id="mobile-number"
                    className="block w-full rounded-md border-gray-300 pl-16 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="(555) 987-6543"
                />
            </div>
        </div>
    );
}
