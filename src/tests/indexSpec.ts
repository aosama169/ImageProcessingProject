import supertest from 'supertest';
import app from '../app';
import imageAPI from './../imageAPI';

const request = supertest(app);

describe('Try opening main Endpoint ', () => {
  it('should return a status code 200', async () => {
    const response = await request.get('/image');
    expect(response.statusCode).toBe(200);
  });
});

describe('Show Available Images', () => {
  it('should return a status code 200', async () => {
    const response = await request.get('/image/showImages');
    await expect(response.statusCode).toBe(200);
  });
});

describe('Try Resizing fjord Image', () => {
  it('should return a status code 200', async () => {
    const response = await request.get('/image/fjord/50/50');
    expect(response.statusCode).toBe(200);
  });
});

describe('Try getting false image file ', () => {
  it('should return a status code 404', async () => {
    const response = await request.get('/image/ahmed/50/50');
    expect(response.statusCode).toBe(404);
  });
});

describe('Check an image Transforms correctly ', () => {
  it('Exepect the image path returned is correct ', async () => {
    const response = await imageAPI('fjord', 50, 50);

    expect(response).toEqual('thumbs/fjord_50x50.jpg');
  });
});
