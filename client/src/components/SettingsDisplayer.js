
import SavedSettingsItem from "./SavedSettingsItem";

function SettingsDisplayer({ opacity, brightness, contrast }) {
    return (
        <>
            <div className="flex justify-center text-xl lg:text-2xl">Saved Settings</div>
            <SavedSettingsItem label={"Mask Opacity"} value={opacity} />
            <SavedSettingsItem label={"Brightness"} value={brightness} />
            <SavedSettingsItem label={"Contrast"} value={contrast} />
        </>
    );
}

export default SettingsDisplayer;