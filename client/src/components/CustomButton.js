function CustomButton({label, primary, onClick}) {
    return (
        <button className={`${primary ? "bg-sky-500 text-white" : "bg-gray-100 text-gray-700" } px-6 py-4 rounded-2xl text-2xl `} onClick={onClick}>{label}</button>
    );
}

export default CustomButton;