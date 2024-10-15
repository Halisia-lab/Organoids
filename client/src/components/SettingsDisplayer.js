
import SavedSettingsItem from "./SavedSettingsItem";

function SettingsDisplayer({brightness, contrast}) {
    return (
        <>
            <div className="flex justify-center text-2xl">Saved Settings</div>
            <SavedSettingsItem label={"Brightness"} value={brightness} />
            <SavedSettingsItem label={"Contrast"} value={contrast} />
            <SavedSettingsItem label={"Mask Area"} value={0} />
        </>
    );
}

export default SettingsDisplayer;