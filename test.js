const request = require('supertest');
const app = require('/server.js');

describe('Dog Facts API Test with Console Logging', () => {
  
  it('should fetch and log 3 dog facts', async () => {
    const response = await request(app)
      .get('/facts')
      .query({ number: 3 })
      .expect(200);

    // This prints the facts returned by the API to your test console
    console.log('--- TEST OUTPUT: Received Facts ---');
    console.log(response.body.facts);
    console.log('------------------------------------');

    expect(response.body.success).toBe(true);
    expect(response.body.facts.length).toBe(3);
  });

  it('should fetch and log ALL dog facts', async () => {
    const response = await request(app)
      .get('/facts')
      .expect(200);

    console.log('--- TEST OUTPUT: All Facts ---');
    console.log(response.body.facts);
    console.log('------------------------------');

    expect(response.body.success).toBe(true);
  });
});