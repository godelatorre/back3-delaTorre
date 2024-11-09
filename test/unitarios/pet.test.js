import { PetsRepository } from '../../src/modules/pets/persistence/pets.repository.js';
import mongoose from 'mongoose';
import { expect } from 'chai';
import envsConfig from '../../src/config/envs.config.js';

mongoose.connect(envsConfig.URL_MONGODB);

describe('Test Pet', () => {
  const petRepository = new PetsRepository();
  let petTest;

  // Método que se ejecuta antes de todos los tests
  before(() => {
    console.log('Starting each Test');
  });

  // Método que se ejecuta antes de cada test
  beforeEach(() => {
    console.log('Individual Test');
  });

  // Test individual
  it('Return Pets', async () => {
    const pets = await petRepository.getAll();
    expect(pets).to.be.an('array');
    expect(pets).to.be.not.an('object');
  });

  it('Create and return New Pet', async () => {
    const newPet = {
      name: 'Pocho',
      specie: 'quirquincho',
      birthDate: new Date(),
      color: 'brown',
      size: 'small',
    };

    const pet = await petRepository.create(newPet);
    petTest = pet;
    //Afirmación;
    expect(pet).to.be.an('object');
    expect(pet).to.have.property('_id');
    expect(pet.name).to.be.equal(newPet.name);
    expect(pet.specie).to.be.equal(newPet.specie);
    expect(pet.birthDate).to.be.equal(newPet.birthDate);

    //Negación;
    expect(pet).to.not.have.property('color');
    expect(pet).to.not.have.property('size');
    expect(pet).to.not.be.null;
    expect(pet).to.not.be.an('array');
  });

  it('Return Pet by Id', async () => {
    const pet = await petRepository.getByParam({ _id: petTest._id });
    expect(pet).to.be.an('object');
    expect(pet).to.have.property('_id');
    expect(pet).to.have.property('owner');
    expect(pet.name).to.be.equal(petTest.name);
    expect(pet.specie).to.be.equal(petTest.specie);
  });

  it('Update a Pet', async () => {
    const updateData = {
      specie: 'dinosaurio',
    };

    const pet = await petRepository.update(petTest._id, updateData);
    expect(pet).to.be.an('object');
    expect(pet).to.have.property('_id');
    expect(pet).to.have.property('owner');
    expect(pet.name).to.be.equal(petTest.name);
    expect(pet.specie).to.be.equal(updateData.specie);
  });

  it('Delete a Pet', async () => {
    await petRepository.delete(petTest._id);
    const pet = await petRepository.getByParam({ _id: petTest._id });
    expect(pet).to.be.null;
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
