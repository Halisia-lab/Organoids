
const request = require('supertest');
const app = require('../index');

describe('Segmentation API', () => {

  it('should return all segmentations', async () => {
    const response = await request(app).get('/segmentations');
    expect(response.status).toBe(200);
  });

  it('should return testing segmentations', async () => {
    const response = await request(app).get('/segmentations/testing');
    expect(response.status).toBe(200);
  });

  it('should return training segmentations', async () => {
    const response = await request(app).get('/segmentations/training');
    expect(response.status).toBe(200);
  });

  it('should return validation segmentations', async () => {
    const response = await request(app).get('/segmentations/validation');
    expect(response.status).toBe(200);
  });


  it('should return segmentation with imageId 1', async () => {
    const response = await request(app).get('/segmentations/image/1');
    expect(response.status).toBe(200);
  });
});