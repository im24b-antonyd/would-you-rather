import {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {CurrentUserContext} from "./CurrentUserContext.jsx";
import useAuthStore from "../auth/store.js";

export default function SettingsMenu() {
    const [isOpen, setIsOpen] = useState(false)
    const {setCurrentUser} = useContext(CurrentUserContext)

    const logout = useAuthStore(state => state.logout)

    const navigator = useNavigate()

    function openMenu() {
        if (isOpen) {
            setIsOpen(false)
        }
        else {
            setIsOpen(true)
        }
    }



    return (
        <div
            className="cursor-pointer"
        >
            <button className="cursor-pointer"
                onClick={openMenu}
            >
                Settings
            </button>
            {isOpen && (
                <div
                    className="fixed flex flex-col text-base bg-slate-100 focus rounded-sm border-neutral-300 border p-2 bottom-13 w-40 bg-primary text-base z-50">
                    <Link className="hover:bg-slate-200 p-1 rounded-sm" to="/settings">All Settings</Link>
                    <p
                        className="hover:bg-slate-200 p-1 rounded-sm"
                        onClick={(e) => {
                            logout()
                        }}
                    >Log out</p>
                </div>
            )}
        </div>
    )
}