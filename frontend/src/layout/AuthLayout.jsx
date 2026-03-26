import NavBar from "../components/NavBar.jsx";
import {Outlet} from "react-router-dom";
import {Toaster} from "react-hot-toast";

export default function AuthLayout ({ children }) {
    return (
        <div>
            <Toaster/>
            <main className="w-screen">
                <Outlet/>
            </main>
        </div>
    )
}