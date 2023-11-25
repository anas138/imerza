const validateEmail = (email) => {
  return /^\S+@\S+$/.test(email);
};
export default validateEmail;
