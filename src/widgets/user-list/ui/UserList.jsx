import { useState } from "react";
import { apiFetch, Button } from "../../../shared"
export const UserList = () => {
    const [users, setUsers] = useState({});
    const loadUsers = async () => {
        try {
            const users = await apiFetch('/search/users');
            console.log(users);
        }
        catch(err) {
            throw new Error(err);
        }
    }

    setUsers(loadUsers());

    return (
        <div>
        </div>
    )
}