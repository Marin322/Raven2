import { Button, Input } from "../../../shared"

export const CreateChatModal = () => {
    return (
        <div className="w-full h-auto bg-modal-bg lg:w-120 lg:rounded-2xl p-5 gap-4 flex flex-col" onClick={(e) => e.stopPropagation()}>
            <p className="text-2xl text-center mb-4">Создание чата</p>
            <Input label="Название чата" placeholder="Введите название чата..."/>
            <Input label="Краткое описание чата (опционально)"/>
            <Button className="bottom-0" children="Создать"/>
        </div>
    )
}