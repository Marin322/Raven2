import { isRequired, validateEmailFormat, validatePasswordLength } from "../../../shared";

export const validate = (values) => {
    const errors = {};

    errors.fullName = isRequired(values.fullName);
    errors.username = isRequired(values.username);

    errors.password = isRequired(values.password) || validatePasswordLength(6)(values.password);

    Object.keys(errors).forEach(key => !errors[key] && delete errors[key]);

    return errors;
};