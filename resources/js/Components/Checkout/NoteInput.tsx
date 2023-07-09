export function NoteInput(props: {
    state: string;
    setState: (value: string) => void;
}) {
    return (
        <>
            <div>
                <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-700"
                >
                    Note
                </label>
                <div className="mt-2">
                    <textarea
                        value={props.state}
                        onChange={(e) => props.setState(e.target.value)}
                        id="about"
                        name="about"
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                    Anything we should know? tell us!
                </p>
            </div>
        </>
    );
}