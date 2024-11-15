import { AdoptionRepository } from '../../src/modules/adoptions/persistence/adoption.repository.js';
import { PetsRepository } from '../../src/modules/pets/persistence/pets.repository.js';
import { UserRepository } from '../../src/modules/users/persistence/users.repository.js';
import mongoose from 'mongoose';
import { expect } from 'chai';
import envsConfig from '../../src/config/envs.config.js';


before(async () => {
  console.log('Conectando a MongoDB...');
  await mongoose.connect(envsConfig.URL_MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Conexión exitosa a MongoDB');
});

describe('Test Adoption', () => {
  const adoptionRepository = new AdoptionRepository();
  let adoptionTest;
  const petsRepository = new PetsRepository();
  const userRepository = new UserRepository();

  // Test para obtener todas las adopciones
  it('Return all Adoptions', async () => {
    const adoptions = await adoptionRepository.getAll();
    expect(adoptions).to.be.an('array');
    expect(adoptions).to.not.be.an('object');
  });

  // Test para crear una adopción
  it('Create Adoption', async () => {
   
    const user = await userRepository.getByParam({
      email: 'Alfredo.OlivaresOlivas45@yahoo.com',
    });

    if (!user) {
      throw new Error('El usuario no se encontró.');
    }

    // Obtener la mascota por ID
    const pet = await petsRepository.getByParam({
      _id: '670eab67ae2784760704dbe6',
    });

    if (!pet) {
      throw new Error('La mascota no se encontró.');
    }

    // Actualizar el usuario para asociar la mascota
    user.pets.push(pet._id);
    const updatedUser = await userRepository.update(user._id, { pets: user.pets });

    // Verificar que el usuario fue actualizado
    if (!updatedUser) {
      throw new Error('Error al actualizar el usuario.');
    }

    // Actualizar la mascota para asignarle un dueño
    const updatedPet = await petsRepository.update(pet._id, { owner: user._id });

    // Verificar que la mascota fue actualizada
    if (!updatedPet) {
      throw new Error('Error al actualizar la mascota.');
    }

    // Crear una adopción
    const newAdoption = {
      owner: updatedUser._id,
      pet: updatedPet._id,
    };
    const adoptionComplete = await adoptionRepository.create(newAdoption);

    // Verificar que la adopción se haya creado correctamente
    if (!adoptionComplete) {
      throw new Error('Error al crear la adopción.');
    }

    adoptionTest = adoptionComplete;

    expect(adoptionComplete).to.be.an('object');
    expect(adoptionComplete).to.have.property('owner', updatedUser._id);
    expect(adoptionComplete).to.have.property('pet', updatedPet._id);
  });

  // Test para obtener una adopción por su ID
  it('Get Adoption by Id', async () => {
    // Verificar que la adopción se creó correctamente
    expect(adoptionTest).to.not.be.null;
    expect(adoptionTest).to.not.be.undefined;

    const adoption = await adoptionRepository.getByParam({ _id: adoptionTest._id });

    // Verificar que la adopción fue encontrada
    expect(adoption).to.be.an('object');
    expect(adoption).to.not.be.an('array');
    expect(adoption._id.toString()).to.equal(adoptionTest._id.toString());
  });

  // Método que se ejecuta al finalizar todos los test
  after(async () => {
    console.log('Desconectando de MongoDB...');
    await mongoose.disconnect();
    console.log('Conexión cerrada.');
  });
});
