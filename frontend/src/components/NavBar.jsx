import {useContext, useEffect} from "react";
import {CurrentUserContext} from "./CurrentUserContext.jsx";
import {Link} from "react-router-dom";
import SettingsMenu from "./SettingsMenu.jsx";

export default function NavBar() {
    const {currentUser, setCurrentUser} = useContext(CurrentUserContext)

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("currentUser")) || [];
        if (savedUser) {
            setCurrentUser(savedUser);
        }
    }, [])

    const username = currentUser?.username
        ? `@${currentUser.username.toLowerCase()}`
        : null;

    return (
        <div className="p-4 pr-6 pl-6 flex flex-col justify-between h-screen border border-neutral-300">
            <div className="flex flex-col gap-5">
                <Link to="/" className="text-2xl font-bold">Home</Link>
                <p>Games</p>
            </div>
            <div className="justify-end">
                {username &&
                    <div className="flex flex-col gap-4">
                        <Link to={`/user/${username}`}>{username}</Link>
                        <SettingsMenu/>
                    </div>
                }
                {!username &&
                    <Link className="p-2 border border-slate-300 rounded-md" to="/login">Sign In</Link>
                }
            </div>
        </div>
)
}