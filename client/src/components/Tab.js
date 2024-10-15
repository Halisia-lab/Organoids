import React from "react";

function Tab({ name, activeTab, changeTab }) {
    return (
        <button className={`${activeTab === name ? "text-sky-300" : ""} bg-black bg-opacity-30 text-2xl py-4 text-center hover:cursor-pointer hover:bg-sky-500 hover:text-black`} onClick={() => changeTab(name)}>
            {name}
        </button>
    )
}
export default Tab;