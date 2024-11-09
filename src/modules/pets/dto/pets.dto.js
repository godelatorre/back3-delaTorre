export const transformSinglePet = pet => {
  const { _id, name, specie, adopted, birthDate } = pet;
  return {
    _id,
    name,
    specie,
    adopted,
    birthDate,
  };
};

export const transformArrayPets = array => {
  const transformedArray = array.map(p => {
    return transformSinglePet(p);
  });
  return transformedArray;
};
