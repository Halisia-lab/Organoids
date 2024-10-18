function ImagesGallery({ imageList, mainImage, chooseImage }) {
    const S3_BUCKET_URL = process.env.REACT_APP_S3_URL;

    return (
        <>
            {imageList ? (imageList.map((image) => (
                <img
                    title={image.name}
                    key={image.name}
                    src={`${S3_BUCKET_URL}/${image.url}`}
                    alt={image.name}
                    className={`flex-shrink-0 ${mainImage.id !== image.id ? "w-[86px] h-[70px]" : "w-[125px] h-[92px]"} hover:cursor-pointer hover:opacity-100 hover:w-[125px] hover:h-[92px]`} onClick={() => {
                        chooseImage(image);
                    }}
                />
            ))
            ) : (
                <div className="flex justify-center items-center w-full h-full">Loading...</div>
            )}
        </>
    );
}

export default ImagesGallery;