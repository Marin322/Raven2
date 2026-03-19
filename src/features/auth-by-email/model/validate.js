export const validate = (values, isAuth) => {
    const errors = {};
    const emailRegex = /^\S+@\S+\.\S+$/;

    if(!values.email) {
        errors.email = "Введите почту";
    } else if (!emailRegex.test(values.email)) {
        errors.email = "Неверный формат почты";
    };

    if(!values.password) {
        errors.password = "Введите пароль";
    } else if (values.password.length < 6) {
        errors.password = "Минимум 6 символов";
    };

    if(!isAuth) {
        if (!values.username) {
            errors.username = "Введите имя";
        };
        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Пароли не совпадают";
        };
    };

    return errors;
};