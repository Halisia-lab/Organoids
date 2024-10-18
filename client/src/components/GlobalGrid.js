import React, { useState, useEffect } from "react";
import { fetchImageById, fetchImagesInTesting, fetchImagesInTraining, fetchImagesInValidation } from "../services/image.service";
import { fetchSegmentationByImageId, updateSegmentationOpacityById } from ".././services/segmentation.service";
import {updateImageBrightnessById, updateImageContrastById} from "../services/image.service"
import Tab from "./Tab";
import SettingsSlider from "./SettingsSlider";
import ShowMaskToggle from "./ShowMaskToggle";
import MainImageSuperposition from "./MainImageSuperposition";
import SettingsDisplayer from "./SettingsDisplayer";
import ImagesGallery from "./ImagesGallery";
import CustomButton from "./CustomButton";

function GlobalGrid() {

    const [activeTab, setActiveTab] = useState('Testing');
    const [displayMask, setDisplayMask] = useState(true);

    const defaultOpacity = 50;
    const defaultBrightness = 0;
    const defaultContrast = 0;

    const [imageList, setImageList] = useState([]);
    const [mainImage, setMainImage] = useState(null);
    const [mainSegmentation, setMainSegmentation] = useState(null);

    const [testingImages, setTestingImages] = useState([]);
    const [trainingImages, setTrainingImages] = useState([]);
    const [validationImages, setValidationImages] = useState([]);

    const [opacity, setOpacity] = useState(defaultOpacity);
    const [brightness, setBrightness] = useState(defaultBrightness);
    const [contrast, setContrast] = useState(defaultContrast);

    const [opacityDisplayer, setOpacityDisplayer] = useState(defaultOpacity);
    const [brightnessDisplayer, setBrightnessDisplayer] = useState(defaultBrightness);
    const [contrastDisplayer, setContrastDisplayer] = useState(defaultContrast);

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
                    await synchroniseSettings(firstImage.id);
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
        setMainImage({ id: image.id, name: image.name, url: image.url, brightness: image.brightness, contrast: image.contrast });
        await synchroniseSettings(image.id);
    }

    const synchroniseSettings = async (imageId) => { 
        const segmentation = await fetchSegmentationByImageId(imageId);
        const image = await fetchImageById(imageId);
        setMainSegmentation(segmentation);
        setBrightness(image.brightness);
        setContrast(image.contrast);
        setOpacity(segmentation.opacity)
        setOpacityDisplayer(segmentation.opacity);
        setBrightnessDisplayer(image.brightness);
        setContrastDisplayer(image.contrast);
    }

    const resetSettings = async (event) => {
        const segmentation = await fetchSegmentationByImageId(mainSegmentation.id);
        const image = await fetchImageById(mainImage.id);
        setOpacity(segmentation.opacity);
        setBrightness(image.brightness);
        setContrast(image.contrast);
    }

    const saveSettings = (event) => { 
        updateSegmentationOpacityById(mainSegmentation.id, opacity);
        updateImageBrightnessById(mainImage.id, brightness);
        updateImageContrastById(mainImage.id, contrast);
        setOpacityDisplayer(opacity);
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

                await synchroniseSettings(firstImage.id)
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
                <SettingsSlider label={"Mask Opacity"} value={opacity} handleChange={handleOpacityChange} disabled={!displayMask} negativeValues={false} />
                <SettingsSlider label={"Brightness"} value={brightness} handleChange={handleBrightnessChange} disabled={false} negativeValues={true}/>
                <SettingsSlider label={"Contrast"} value={contrast} handleChange={handleContrastChange} disabled={false} negativeValues={true} />
                
                <div className="flex flex-col xl:flex-row space-x-5">
                <CustomButton label={"Save settings"} primary={true} onClick={saveSettings}/>
                <CustomButton label={"Undo"} primary={false} onClick={resetSettings}/>
                </div>
            </div>

            {/* 2nd row*/}
            <Tab name="Training" changeTab={changeTab} activeTab={activeTab} />

            {/* 3rd row */}
            <Tab name="Validation" changeTab={changeTab} activeTab={activeTab} />

            {/* 4th row */}
            <div className="row-span-5 flex flex-col bg-black bg-opacity-30 text-xl py-4 px-5 justify-evenly">
                <SettingsDisplayer opacity={opacityDisplayer} brightness={brightnessDisplayer} contrast={contrastDisplayer} />
            </div>

            <div className="col-span-2 bg-black bg-opacity-30 row-span-2 overflow-x-scroll flex space-x-3 py-4 items-center px-4">
                <ImagesGallery imageList={imageList} mainImage={mainImage} chooseImage={chooseImage} />
            </div>
        </div>
    );
}

export default GlobalGrid;