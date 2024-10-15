
const request = require('supertest');
const app = require('../index');
const { getSegmentationById } = require('../controllers/segmentation.controller');

describe('Segmentation API', () => {

  it('should return all segmentations', async () => {
    const response = await request(app).get('/segmentations');
    expect(response.status).toBe(200);
  });

  it('should return testing segmentations', async () => {
    const response = await request(app).get('/segmentations/segmentation/testing');
    expect(response.status).toBe(200);
  });

  it('should return training segmentations', async () => {
    const response = await request(app).get('/segmentations/segmentation/training');
    expect(response.status).toBe(200);
  });

  it('should return validation segmentations', async () => {
    const response = await request(app).get('/segmentations/segmentation/validation');
    expect(response.status).toBe(200);
  });

  it('should return segmentation with imageId 1', async () => {
    const response = await request(app).get('/segmentations/image/1');
    expect(response.status).toBe(200);
  });

  it('should return segmentation with imageId 1', async () => {
    const response = await request(app).get('/segmentations/image/1');
    expect(response.status).toBe(200);
  });

  it('should update segmentation opacity', async () => {
    const id = 1;
    const responseSegmentation = await request(app).get(`/segmentations/${id}`);
    const oldOpacity = responseSegmentation.body.segmentation.opacity;

    var response = await request(app).put(`/segmentations/${id}/opacity/100`);
    expect(response.status).toBe(200);
    response = await request(app).put(`/segmentations/${id}/opacity/${oldOpacity}`);
    expect(response.status).toBe(200);
  });
});