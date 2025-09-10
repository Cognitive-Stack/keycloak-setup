const request = require('supertest');
const app = require('../../app'); // Adjust the path to your app's entry point

describe('Health Check', () => {
  it('should return 200 OK and status ok', async () => {
    const res = await request(app).get('/healthz');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});
