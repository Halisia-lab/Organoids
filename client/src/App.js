
import React, { useState, useEffect } from "react";
import { fetchImageById, fetchImagesInTesting, fetchImagesInTraining, fetchImagesInValidation } from "./services/image.service";
import { fetchSegmentationByImageId, updateSegmentationBrightnessById, updateSegmentationContrastById } from "./services/segmentation.service";
import Slider from "@mui/material/Slider";


function App() {

  const [activeTab, setActiveTab] = useState('Testing');

  const defaultOpacity = 50;
  const defaultBrightness = 100;
  const defaultContrast = 100;



  const [imageList, setImageList] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [mainSegmentation, setMainSegmentation] = useState(null);

  const [displayMask, setDisplayMask] = useState(true);

  const [opacity, setOpacity] = useState(defaultOpacity);
  const [brightness, setBrightness] = useState(defaultBrightness);
  const [contrast, setContrast] = useState(defaultContrast);

  const [brightnessDisplayer, setBrightnessDisplayer] = useState(defaultBrightness);
  const [contrastDisplayer, setContrastDisplayer] = useState(defaultBrightness);

  const S3_BUCKET_URL = process.env.REACT_APP_S3_URL;

  useEffect(() => {
    uploadTestingImages();



  }, []);

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

  const uploadValidationImages = async () => {
    setActiveTab("Validation");
    try {
      const images = await fetchImagesInValidation();
      setImageList(images);

      if (images.length > 0) {
        const firstImage = images[0];
        setMainImage(firstImage);

        await synchroniseSegmentationSettings(firstImage.id)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const uploadTestingImages = async () => {

    setActiveTab("Testing");
    try {
      const images = await fetchImagesInTesting();
      setImageList(images);

      if (images.length > 0) {
        const firstImage = images[0];
        setMainImage(firstImage);

        await synchroniseSegmentationSettings(firstImage.id);

      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const uploadTrainingImages = async () => {
    setActiveTab("Training");
    try {
      const images = await fetchImagesInTraining();
      setImageList(images.slice(0, 100));

      if (images.length > 0) {
        const firstImage = images[0];
        setMainImage(firstImage);

        await synchroniseSegmentationSettings(firstImage.id);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }


  return (
    <div className="App">
      <header className="bg-gradient-to-r from-[#0e0327] to-[#3533cd] h-screen p-10 overflow-hidden flex flex-col justify-evenly">

        <div className="flex flex-col text-white text-center py-5 font-mono">

          <div className="text-[35px]">MouseOrganoids Analysis</div>
          <div className="uppercase text-2xl">Choose an image</div>
        </div>

        <div className="grid grid-cols-4 grid-rows-8 text-white gap-3 font-mono max-h-1/2">

          {/* 1ere ligne */}
          <button className={`${activeTab === "Testing" ? "text-sky-300" : ""} bg-black bg-opacity-30 text-2xl py-4 text-center hover:cursor-pointer hover:bg-sky-500 hover:text-black`} onClick={uploadTestingImages}>Testing</button>
          <div className="col-span-2 bg-black bg-opacity-30 place-items-center row-span-6 py-4"> {imageList && mainSegmentation && mainSegmentation.url ? (
            <div className="flex justify-center relative">
              <img src={`${S3_BUCKET_URL}/${mainImage.url}`} alt={mainImage.name} className="w-[778px] h-[583px]" />
              <img src={`${S3_BUCKET_URL}/${mainSegmentation.url}`} alt={mainSegmentation.name} style={{ filter: `brightness(${brightness}%) contrast(${contrast}%)`, opacity: opacity / 100, }} className={`w-[778px] h-[583px] absolute z-10 ${displayMask ? "" : "hidden"}`} />
            </div>
          ) : (
            <div className="flex justify-center text-center">Loading...</div>
          )}</div>
          <div className="row-span-8 bg-black bg-opacity-30 flex flex-col items-center justify-around text-lg">
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" onChange={handleToggleChange} defaultChecked={true} />
              <div className="relative w-20 h-10 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-10 after:w-10 after:transition-all peer-checked:bg-sky-500"></div>
              <span className="ms-3 text-xl font-medium text-gray-100">Show mask</span>
            </label>


            <div className="w-1/2 flex flex-col">Opacity :<div className="flex space-x-6 items-center"><Slider sx={{ color: "#f3f4f6" }} defaultValue={opacity} value={opacity} onChange={handleOpacityChange} disabled={!displayMask} /> <p>{opacity}</p></div></div>
            <div className="w-1/2 flex flex-col">Brightness :<div className="flex space-x-6 items-center"><Slider sx={{ color: "#f3f4f6" }} defaultValue={brightness} value={brightness} onChange={handleBrightnessChange} disabled={!displayMask} /><p>{brightness}</p></div></div>
            <div className="w-1/2 flex flex-col">Contrast :<div className="flex space-x-6 items-center"><Slider sx={{ color: "#f3f4f6" }} defaultValue={contrast} value={contrast} onChange={handleContrastChange} disabled={!displayMask} /><p>{contrast}</p></div></div>

            <div className="flex flex-row space-x-5">
              <button className="bg-sky-500 px-6 py-4 rounded-2xl text-2xl" onClick={saveSettings}>Save settings</button>
              <button className="bg-gray-100 px-6 py-4 rounded-2xl text-2xl text-gray-700" onClick={resetSettings}>Undo</button>
            </div>

          </div>

          {/* 2e ligne */}
          <button className={`${activeTab === "Training" ? "text-sky-300" : ""} bg-black bg-opacity-30 text-2xl py-4 text-center hover:cursor-pointer hover:bg-sky-500 hover:text-black`} onClick={uploadTrainingImages}>Training</button>

          {/* 3e ligne */}
          <button className={`${activeTab === "Validation" ? "text-sky-300" : ""} bg-black bg-opacity-30 text-2xl py-4 text-center hover:cursor-pointer hover:bg-sky-500 hover:text-black`} onClick={uploadValidationImages}>Validation</button>

          {/* 4e ligne */}
          <div className="row-span-5 flex flex-col bg-black bg-opacity-30 text-xl py-4 px-5 justify-evenly">
            <div className="flex justify-center text-2xl">Saved Settings</div>
            <div>
              <div className="flex items-center">
                <svg className="w-10 h-10 mx-3 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5V3m0 18v-2M7.05 7.05 5.636 5.636m12.728 12.728L16.95 16.95M5 12H3m18 0h-2M7.05 16.95l-1.414 1.414M18.364 5.636 16.95 7.05M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
                </svg>
                Brightness</div>
              <div className="text-[30px] p-3 mx-12">{brightnessDisplayer}</div>
            </div>
            <div>
              <div className="flex items-center"><svg className="mx-3" fill="#ffffff" width="30" height="30" xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 508.47"><path fillRule="nonzero" d="M254.23 508.47c-3.94 0-7.87-.1-11.77-.28h-1.54v-.07c-64.9-3.34-123.37-31.04-166.45-74.12C28.46 387.99 0 324.42 0 254.23c0-70.19 28.46-133.75 74.47-179.76C117.55 31.39 176.03 3.69 240.92.34V.27h1.54c3.9-.18 7.83-.27 11.77-.27l3.46.02.08-.02c70.19 0 133.75 28.46 179.76 74.47 46 46.01 74.47 109.57 74.47 179.76S483.53 387.99 437.53 434c-46.01 46.01-109.57 74.47-179.76 74.47l-.08-.03-3.46.03zm-13.31-30.56V30.56C184.33 33.87 133.4 58.17 95.79 95.79c-40.55 40.54-65.62 96.56-65.62 158.44 0 61.89 25.07 117.91 65.62 158.45 37.61 37.61 88.54 61.91 145.13 65.23z" />
              </svg> Contrast</div>
              <div className="text-[30px] p-3 mx-12">{contrastDisplayer}</div>
            </div>
            <div><div className="flex items-center"><svg className="mx-3" fill="#ffffff" width="40" height="40" xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 301.57"><path fillRule="nonzero" d="M65.11 107.53 253.54 1.15a8.968 8.968 0 0 1 8.82.02l188.27 107.31c4.31 2.45 5.83 7.94 3.38 12.25a8.987 8.987 0 0 1-3.13 3.23L264.6 237.36c-2.99 1.83-6.64 1.69-9.44-.05L64.4 123.34c-4.25-2.55-5.64-8.07-3.09-12.32a8.912 8.912 0 0 1 3.8-3.49zm253.74 176.35c4.79 1.26 7.66 6.19 6.4 10.99-1.26 4.79-6.19 7.66-10.98 6.4l-30.27-8c-4.8-1.26-7.67-6.19-6.4-10.99l8.15-30.84c1.26-4.8 6.18-7.66 10.98-6.4 4.8 1.26 7.67 6.18 6.41 10.98l-2.81 10.61 179.38-103.48-9.85-2.64c-4.8-1.28-7.65-6.22-6.37-11.01 1.28-4.8 6.22-7.66 11.02-6.38l30.81 8.26c4.8 1.28 7.65 6.22 6.37 11.02l-8.1 30.24c-1.28 4.8-6.22 7.65-11.02 6.37-4.8-1.28-7.65-6.22-6.37-11.02l2.49-9.3-178.42 102.92 8.58 2.27zm-115.09 17.38c-4.96.41-9.32-3.28-9.72-8.23-.4-4.96 3.28-9.32 8.24-9.72l9.07-.77-187.91-112.3 2.36 8.82c1.28 4.79-1.57 9.73-6.37 11.01-4.8 1.29-9.74-1.57-11.02-6.37l-8.1-30.23c-1.28-4.8 1.57-9.74 6.37-11.02l30.81-8.26c4.8-1.28 9.74 1.57 11.02 6.37 1.28 4.8-1.57 9.73-6.37 11.02l-10.28 2.75 191.55 114.49-.87-10.23c-.4-4.95 3.28-9.31 8.24-9.71 4.95-.41 9.31 3.28 9.71 8.23l2.7 31.79c.41 4.95-3.28 9.31-8.23 9.72l-31.2 2.64zM257.9 19.29 86.88 115.84l173 103.36L428.5 116.54 257.9 19.29z" />
            </svg> Mask Area</div>
              <div className="text-[30px] p-3 mx-12">0</div>
            </div>
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
              <p>Loading...</p>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
