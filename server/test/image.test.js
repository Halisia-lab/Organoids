
const request = require('supertest');
const app = require('../index');

describe('Image API', () => {
    
  it('should return all images', async () => {
    const response = await request(app).get('/images');
    expect(response.status).toBe(200);
  });

  it('should return testing images', async () => {
    const response = await request(app).get('/images/testing');
    expect(response.status).toBe(200);
  });

  it('should return training images', async () => {
    const response = await request(app).get('/images/training');
    expect(response.status).toBe(200);
  });

  it('should return validation images', async () => {
    const response = await request(app).get('/images/validation');
    expect(response.status).toBe(200);
  });

  it('should return image with id 1', async () => {
    const response = await request(app).get('/images/1');
    expect(response.status).toBe(200);
  });
});