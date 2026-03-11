import NavBar from "../components/NavBar.jsx";
import {Outlet} from "react-router-dom";

export default function DashboardLayout() {
    return (
        <div className="flex">
            <NavBar/>
            <main className="w-screen">
                <Outlet/>
            </main>
        </div>
    )
}