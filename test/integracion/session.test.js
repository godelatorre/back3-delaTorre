import { expect } from 'chai';
import supertest from 'supertest';

const request = supertest('http://localhost:8080/api/sessions');

describe('Session Integration Test', () => {
  let userTest;
  const uniqueEmail = `randomemail${Date.now()}@gmail.com`;
  it('[POST] /api/sessions/register - Register an User', async () => {
    const newUser = {
      first_name: 'Gabriel',
      last_name: 'delaTorre',
      email: uniqueEmail,
      password: '123',
    };

    const { status, body } = await request.post('/register').send(newUser);
    userTest = body.payload;

    expect(status).to.be.equal(201);
    expect(body.status).to.be.equal('success');
    expect(body.payload).to.be.an('object');
    expect(body.payload.email).to.be.equal(newUser.email);
    expect(body.payload.first_name).to.be.equal(newUser.first_name);
    expect(body.payload.last_name).to.be.equal(newUser.last_name);
    expect(body.payload.password).to.not.be.equal(newUser.password);
  });

  it('[POST] /api/sessions/login - Login User', async () => {
    const data = {
      email: uniqueEmail,
      password: '123',
    };

    const { status, body } = await request.post('/login').send(data);

    expect(status).to.be.equal(200);
    expect(body.status).to.be.equal('success');
    expect(body.payload).to.be.an('string');
  });
});
