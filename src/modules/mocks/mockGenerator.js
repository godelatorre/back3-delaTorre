import { fakerES_MX as faker } from "@faker-js/faker";
import { hashPassword } from "../../utils/password.utils.js";

export const generateMocks = (param, amount) => {
  switch (param) {
    case "user": {
      const users = [];
      for (let i = 0; i < amount; i++) {
        const user = {
          first_name: faker.person.firstName(),
          last_name: faker.person.lastName(),
          email: faker.internet.email(),
          password: hashPassword("coder123"),
          role: faker.datatype.boolean() ? "user" : "admin",
          pets: [],
        };
        users.push(user);
      }
      return users;
    }
    case "pets": {
      const pets = [];
      const species = ["perro", "gato", "conejo", "pájaro", "pez", "hámster"];
      for (let i = 0; i < amount; i++) {
        const pet = {
          name: faker.person.firstName(),
          specie: faker.helpers.arrayElement(species),
          birthDate: faker.date.past(),
          adopted: false,
          image: faker.image.avatar(),
        };
        pets.push(pet);
      }
      return pets;
    }
    default:
      break;
  }
};
