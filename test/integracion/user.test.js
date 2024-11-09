import { expect } from 'chai';
import supertest from 'supertest';

const request = supertest('http://localhost:8080/api/users');

describe('Users Integration Test', () => {
  let testUsers;
  const emailUnique = `user${Date.now()}@gmail.com`;
  it('[GET] /api/users - Return user Array', async () => {
    const { status, body } = await request.get('/');
    expect(status).to.be.equal(200);
    expect(body.payload).to.be.an('array');
  });

  it('[POST] /api/users - Create a new user', async () => {
    const newUser = {
      first_name: 'Onomatopeya',
      last_name: 'Arrividerchi',
      email: emailUnique,
      password: '133',
    };
    const { status, body } = await request.post('/').send(newUser);
    testUsers = body.payload;
    expect(status).to.be.equal(201);
    expect(body.payload).to.be.an('object');
    expect(body.payload.first_name).to.be.equal(newUser.first_name);
    expect(body.payload.last_name).to.be.equal(newUser.last_name);
    expect(body.payload.email).to.be.equal(newUser.email);
  });

  it('[PUT] /api/users/:uid - Update a user', async () => {
    const updateUser = {
      first_name: 'Sorsocieti',
    };

    const { status, body } = await request
      .put(`/${testUsers._id}`)
      .send(updateUser);

    expect(status).to.be.equal(200);
    expect(body.payload).to.be.an('object');
    expect(body.payload.first_name).to.be.equal(updateUser.first_name);
    expect(body.payload.last_name).to.be.equal(testUsers.last_name);
    expect(body.payload.email).to.be.equal(testUsers.email);
  });

  it('[DELETE] /api/users/:uid - Delete a user', async () => {
    const { status, body } = await request.delete(`/${testUsers._id}`);

    expect(status).to.be.equal(200);
    expect(body.payload).to.be.equal('Deleted Correctly');
  });
});
