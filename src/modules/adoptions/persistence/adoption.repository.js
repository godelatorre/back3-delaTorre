import adoptionModel from './models/adoption.model.js';
import { GenericRepository } from '../../../genericRepository/genericRepository.js';
export class AdoptionRepository extends GenericRepository {
  constructor() {
    super(adoptionModel);
  }
}
