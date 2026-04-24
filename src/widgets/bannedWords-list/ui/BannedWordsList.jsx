import { useEffect, useState } from "react"
import { Button, Input } from "../../../shared"
import { addBannedWords, deleteBannedWords } from "../api/bannedWords.api"
import { useWordsStore } from "../model/useWordsStore";

export const BannedWordsList = () => {
    const [bannedWord, setBannedWord] = useState("");
    const {bannedWords, fetchBannedWords, addWordToStore, removeWordFromStore} = useWordsStore();

    useEffect(() => {
        fetchBannedWords();
    }, []);

    const addBannedWordClick = async () => {
        try {
            const result = await addBannedWords(bannedWord);
            addWordToStore(result);
            setBannedWord("");
            
        } catch (err) {}
    }
    const bannedWordChange = (e) => {
        setBannedWord(e.target.value);
    }

    const deleteBannedWordClick = async (id) => {
        try {
            const result = await deleteBannedWords(id);
            removeWordFromStore(id)
        } catch(err) {}
    }

    return (
        <div>
            <p className="text-2xl text-center">Запрещённые слова</p>
            <div className="h-auto max-h-75 border-2 border-border-bg rounded-2xl p-5 mt-5 gap-2 flex flex-col overflow-auto">
                {bannedWords.map((word) => (
                    <div key={word.id} className="border-2 border-border-bg p-2 text-[18px] flex justify-between">
                        <p>{word.word}</p>
                        <button className="hover:cursor-pointer h-full" onClick={() => deleteBannedWordClick(word.id)}>Удалить</button>
                    </div>
                ))}
            </div>
            <div className="mt-5 flex flex-col gap-3">
                <Input label="Новое запрещённое слово" placeholder="Введите новое слово..." onChange={bannedWordChange} value={bannedWord}/>
                <Button children="Добавить" onClick={addBannedWordClick}/>
            </div>
        </div>
    )
}