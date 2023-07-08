import { ClockIcon } from "@heroicons/react/20/solid";


export function TimeInput(props: {
    state: string;
    setState: (value: string) => void;
}) {
    return (
        <div>
            <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                Time
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <ClockIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                </div>
                <input
                    value={props.state}
                    onChange={(e) => props.setState(e.target.value)}
                    type="time"
                    name="time"
                    id="time"
                    className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Select time"
                />
            </div>
        </div>
    );
}