export const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^\+?[0-9]\d{9,11}$/;
  return phoneRegex.test(phone);
};
