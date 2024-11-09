import { UserRepository } from '../../src/modules/users/persistence/users.repository.js';
import mongoose from 'mongoose';
import { expect } from 'chai';
import envsConfig from '../../src/config/envs.config.js';

mongoose.connect(envsConfig.URL_MONGODB);

describe('Test User', () => {
  const userRepository = new UserRepository();
  let userTest;

  // Método que se ejecuta antes de todos los tests
  before(() => {
    console.log('Starting each Test');
  });

  // Método que se ejecuta antes de cada test
  beforeEach(() => {
    console.log('Individual Test');
  });

  // Test individual
  it('Return Users', async () => {
    const users = await userRepository.getAll();
    expect(users).to.be.an('array');
    expect(users).to.be.not.an('object');
  });

  it('Create and return New User', async () => {
    const newUser = {
      first_name: 'Romancito',
      last_name: 'Gomez',
      email: 'atyiar5121o1@gmail.com',
      password: '123',
      age: 20,
      birthDate: new Date(),
    };

    const user = await userRepository.create(newUser);
    userTest = user;
    //Afirmación;
    expect(user).to.be.an('object');
    expect(user).to.have.property('_id');
    expect(user.first_name).to.be.equal(newUser.first_name);
    expect(user.last_name).to.be.equal(newUser.last_name);
    expect(user.email).to.be.equal(newUser.email);
    expect(user.password).to.be.equal(newUser.password);
    expect(user.role).to.be.equal('user');

    //Negación;
    expect(user).to.not.have.property('age');
    expect(user).to.not.have.property('birthDate');
    expect(user).to.not.be.null;
    expect(user).to.not.be.an('array');
  });

  it('Return User by Id', async () => {
    const user = await userRepository.getByParam({ _id: userTest._id });
    expect(user).to.be.an('object');
    expect(user).to.have.property('_id');
    expect(user.first_name).to.be.equal(userTest.first_name);
    expect(user.last_name).to.be.equal(userTest.last_name);
    expect(user.email).to.be.equal(userTest.email);
    expect(user.password).to.be.equal(userTest.password);
  });

  it('Update an User', async () => {
    const updateData = {
      first_name: 'Juan',
      password: '321',
    };

    const user = await userRepository.update(userTest._id, updateData);
    expect(user).to.be.an('object');
    expect(user).to.have.property('_id');
    expect(user.first_name).to.be.equal(updateData.first_name);
    expect(user.last_name).to.be.equal(userTest.last_name);
    expect(user.email).to.be.equal(userTest.email);
    expect(user.password).to.be.equal(updateData.password);
  });

  it('Delete an User', async () => {
    await userRepository.delete(userTest._id);
    const user = await userRepository.getByParam({ _id: userTest._id });
    expect(user).to.be.null;
  });

  // Método que se ejecuta al finaliza cada test
  afterEach(() => {
    console.log('Individual Test ended');
  });

  // Método que se ejecuta al finalizar todos los test
  after(async () => {
    console.log('All Tests ended');
    mongoose.disconnect();
  });
});
