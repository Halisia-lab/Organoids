function CustomButton({ label, primary, onClick }) {
    return (
        <button className={`${primary ? "bg-sky-500 text-white" : "bg-gray-100 text-gray-700"} px-2 2xl:px-5 py-3 rounded-2xl text-sm 2xl:text-xl my-2 2xl:my-0`} onClick={onClick}>
            {label}
        </button>
    );
}

export default CustomButton;