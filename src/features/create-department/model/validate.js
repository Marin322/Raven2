import { isRequired } from "../../../shared";

export const validate = (values) => {
    const errors = {};

    errors.departmentName = isRequired(values.departmentName);

    Object.keys(errors).forEach(key => !errors[key] && delete errors[key]);

    return errors;
}