import { isRequired, validateEmailFormat, validatePasswordLength } from "../../../shared";
export const validate = (values, isAuth) => {
    const errors = {};

    errors.username = isRequired(values.username) || "";
    errors.password = isRequired(values.password) || validatePasswordLength(6)(values.password);

    if (!isAuth) {
        errors.companyName = isRequired(values.companyName) || "";
        errors.fullName = isRequired(values.fullName) || "";
    };

    Object.keys(errors).forEach(key => !errors[key] && delete errors[key]);
    return errors;
};