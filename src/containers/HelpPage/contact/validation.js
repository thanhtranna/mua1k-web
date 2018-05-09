// @flow weak
export const validate = values => {
  const errors = {};

  if (!values.contactCategory) {
    errors.contactCategory = 'Contact category is required';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.content) {
    errors.content = 'Content is required';
  }

  return errors;
};
