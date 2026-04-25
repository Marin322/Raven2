import { isRequired } from "../../../shared";

export const validate = (values) => {
    const errors = {};

    errors.name = isRequired(values.name) || null;
    Object.keys(errors).forEach(key => !errors[key] && delete errors[key]);
    return errors;
}