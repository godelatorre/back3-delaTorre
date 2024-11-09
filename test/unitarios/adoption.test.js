import { AdoptionRepository } from '../../src/modules/adoptions/persistence/adoption.repository.js';
import { PetsRepository } from '../../src/modules/pets/persistence/pets.repository.js';
import { UserRepository } from '../../src/modules/users/persistence/users.repository.js';
import mongoose from 'mongoose';
import { expect } from 'chai';
import envsConfig from '../../src/config/envs.config.js';

mongoose.connect(envsConfig.URL_MONGODB);

describe('Test Adoption', () => {
  const adoptionRepository = new AdoptionRepository();
  let adoptionTest;
  const petsRepository = new PetsRepository();
  let petTest;
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

  //Test Individual
  it('Return all Adoptions', async () => {
    const adoptions = await adoptionRepository.getAll();
    expect(adoptions).to.be.an('array');
    expect(adoptions).to.be.not.an('object');
  });

  it('Create Adoption', async () => {
    const user = await userRepository.getByParam({
      //Acá ingresar un email de alguien que no tenga pets:
      email: 'Yolanda_CardenasXana@nearbpo.com',
    });
    const pet = await petsRepository.getByParam({
      //Acá ingresar un ID PET:
      _id: '670ab5c0d567163909f0ddc7',
    });
    user.pets.push(pet._id);
    const updateUser = await userRepository.update(user._id, {
      pets: user.pets,
    });
    const updatePet = await petsRepository.update(pet._id, {
      owner: user._id,
    });
    const newAdoption = {
      owner: updateUser._id,
      pet: updatePet._id,
    };
    const adoptionComplete = await adoptionRepository.create(newAdoption);
    adoptionTest = adoptionComplete;

    expect(adoptionComplete).to.be.an('object');
    expect(adoptionComplete).to.have.property('owner', updateUser._id);
    expect(adoptionComplete).to.have.property('pet', updatePet._id);
  });

  it('Get Adoption by Id', async () => {
    const adoption = await adoptionRepository.getByParam({
      _id: adoptionTest._id,
    });
    expect(adoption).to.be.an('object');
    expect(adoption).to.not.be.an('array');
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
