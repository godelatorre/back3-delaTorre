export const transformSingleUser = user => {
  const { _id, first_name, last_name, email } = user;
  return {
    _id,
    first_name,
    last_name,
    email,
  };
};

export const transformArrayUser = arrayUser => {
  const arrayTransformed = arrayUser.map(u => {
    return transformSingleUser(u);
  });
  return arrayTransformed;
};
