import { generateMocks } from "../mockGenerator.js";
import { UserServices } from "../../users/services/user.services.js";
import { PetsServices } from "../../pets/services/pets.services.js";

const userServices = new UserServices();
const petsServices = new PetsServices();

export class MocksControllers {
  createUsers = async (req, res) => {
    try {
      const users = generateMocks("user", 50);
      const savedUsers = await userServices.createMany(users);
      return res.status(201).json({ status: "Success", payload: savedUsers });
    } catch (error) {
      console.error(error);
    }
  };
  createPets = async (req, res) => {
    try {
      const pets = generateMocks("pets", 50);
      const savedPets = await petsServices.createMany(pets);
      return res.status(201).json({ status: "Success", payload: savedPets });
    } catch (error) {
      console.error(error);
    }
  };
  createByParams = async (req, res) => {
    try {
      const { users, pets } = req.params;
      const resUser = generateMocks("user", Number(users));
      const savedUsers = await userServices.createMany(resUser);
      const resPet = generateMocks("pets", Number(pets));
      const savedPets = await petsServices.createMany(resPet);
      return res
        .status(201)
        .json({ status: "Success", payload: { savedUsers, savedPets } });
    } catch (error) {
      console.error(error);
    }
  };
}
