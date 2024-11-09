import { AdoptionService } from '../services/adoption.services.js';
import { PetsServices } from '../../pets/services/pets.services.js';
import { UserServices } from '../../users/services/user.services.js';

const adoptionService = new AdoptionService();
const petsService = new PetsServices();
const userService = new UserServices();

export class AdoptionController {
  getAllAdoptions = async (req, res) => {
    const result = await adoptionService.getAllAdoptions();
    res.send({ status: 'success', payload: result });
  };

  getAdoption = async (req, res) => {
    const adoptionId = req.params.aid;
    const adoption = await adoptionService.getAdoption({ _id: adoptionId });
    if (!adoption)
      return res
        .status(404)
        .send({ status: 'error', error: 'Adoption not found' });
    res.send({ status: 'success', payload: adoption });
  };

  createAdoption = async (req, res) => {
    const { uid, pid } = req.params;
    const user = await userService.getUser({ _id: uid });
    if (!user)
      return res.status(404).send({ status: 'error', error: 'User not found' });
    const pet = await petsService.getPet({ _id: pid });
    if (!pet)
      return res.status(404).send({ status: 'error', error: 'Pet not found' });
    if (pet.adopted)
      return res
        .status(400)
        .send({ status: 'error', error: 'Pet is already adopted' });
    user.pets.push(pet._id);
    await userService.updateUser(user._id, { pets: user.pets });
    await petsService.updatePet(pet._id, { adopted: true, owner: user._id });
    const adoption = await adoptionService.createAdoption({
      owner: user._id,
      pet: pet._id,
    });
    res.status(200).send({ status: 'success', payload: adoption });
  };
}
