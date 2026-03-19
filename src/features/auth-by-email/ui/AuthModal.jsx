import { Input } from "../../../shared/ui/Input"
export const AuthModal = () => {
    return (    
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-main-bg p-0 md:p-4">
            <div className="w-full rounded-2xl bg-modal-bg p-6 shadow-xl md:max-w-md md:rounded-2xl md:mb-0 border-2 gap-10 border-border-bg">
                <Input label="Эл. Почта" type="text" placeholder="Введите вашу эл. почту"/>
                <Input label="Пароль" type="password" placeholder="Введите ваш пароль" classname="mt-5"/>
            </div>
        </div>
    )
}