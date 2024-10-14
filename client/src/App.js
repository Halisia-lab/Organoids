
import React, { useState, useEffect } from "react";
import { fetchImageById, fetchImagesInTesting, fetchImagesInTraining, fetchImagesInValidation } from "./services/image.service";
import { fetchSegmentationByImageId } from "./services/segmentation.service";
import Slider from "@mui/material/Slider";


function App() {

  const [activeTab, setActiveTab] = useState('Testing');

  const defaultOpacity = 50;
  const defaultBrightness = 100;
  const defaultContrast = 100;


  const [dataOpacity, setDataOpacity] = useState(defaultOpacity);
  const [dataBrightness, setDataBrightness] = useState(defaultBrightness);
  const [dataContrast, setDataContrast] = useState(defaultContrast);

  const [imageList, setImageList] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [mainSegmentation, setMainSegmentation] = useState(null);

  const [displayMask, setDisplayMask] = useState(true);

  const [opacity, setOpacity] = useState(defaultOpacity);
  const [brightness, setBrightness] = useState(defaultBrightness);
  const [contrast, setContrast] = useState(defaultContrast);



  const S3_BUCKET_URL = process.env.REACT_APP_S3_URL;

  useEffect(() => {
    uploadTestingImages();

  }, []);

  const chooseImage = (image) => {
    setMainImage({ id: image.id, name: image.name, url: image.url });
    fetchSegmentationByImageId(image.id)
      .then(res => setMainSegmentation(res))
      .catch(error => console.error("Error fetching data:", error));
  }

  const resetSettings = (event) => {
    setOpacity(defaultOpacity);
    setBrightness(defaultBrightness);
    setContrast(defaultContrast);
  }

  const saveSettings = (event) => {
    console.log(brightness);
    // update when database ready
    setDataBrightness(brightness);
    setDataContrast(contrast);
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

        const segmentation = await fetchSegmentationByImageId(firstImage.id);
        setMainSegmentation(segmentation);
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

        const segmentation = await fetchSegmentationByImageId(firstImage.id);
        setMainSegmentation(segmentation);
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

        const segmentation = await fetchSegmentationByImageId(firstImage.id);
        setMainSegmentation(segmentation);
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
            <p>Loading...</p>
          )}</div>
          <div className="row-span-8 bg-black bg-opacity-30 flex flex-col items-center justify-around">
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" onChange={handleToggleChange} defaultChecked={true} />
              <div className="relative w-20 h-10 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-10 after:w-10 after:transition-all dark:border-gray-600 peer-checked:bg-sky-500"></div>
              <span className="ms-3 text-xl font-medium text-gray-900 dark:text-gray-300">Show mask</span>
            </label>


            <div className="w-1/2 flex flex-col">Opacity :<div className="flex space-x-6 items-center"><Slider sx={{ color: "#f3f4f6" }} defaultValue={opacity} value={opacity} onChange={handleOpacityChange} disabled={!displayMask} /> <p>{opacity}</p></div></div>
            <div className="w-1/2 flex flex-col">Brightness :<div className="flex space-x-6 items-center"><Slider sx={{ color: "#f3f4f6" }} defaultValue={brightness} value={brightness} onChange={handleBrightnessChange} disabled={!displayMask} /><p>{brightness}</p></div></div>
            <div className="w-1/2 flex flex-col">Contrast :<div className="flex space-x-6 items-center"><Slider sx={{ color: "#f3f4f6" }} defaultValue={contrast} value={contrast} onChange={handleContrastChange} disabled={!displayMask} /><p>{contrast}</p></div></div>

            <div className="flex flex-row space-x-2">
              <button className="bg-sky-500 px-6 py-4 rounded-2xl text-2xl" onClick={saveSettings}>Save settings</button>
              <button className="bg-gray-100 px-6 py-4 rounded-2xl text-2xl text-gray-700" onClick={resetSettings}>Reset</button>
            </div>

          </div>

          {/* 2e ligne */}
          <button className={`${activeTab === "Training" ? "text-sky-300" : ""} bg-black bg-opacity-30 text-2xl py-4 text-center hover:cursor-pointer hover:bg-sky-500 hover:text-black`} onClick={uploadTrainingImages}>Training</button>

          {/* 3e ligne */}
          <button className={`${activeTab === "Validation" ? "text-sky-300" : ""} bg-black bg-opacity-30 text-2xl py-4 text-center hover:cursor-pointer hover:bg-sky-500 hover:text-black`} onClick={uploadValidationImages}>Validation</button>

          {/* 4e ligne */}
          <div className="row-span-5 flex flex-col bg-black bg-opacity-30 text-xl py-4 px-5 text-start justify-evenly">
            <div>

              <div className="flex items-center">  Brightness</div>
              <div className="text-[30px] p-3">{dataBrightness}</div>
            </div>
            <div><div className="flex items-center"> Contrast</div> <div className="text-[30px] p-3">{dataContrast}</div></div>
            <div>Mask Area <div className="text-[30px] p-3">0</div></div>
          </div>
          <div className="col-span-2 bg-black bg-opacity-30 row-span-2 overflow-x-scroll flex space-x-3 py-4 items-center px-4">
            {imageList ? (imageList.map((image) => (
              <img
                title={image.name}
                key={image.name}
                src={`${S3_BUCKET_URL}/${image.url}`}
                alt={image.name}
                className={`w-[181px] h-[136px] flex-shrink-0 ${mainImage.id === image.id ? "" : "opacity-70"} hover:cursor-pointer hover:opacity-100`}
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
