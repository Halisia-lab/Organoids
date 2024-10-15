
import { svgMapping } from "../utils/objectsMapping";

function SavedSettingsItem({ label, value }) {
    return (
        <div>
            <div className="flex items-center">
                {svgMapping[label]} {label}</div>
            <div className="text-[30px] p-3 mx-12">{value}</div>
        </div>
    );
}

export default SavedSettingsItem;