import { useEffect, useRef, useState } from "react";
import { Button, Input } from "../../../shared";
import {
    addBannedWords,
    addBannedWordsBulk,
    importBannedWords,
    deleteBannedWords,
    exportAuditLogs,
} from "../api/bannedWords.api";
import { useWordsStore } from "../model/useWordsStore";

export const BannedWordsList = () => {
    const [bannedWord, setBannedWord]   = useState("");
    const [bulkText, setBulkText]       = useState("");
    const [status, setStatus]           = useState("");
    const fileInputRef                  = useRef(null);

    const { bannedWords, fetchBannedWords, addWordToStore, addWordsToStore, removeWordFromStore } =
        useWordsStore();

    useEffect(() => { fetchBannedWords(); }, []);

    // Добавить одно слово
    const handleAdd = async () => {
        if (!bannedWord.trim()) return;
        try {
            const result = await addBannedWords(bannedWord.trim());
            addWordToStore(result);
            setBannedWord("");
            setStatus("Слово добавлено");
        } catch (err) {
            setStatus(err.message);
        }
    };

    // Массовое добавление (слова через запятую или перенос строки)
    const handleBulkAdd = async () => {
        const words = bulkText
            .split(/[\n,]+/)
            .map((w) => w.trim())
            .filter(Boolean);
        if (!words.length) return;
        try {
            const result = await addBannedWordsBulk(words);
            // Перезагружаем стор целиком, т.к. сервер возвращает только статистику
            useWordsStore.setState({ isLoaded: false });
            await fetchBannedWords();
            setBulkText("");
            setStatus(`Добавлено: ${result.added}, пропущено: ${result.skipped}`);
        } catch (err) {
            setStatus(err.message);
        }
    };

    // Импорт из файла
    const handleImport = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const result = await importBannedWords(file);
            useWordsStore.setState({ isLoaded: false });
            await fetchBannedWords();
            setStatus(`Импортировано: ${result.added}, пропущено: ${result.skipped}`);
        } catch (err) {
            setStatus(err.message);
        } finally {
            fileInputRef.current.value = "";
        }
    };

    // Скачать CSV-экспорт логов аудита
    const handleExportLogs = async () => {
        try {
            const blob = await exportAuditLogs();
            const url  = URL.createObjectURL(blob);
            const a    = document.createElement("a");
            a.href     = url;
            a.download = `audit_logs_${new Date().toISOString().slice(0,10)}.csv`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            setStatus(err.message);
        }
    };

    // Удалить слово
    const handleDelete = async (id) => {
        try {
            await deleteBannedWords(id);
            removeWordFromStore(id);
        } catch (err) {
            setStatus(err.message);
        }
    };

    return (
        <div className="flex flex-col gap-5">
            <p className="text-2xl text-center">Запрещённые слова</p>

            {/* Список */}
            <div className="h-auto max-h-75 border-2 border-border-bg rounded-2xl p-5 gap-2 flex flex-col overflow-auto">
                {bannedWords.length === 0 && (
                    <p className="text-gray-400 text-sm text-center">Список пуст</p>
                )}
                {bannedWords.map((word) => (
                    <div key={word.id} className="border-2 border-border-bg p-2 text-[18px] flex justify-between">
                        <p>{word.word}</p>
                        <button className="hover:cursor-pointer" onClick={() => handleDelete(word.id)}>
                            Удалить
                        </button>
                    </div>
                ))}
            </div>

            {/* Добавить одно слово */}
            <div className="flex flex-col gap-3">
                <Input
                    label="Новое запрещённое слово"
                    placeholder="Введите слово..."
                    value={bannedWord}
                    onChange={(e) => setBannedWord(e.target.value)}
                />
                <Button onClick={handleAdd}>Добавить</Button>
            </div>

            {/* Массовое добавление */}
            <div className="flex flex-col gap-3">
                <p className="text-gray-400 text-sm">Массовое добавление — слова через запятую или перенос строки</p>
                <textarea
                    className="border-2 border-border-bg bg-transparent rounded-lg p-2 text-main-text resize-none h-24"
                    placeholder={"слово1, слово2\nслово3"}
                    value={bulkText}
                    onChange={(e) => setBulkText(e.target.value)}
                />
                <Button onClick={handleBulkAdd}>Добавить списком</Button>
            </div>

            {/* Импорт из файла */}
            <div className="flex flex-col gap-3">
                <p className="text-gray-400 text-sm">Импорт из .txt файла (одно слово на строку)</p>
                <input ref={fileInputRef} type="file" accept=".txt" onChange={handleImport}
                    className="text-main-text text-sm" />
            </div>

            {/* Экспорт логов */}
            <div className="border-t border-border-bg pt-4">
                <Button onClick={handleExportLogs}>Скачать логи аудита (CSV)</Button>
            </div>

            {status && <p className="text-sm text-gray-400">{status}</p>}
        </div>
    );
};