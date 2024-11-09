import petsModel from "./models/pets.model.js";
import { GenericRepository } from "../../../genericRepository/genericRepository.js";
export class PetsRepository extends GenericRepository {
  constructor() {
    super(petsModel);
  }
  createMany = async (data) => {
    try {
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("Invalid input: expected non-empty array of pets");
      }

      data.forEach((pet, index) => {
        if (!pet.name || !pet.specie) {
          throw new Error(
            `Invalid pet data at index ${index}: name and specie are required`
          );
        }
      });

      const pets = await petsModel.insertMany(data, { validate: true });
      return pets;
    } catch (error) {
      console.error(`Repository error: ${error.message}`);
      if (error.name === "ValidationError") {
        throw new Error(`Validation failed: ${error.message}`);
      }
      throw error;
    }
  };
}
