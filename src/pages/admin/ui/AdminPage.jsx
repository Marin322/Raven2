import { useState } from "react"
import { AdminSideBar } from "../../../widgets/admin-sidebar"
import { UserList } from "../../../widgets/user-list";
export const AdminPage = () => {
    const [activeTab, setActiveTab] = useState("list");

    const renderContet = () => {
        switch(activeTab) {
            case "list":
                return <div><UserList/></div>
        }
    }
    return (
        <div className="w-full h-screen overflow-hidden bg-main-bg flex">
            <AdminSideBar activeTab={activeTab} onTabChanged={setActiveTab}/>
            <div className="flex overflow-none">
                {renderContet()}
            </div>
        </div>
    )
}