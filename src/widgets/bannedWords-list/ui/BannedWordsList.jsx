import { useEffect, useState } from "react"
import { Button, Input } from "../../../shared"
import { addBannedWords } from "../api/bannedWords.api"
import { useWordsStore } from "../model/useWordsStore";

export const BannedWordsList = () => {
    const [bannedWord, setBannedWord] = useState("");
    const {bannedWords, fetchBannedWords} = useWordsStore();

    useEffect(() => {
        fetchBannedWords();
    }, []);

    const addBannedWordClick = async () => {
        try {
            const result = await addBannedWords(bannedWord);
        } catch (err) {}
    }
    const bannedWordChange = (e) => {
        setBannedWord(e.target.value);
    }

    return (
        <div>
            <p className="text-2xl text-center">Запрещённые слова</p>
            <div className="h-auto max-h-75 border-2 border-border-bg rounded-2xl p-5 mt-5 gap-2 flex flex-col">
                {bannedWords.map((word) => (
                    <div className="border-2 border-border-bg p-2 text-[18px]">{word.word}</div>
                ))}
            </div>
            <div className="mt-5 flex flex-col gap-3">
                <Input label="Новое запрещённое слово" placeholder="Введите новое слово..." onChange={bannedWordChange}/>
                <Button children="Добавить" onClick={addBannedWordClick}/>
            </div>
        </div>
    )
}