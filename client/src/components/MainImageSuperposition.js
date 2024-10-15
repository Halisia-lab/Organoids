import React from "react";

function MainImageSuperposition({imageList, mainImage, mainSegmentation, brightness, contrast, opacity, displayMask}) {
    const S3_BUCKET_URL = process.env.REACT_APP_S3_URL;
    
    return (
        <div>
            {imageList && mainSegmentation && mainSegmentation.url ? (
                <div className="flex justify-center relative">
                    <img src={`${S3_BUCKET_URL}/${mainImage.url}`}
                        alt={mainImage.name} 
                        style={{ filter: `brightness(${brightness}%) contrast(${contrast}%)` }}
                        className="w-[778px] h-[583px]"
                    />
                    <img src={`${S3_BUCKET_URL}/${mainSegmentation.url}`}
                        alt={mainSegmentation.name}
                        style={{  opacity: opacity / 100, }}
                        className={`w-[778px] h-[583px] absolute z-10 ${displayMask ? "" : "hidden"}`}
                    />
                </div>
            ) : (
                <div className="flex justify-center items-center w-full h-full">
                    Loading...
                </div>
            )}
        </div>
    )
}

export default MainImageSuperposition;