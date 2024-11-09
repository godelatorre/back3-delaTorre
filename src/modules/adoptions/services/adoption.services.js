import { AdoptionRepository } from '../persistence/adoption.repository.js';

const adoptionRepository = new AdoptionRepository();
export class AdoptionService {
  getAllAdoptions = async () => {
    return await adoptionRepository.getAll();
  };

  getAdoption = async params => {
    return await adoptionRepository.getByParam(params);
  };

  createAdoption = async params => {
    return await adoptionRepository.create(params);
  };
}
