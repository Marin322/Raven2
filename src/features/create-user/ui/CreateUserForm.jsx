import { useState } from "react"
import { Button, Input } from "../../../shared"
import { validate } from "../model/validate";
import { createUser } from "../api/userControlApi";
export const CreateUserForm = () => {
    const [formData, setFormData] = useState({fullName: "", username: "", password: ""});
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate(formData);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;
        const userData = {
            fullName: formData.fullName,
            username: formData.username,
            password: formData.password
        };
        try {
            const data = await createUser(userData);
            console.log(data);
        } catch(err) {
            setErrors((prev) => ({...prev, server: err.message}));
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
        if (errors[name]) setErrors((prev) => ({...prev, [name]: ""}));
    };

    return (
        <div className="gap-4 flex flex-col">
            <Input onChange={handleChange} name="fullName" value={formData.fullName} label="ФИО" error={errors?.fullName} placeholder="Введите ФИО пользователя"/>
            <Input onChange={handleChange} name="username" value={formData.username} label="Никнейм" error={errors?.username} placeholder="Введите никнейм пользователя"/>
            <Input onChange={handleChange} name="password" value={formData.password} label="Пароль" error={errors?.password} placeholder="Введите пароль пользователя"/>
            <Button children="Зарегистрировать" onClick={handleSubmit}/>
            <p>{errors.server}</p>
        </div>
    )
}