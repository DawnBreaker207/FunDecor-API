export const validBody = (data, isSchema) => {
  // Check path login or register
  const { error } = isSchema.validate(data, { abortEarly: false });
  if (error) {
    const errors = error.details.map((item) => item.message);
    return { errors };
  }
  return;
};
