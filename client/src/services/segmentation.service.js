
const API_URL = `${process.env.REACT_APP_API_URL}/segmentations`;

export const fetchSegmentationByImageId = async (id) => {
    try {
        const response = await fetch(`${API_URL}/image/${id}`);
        const data = await response.json();
        return data["segmentation"];
    } catch (error) {
        console.error('Error fetching segmentation:', error);
        throw error;
    }
};

export const fetchSegmentationsInTesting = async () => {
    try {
        const response = await fetch(`${API_URL}/testing`);
        const data = await response.json();
        
        return data["testingSegmentations"];
    } catch (error) {
        console.error('Error fetching testing segmentations:', error);
        throw error;
    }
};

export const fetchSegmentationsInTraining = async () => {
    try {
        const response = await fetch(`${API_URL}/training`);
        const data = await response.json();
        
        return data["trainingSegmentations"];
    } catch (error) {
        console.error('Error fetching testing segmentations:', error);
        throw error;
    }
};

export const fetchSegmentationsInValidation = async () => {
    try {
        const response = await fetch(`${API_URL}/validation`);
        const data = await response.json();
        
        return data["validationSegmentations"];
    } catch (error) {
        console.error('Error fetching testing segmentations:', error);
        throw error;
    }
};
