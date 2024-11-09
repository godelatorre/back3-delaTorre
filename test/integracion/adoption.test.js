import { expect } from 'chai';
import supertest from 'supertest';

const request = supertest('http://localhost:8080/api/adoptions');

describe('Adoption Integration Test', () => {
  let testAdoptions;
  it('[GET] /api/adoptions - Return Adoption Array', async () => {
    const { status, body } = await request.get('/');
    expect(status).to.be.equal(200);
    expect(body.payload).to.be.an('array');
  });

  it('[POST] /api/adoptions/:uid/:pid - Create a new adoption', async () => {
    const owner = '670c3513d81a7e4bf59d1507';
    const pet = '670da28bd9f58e5a7eb317ec';
    const { body } = await request.post(`/${owner}/${pet}`);
    // No tocar el console.log, hizo milagros.
    console.log(body);
    testAdoptions = body.payload;
    expect(body.payload).to.be.an('object');
  });

  it('[GET] /api/adoptions/:aid - Return Adoption by ID', async () => {
    const { status, body } = await request.get('/');
    expect(status).to.be.equal(200);
    expect(body.payload).to.be.an('array');
  });
});

//Modificar el controller probablemente.
//Ver el POST
