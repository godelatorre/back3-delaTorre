import { expect } from 'chai';
import supertest from 'supertest';

const request = supertest('http://localhost:8080/api/pets');

describe('Pet Integration Test', () => {
  let testPet;
  it('[GET] /api/pets - Return Pet Array', async () => {
    const { status, body } = await request.get('/');
    expect(status).to.be.equal(200);
    expect(body.payload).to.be.an('array');
  });

  it('[POST] /api/pets - Create a new Pet', async () => {
    const newPet = {
      name: 'Onomatopeya',
      specie: 'Gato',
      birthDate: '10/10/2023',
      image: 'uiiai',
    };
    const { status, body } = await request.post('/').send(newPet);
    testPet = body.payload;
    expect(status).to.be.equal(201);
    expect(body.payload).to.have.property('_id');
    expect(body.payload).to.be.an('object');
    expect(body.payload.name).to.be.equal('Onomatopeya');
    expect(body.payload.specie).to.be.equal('Gato');
    expect(body.payload.adopted).to.be.equal(false);
  });

  it('[PUT] /api/pets/:pid - Update a Pet', async () => {
    const newPet = {
      specie: 'Perro',
    };

    const { status, body } = await request.put(`/${testPet._id}`).send(newPet);

    expect(status).to.be.equal(200);
    expect(body.payload).to.be.an('object');
    expect(body.payload.name).to.be.equal('Onomatopeya');
    expect(body.payload.specie).to.be.equal('Perro');
    expect(body.payload.adopted).to.be.equal(false);
  });

  it('[DELETE] /api/pets/:pid - Delete a Pet', async () => {
    const { status, body } = await request.delete(`/${testPet._id}`);

    expect(status).to.be.equal(200);
    expect(body.payload).to.be.equal('Deleted Correctly');
  });
});
