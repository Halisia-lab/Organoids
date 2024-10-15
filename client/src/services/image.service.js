
const API_URL = `${process.env.REACT_APP_API_URL}/images`;

export const fetchImageById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const data = await response.json();
        return data["image"];
    } catch (error) {
        console.error('Error fetching image:', error);
        throw error;
    }
};

export const fetchImagesInTesting = async () => {
    console.log('testing');
    
    try {
        const response = await fetch(`${API_URL}/testing`);
        const data = await response.json();
        return data["testingImages"];
    } catch (error) {
        console.error('Error fetching testing images:', error);
        throw error;
    }
};

export const fetchImagesInTraining = async () => {
    try {
        const response = await fetch(`${API_URL}/training`);
        const data = await response.json();
        return data["trainingImages"];
    } catch (error) {
        console.error('Error fetching testing images:', error);
        throw error;
    }
};

export const fetchImagesInValidation = async () => {
    try {
        const response = await fetch(`${API_URL}/validation`);
        const data = await response.json();
        return data["validationImages"];
    } catch (error) {
        console.error('Error fetching testing images:', error);
        throw error;
    }
};
