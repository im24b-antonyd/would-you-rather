import {useContext, useEffect} from "react";
import {CurrentUserContext} from "./CurrentUserContext.jsx";
import {Link} from "react-router-dom";
import SettingsMenu from "./SettingsMenu.jsx";
import useAuthStore from "../auth/store.js";

export default function NavBar() {
    const {currentUser, setCurrentUser} = useContext(CurrentUserContext)
    const checkLogin = useAuthStore(state => state.checkLogin)
    const user = useAuthStore(state => state.user)


    return (
        <div className="p-4 pr-6 pl-6 flex flex-col justify-between h-screen border border-neutral-300">
            <div className="flex flex-col gap-5">
                <Link to="/" className="text-2xl font-bold">Home</Link>
                <Link to="/games" className="text-2xl font-bold">Games</Link>
            </div>
            <div className="justify-end">
                {checkLogin() ? (
                        <div className="flex flex-col gap-4">
                            <Link to={`/user/@${user?.username}`}>@{user?.username}</Link>
                            <SettingsMenu/>
                        </div>
                    ) :
                    (
                        <Link className="p-2 border border-slate-300 rounded-md" to="/login">Sign In</Link>
                    )
                }
            </div>
        </div>
    )
}