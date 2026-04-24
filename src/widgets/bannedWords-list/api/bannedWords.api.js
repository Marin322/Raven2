import { apiFetch } from "../../../shared";

export const addBannedWords = (bannedWord) => {
    return apiFetch(`/admin/banned-words`, {
        method: 'POST',
        body: JSON.stringify({ word: bannedWord })
    })
}

export const getBannedWords = () => {
    return apiFetch(`/admin/banned-words`, {
        method: 'GET'
    })
}

export const deleteBannedWords = (id) => {
    return apiFetch(`/admin/banned-words/${id}`, {
        method: 'DELETE'
    })
}