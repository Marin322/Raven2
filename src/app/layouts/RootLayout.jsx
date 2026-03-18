import { Outlet } from "react-router-dom"

export const RootLayout = () => {
    return (
        <div className="app-container min-h-screen bg-main-bg">
            <Outlet/>
        </div>
    )
}