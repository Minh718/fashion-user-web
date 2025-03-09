export const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^\+?[0-9]\d{1,14}$/;
  return phoneRegex.test(phone);
};
