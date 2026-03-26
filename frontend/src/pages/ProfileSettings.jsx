import {useContext, useEffect, useState} from "react";
import {
    findUser,
    findUserByUsername,
    listUsers,
    updateUser
} from "../services/UserService.js";
import {CurrentUserContext} from "../components/CurrentUserContext.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import useAuthStore from "../auth/store.js";

export default function ProfileSettings() {
    const {currentUser, setCurrentUser} = useContext(CurrentUserContext)
    const [avatarUrl, setAvatarUrl] = useState("/uploads/avatar/default-avatar.jpg");
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [data, setData] = useState([])

    const user = useAuthStore(state => state.user)

    const [errors, setErrors] = useState({
        email: '',
        username: '',
        displayName: '',
    })

    /*
    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("currentUser")) || [];
        if (savedUser) {
            setCurrentUser(savedUser);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }, [currentUser]);
     */

    function cancelSubmit(e) {
        e.preventDefault()
        setData(data)
        setUsername(data.username)
        setDisplayName(data.displayName)
        setAvatarUrl(data.avatarUrl)
    }

    const navigator = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        if (await validateForm()) {
            const user = {
                username: username,
                displayName: displayName,
                password: data.password,
                avatarUrl: data.avatarUrl,
                email: data.email,
                rememberMe: data.rememberMe,
                registerDate: data.registerDate,
                lastLoginDate: data.lastLoginDate
            }
            updateUser(data.id, user).then((response) => {
                setData(response.data)
                const currentUserData = {
                    email: data.email,
                    username: username,
                    last_login_date: currentUser.last_login_date,
                    _remember_me: currentUser._remember_me
                }
                localStorage.setItem('currentUser', JSON.stringify(currentUserData));
                const savedUser = JSON.parse(localStorage.getItem("currentUser")) || [];
                if (savedUser) {
                    setCurrentUser(savedUser);
                }
                setUsername(data.username)
                setDisplayName(data.displayName)
                navigator("/settings/profile")

            }).catch(err => {
                console.error(err)
            })
        }
    }

    useEffect(() => {

        setData(user)
        setUsername(user?.username)
        setDisplayName(user?.displayName)
        setAvatarUrl(user?.avatarUrl)

    }, [user]);

    const date = new Date(user?.createdAt);

    console.log(user)


    async function validateForm() {
        let valid = true
        setUsername(username)
        setDisplayName(displayName)
        const errorsCopy = {...errors}
        const usernameExist = isUsernameTaken(username)

        if (!username.trim()) {
            errorsCopy.username = "Username is required";
            valid = false
        } else if (username.length < 3) {
            errorsCopy.username = "Username is too short"
            valid = false
        } else if (username.includes(" ")) {
            errorsCopy.username = "Username can't have space, use underscores instead"
            valid = false
        } else if (username.length > 30) {
            errorsCopy.username = "Username is too long"
            valid = false
        } else if (usernameExist && username.toLowerCase() !== data.username.toLocaleLowerCase()) {
            errorsCopy.username = "Username is already taken"
            valid = false
        } else {
            errorsCopy.username = '';
        }

        if (!displayName.trim()) {
            errorsCopy.displayName = "Display Name is required";
            valid = false
        } else {
            errorsCopy.displayName = '';
        }

        setErrors(errorsCopy)

        return valid;
    }

    useEffect(() => {
        const handler = setTimeout(async () => {
            await validateForm()
        }, 300) // debounce 300ms

        return () => clearTimeout(handler)
    }, [username, displayName])

    return (
        <div id="changePasswordSettings" className="p-8 gap-10 flex-col flex ">
            <div className="flex items-center gap-6">
                <img src={user?.avatarUrl} className="w-40 aspect-square rounded-full" alt="profile picture"/>
                <div className="flex flex-col">
                    <p className="text-2xl font-bold">@{user?.username}</p>
                    <button className="text-lg text-blue-500">Change profile picture</button>
                </div>
            </div>
            <div className="text-neutral-500 flex gap-6 flex-col">
                <h1 className="text-lg text-black font-bold">Details</h1>
                <p>Registration Date: {date.toLocaleDateString("de-DE")}</p>
                <form onSubmit={async (e) => {
                    await handleSubmit(e)
                }}
                      className="flex gap-6 flex-col"
                >
                    <label className="flex justify-between items-center">Username:
                        <div className="flex justify-between flex-col">
                            <div
                                className={`${errors.username ? 'border-red-500 focus:border-red-500 active:border-red-500' : 'border-slate-300'} bg-white p-2 rounded-md border`}
                            >
                                @
                                <input className="text-black" id="username"
                                       onChange={async (e) => {
                                           setUsername(e.target.value)
                                       }}
                                       value={username}
                                />

                            </div>
                            {errors.username &&
                                <p className="text-red-500 absolute mt-11 text-xs">{errors.username}</p>
                            }
                        </div>
                    </label>

                    <label className="flex justify-between items-center">Display Name:
                        <div className="flex justify-between flex-col">
                            <input id="displayName"
                                   className={`${errors.displayName ? 'border-red-500 focus:border-red-500 active:border-red-500' : 'border-slate-300'} bg-white p-2 rounded-md border`}
                                   value={displayName}
                                   onChange={async (e) => {
                                       setDisplayName(e.target.value)
                                   }}
                            />
                            {errors.displayName &&
                                <p className="text-red-500 absolute mt-11 text-xs">{errors.displayName}</p>
                            }
                        </div>
                    </label>
                    <div className="flex pt-8 gap-2">
                        <button
                            onClick={async (e) => {
                                await handleSubmit(e)
                            }}
                            className="p-2 cursor-pointer bg-blue-500 text-white w-fit rounded-md"
                        >Save
                        </button>
                        <button
                            onClick={(e) => {
                                cancelSubmit(e)
                            }}
                            className="p-2 cursor-pointer bg-red-500 text-white w-fit rounded-md"
                        >Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}