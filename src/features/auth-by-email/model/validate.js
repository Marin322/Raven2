export const validate = (values, isAuth) => {
    const errors = {};
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!values.username) {
        errors.username = "Логин не может быть пустым";
    }

    if(!values.password) {
        errors.password = "Введите пароль";
    } else if (values.password.length < 6) {
        errors.password = "Минимум 6 символов";
    };

    if(!isAuth) {
        if (!values.companyName) {
            errors.companyName = "Название компании не может быть пустым";
        }
        if (!values.fullName) {
            errors.fullName = "ФИО не может быть пустым";
        }
    };

    return errors;
};