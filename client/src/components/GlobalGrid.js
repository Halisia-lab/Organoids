import React, { useState, useEffect } from "react";
import { fetchImagesInTesting, fetchImagesInTraining, fetchImagesInValidation } from "../services/image.service";
import { fetchSegmentationByImageId, updateSegmentationBrightnessById, updateSegmentationContrastById } from ".././services/segmentation.service";
import Tab from "./Tab";
import Slider from "@mui/material/Slider";
import SettingsSlider from "./SettingsSlider";
import ShowMaskToggle from "./ShowMaskToggle";
import MainImageSuperposition from "./MainImageSuperposition";
import SettingsDisplayer from "./SettingsDisplayer";

function GlobalGrid() {

    const S3_BUCKET_URL = process.env.REACT_APP_S3_URL;

    const [activeTab, setActiveTab] = useState('Testing');
    const [displayMask, setDisplayMask] = useState(true);

    const defaultOpacity = 50;
    const defaultBrightness = 100;
    const defaultContrast = 100;

    const [imageList, setImageList] = useState([]);
    const [mainImage, setMainImage] = useState(null);
    const [mainSegmentation, setMainSegmentation] = useState(null);

    const [testingImages, setTestingImages] = useState([]);
    const [trainingImages, setTrainingImages] = useState([]);
    const [validationImages, setValidationImages] = useState([]);

    const [opacity, setOpacity] = useState(defaultOpacity);
    const [brightness, setBrightness] = useState(defaultBrightness);
    const [contrast, setContrast] = useState(defaultContrast);

    const [brightnessDisplayer, setBrightnessDisplayer] = useState(defaultBrightness);
    const [contrastDisplayer, setContrastDisplayer] = useState(defaultBrightness);

    const imagesPerTab = { "Testing": testingImages, "Training": trainingImages, "Validation": validationImages }

    useEffect(() => {
        const loadTestingTab = async () => {
            try {
                const images = await fetchImagesInTesting();
                setImageList(images);
                setTestingImages(images);

                if (images.length > 0) {
                    const firstImage = images[0];
                    setMainImage(firstImage);
                    await synchroniseSegmentationSettings(firstImage.id);
                }
            } catch (error) {
                console.error("Error loading first tab:", error);
            }
        }

        loadTestingTab();
        fetchOtherImages();
    }, []);

    const fetchOtherImages = async () => {
        setTrainingImages(await fetchImagesInTraining());
        setValidationImages(await fetchImagesInValidation());
    }

    const chooseImage = async (image) => {
        setMainImage({ id: image.id, name: image.name, url: image.url });
        await synchroniseSegmentationSettings(image.id);
    }

    const synchroniseSegmentationSettings = async (imageId) => {
        const segmentation = await fetchSegmentationByImageId(imageId);
        setMainSegmentation(segmentation);
        setBrightness(segmentation.brightness);
        setContrast(segmentation.contrast);
        setBrightnessDisplayer(segmentation.brightness);
        setContrastDisplayer(segmentation.contrast);
    }

    const resetSettings = (event) => {
        setOpacity(defaultOpacity);
        setBrightness(mainSegmentation.brightness);
        setContrast(mainSegmentation.contrast);
    }

    const saveSettings = (event) => {
        updateSegmentationBrightnessById(mainSegmentation.id, brightness);
        updateSegmentationContrastById(mainSegmentation.id, contrast);
        setBrightnessDisplayer(brightness);
        setContrastDisplayer(contrast);
    }

    const handleToggleChange = (event) => {
        setDisplayMask(event.target.checked);
    }

    const handleOpacityChange = (event) => {
        setOpacity(event.target.value);
    }

    const handleBrightnessChange = (event) => {
        setBrightness(event.target.value);
    }

    const handleContrastChange = (event) => {
        setContrast(event.target.value);
    }

    const changeTab = async (tab) => {
        setActiveTab(tab);
        try {
            const images = imagesPerTab[tab].slice(0, 100);
            setImageList(images);
            if (images.length > 0) {
                const firstImage = images[0];
                setMainImage(firstImage);

                await synchroniseSegmentationSettings(firstImage.id)
            }
        } catch (error) {
            console.error("Error changing tab:", error);
        }
    }

    return (
        <div className="grid grid-cols-4 grid-rows-8 text-white gap-3 font-mono max-h-1/2">

            {/* 1st row */}
            <Tab name="Testing" changeTab={changeTab} activeTab={activeTab} />

            <div className="col-span-2 bg-black bg-opacity-30 place-items-center row-span-6 py-4">
                <MainImageSuperposition imageList={imageList} mainImage={mainImage} mainSegmentation={mainSegmentation} brightness={brightness} contrast={contrast} opacity={opacity} displayMask={displayMask} />
            </div>

            <div className="row-span-8 bg-black bg-opacity-30 flex flex-col items-center justify-around text-lg">
                <ShowMaskToggle handleChange={handleToggleChange} />
                <SettingsSlider label={"Opacity"} value={opacity} handleChange={handleOpacityChange} displayMask={displayMask} />
                <SettingsSlider label={"Brightness"} value={brightness} handleChange={handleBrightnessChange} displayMask={displayMask} />
                <SettingsSlider label={"Contrast"} value={contrast} handleChange={handleContrastChange} displayMask={displayMask} />

                <div className="flex flex-row space-x-5">
                    <button className="bg-sky-500 px-6 py-4 rounded-2xl text-2xl" onClick={saveSettings}>Save settings</button>
                    <button className="bg-gray-100 px-6 py-4 rounded-2xl text-2xl text-gray-700" onClick={resetSettings}>Undo</button>
                </div>
            </div>

            {/* 2nd row*/}
            <Tab name="Training" changeTab={changeTab} activeTab={activeTab} />

            {/* 3rd row */}
            <Tab name="Validation" changeTab={changeTab} activeTab={activeTab} />

            {/* 4th row */}
            <div className="row-span-5 flex flex-col bg-black bg-opacity-30 text-xl py-4 px-5 justify-evenly">
                <SettingsDisplayer brightness={brightnessDisplayer} contrast={contrastDisplayer}/>
            </div>

            <div className="col-span-2 bg-black bg-opacity-30 row-span-2 overflow-x-scroll flex space-x-3 py-4 items-center px-4">
                {imageList ? (imageList.map((image) => (
                    <img
                        title={image.name}
                        key={image.name}
                        src={`${S3_BUCKET_URL}/${image.url}`}
                        alt={image.name}
                        className={` flex-shrink-0 ${mainImage.id === image.id ? "w-[205px] h-[160px]" : "w-[181px] h-[136px]"} hover:cursor-pointer hover:opacity-100 hover:w-[205px] hover:h-[160px]`}
                        onClick={() => {
                            chooseImage(image);
                        }}
                    />
                ))
                ) : (
                    <div className="flex justify-center items-center w-full h-full">Loading...</div>
                )}
            </div>
        </div>
    );
}

export default GlobalGrid;