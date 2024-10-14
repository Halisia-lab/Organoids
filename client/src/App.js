
import React, { useState, useEffect } from 'react';
import { fetchImageById, fetchImagesInTesting, fetchImagesInTraining, fetchImagesInValidation } from './services/image.service';
import { fetchSegmentationByImageId } from './services/segmentation.service';


function App() {
  const [mainImage, setMainImage] = useState(null);

  const [mainSegmentation, setMainSegmentation] = useState(null);
  const [imageList, setImageList] = useState([]);
  const S3_BUCKET_URL = process.env.REACT_APP_S3_URL;

  useEffect(() => {
    uploadTestingImages();

  }, []);

  const chooseImage = (image) => {
    setMainImage({ id: image.id, name: image.name, url: image.url });
    fetchSegmentationByImageId(image.id)
      .then(res => setMainSegmentation(res))
      .catch(error => console.error('Error fetching data:', error));
  }

  const uploadValidationImages = async () => {
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
      console.error('Error fetching data:', error);
    }
  }

  const uploadTestingImages = async () => {
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
      console.error('Error fetching data:', error);
    }
  }

  const uploadTrainingImages = async () => {
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
      console.error('Error fetching data:', error);
    }
  }



  return (
    <div className="App">
      <header className="bg-gradient-to-r from-[#0e0327] to-[#3533cd] h-screen p-10 overflow-hidden">
        <div className=''>

        </div>
        <div className='flex flex-col text-white text-center py-5 font-mono'>

          <div className='text-[35px]'>MouseOrganoids Analysis</div>
          <div className='uppercase text-2xl'>Choose an image</div>
        </div>

        <div className='grid grid-cols-4 grid-rows-8 text-white gap-3 font-mono max-h-1/2'>

          {/* 1ere ligne */}
          <button className='bg-black bg-opacity-30 text-2xl py-4 text-center hover:cursor-pointer hover:bg-sky-500 hover:text-black' onClick={uploadTestingImages}>Testing</button>
          <div className='col-span-2 bg-black bg-opacity-30 place-items-center row-span-6 py-4'> {imageList && mainSegmentation && mainSegmentation.url ? (
            <div className='flex justify-center relative'>
              <img src={`${S3_BUCKET_URL}/${mainImage.url}`} alt={mainImage.name} className='w-[648px] h-[486px]' />
              <img src={`${S3_BUCKET_URL}/${mainSegmentation.url}`} alt={mainSegmentation.name} className='w-[648px] h-[486px] absolute z-10 opacity-60' />
            </div>
          ) : (
            <p>Loading...</p>
          )}</div>
          <div className='row-span-8 bg-black bg-opacity-30 place-items-center'>C</div>

          {/* 2e ligne */}
          <button className='bg-black bg-opacity-30 text-2xl py-4 text-center hover:cursor-pointer hover:bg-sky-500 hover:text-black' onClick={uploadTrainingImages}>Training</button>

          {/* 3e ligne */}
          <button className='bg-black bg-opacity-30 text-2xl py-4 text-center hover:cursor-pointer hover:bg-sky-500 hover:text-black' onClick={uploadValidationImages}>Validation</button>

          {/* 4e ligne */}
          <div className='row-span-5 flex flex-col bg-black bg-opacity-30 text-xl py-4 px-5 text-start justify-evenly'>
            <div>Brightness</div>
            <div>Contrast</div>
            <div>Mask Area</div>
          </div>
          <div className='col-span-2 bg-black bg-opacity-30 row-span-2 overflow-x-scroll flex space-x-3 py-4 items-center px-4'>
            {imageList ? (imageList.map((image) => (
              <img
                title={image.name}
                key={image.name}
                src={`${S3_BUCKET_URL}/${image.url}`}
                alt={image.name}
                className={`w-[181px] h-[136px] flex-shrink-0 ${mainImage.id == image.id ? "" : "opacity-70"} hover:cursor-pointer hover:opacity-100`}
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
