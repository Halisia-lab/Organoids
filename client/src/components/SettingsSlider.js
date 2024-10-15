
import Slider from "@mui/material/Slider";

function SettingsSlider({ label, value, handleChange, disabled, negativeValues }) {
    return (
        <div className="w-1/2 flex flex-col">
            {label} :
            {negativeValues ?  <div className="flex space-x-6 items-center">
                <Slider  sx={{ color: "#f3f4f6" }} value={value} onChange={handleChange} disabled={disabled}  min={-100} max={100} />
                <p>{value}</p>
            </div> :
            
            <div className="flex space-x-6 items-center">
                <Slider sx={{ color: "#f3f4f6" }} value={value} onChange={handleChange} disabled={disabled} />
                <p>{value}</p>
            </div> }
        </div>
    )
}

export default SettingsSlider;