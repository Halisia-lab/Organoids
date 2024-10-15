function ShowMaskToggle({ handleChange }) {
    return (
        <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" onChange={handleChange} defaultChecked={true} />
            <div className="relative w-20 h-10 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-10 after:w-10 after:transition-all peer-checked:bg-sky-500"></div>
            <span className="ms-3 text-xl font-medium text-gray-100">Show mask</span>
        </label>
    );
}

export default ShowMaskToggle;