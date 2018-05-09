// @flow weak
export const validate = values => {
    const errors = {};

    if (!values.nickNameInput) {
        errors.nickNameInput = 'Nickname is required';
    }
    return errors;
};
