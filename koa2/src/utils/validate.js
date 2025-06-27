const validateRegisterInput = (data) => {
  const errors = {};

  if (!data.name) {
    errors.name = 'Name is required';
  }
  if (!data.email) {
    errors.email = 'Email is required';
  }
  if (!data.password) {
    errors.password = 'Password is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

const validateLoginInput = (data) => {
  const errors = {};

  if (!data.email) {
    errors.email = 'Email is required';
  }
  if (!data.password) {
    errors.password = 'Password is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

module.exports = {
  validateRegisterInput,
  validateLoginInput
};