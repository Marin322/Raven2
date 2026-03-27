export const validate = (values, isAuth) => {
    const errors = {};
    const emailRegex = /^\S+@\S+\.\S+$/;

    if(!values.login) {
        errors.login = "Логин не может быть пустым";   
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
            errors.fullName = "Введите ваше полное ФИО";
        }
        if (!values.username) {
            errors.username = "Введите ваш новый логин";
        }
    };

    return errors;
};