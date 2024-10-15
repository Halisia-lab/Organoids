
import Slider from "@mui/material/Slider";
import React from "react";

function SettingsSlider({label, value, handleChange, displayMask}) {
    return (
        <div className="w-1/2 flex flex-col">
            {label} :
            <div className="flex space-x-6 items-center">
                <Slider sx={{ color: "#f3f4f6" }}  value={value} onChange={handleChange} disabled={!displayMask} />
                <p>{value}</p>
            </div>
        </div>
    )
}

export default SettingsSlider;