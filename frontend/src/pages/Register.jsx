import {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {createUser, listUsers} from "../services/UserService.js";
import {CurrentUserContext} from "../components/CurrentUserContext.jsx";

export default function Register() {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [avatarUrl, setAvatar] = useState("/uploads/avatar/default-avatar.jpg")
    const [data, setData] = useState([])
    const {currentUser, setCurrentUser} = useContext(CurrentUserContext)

    const [errors, setErrors] = useState({
        email: '',
        username: '',
        password: '',
    })

    const navigator = useNavigate()

    const loggedIn = Boolean(Object.keys(currentUser).length > 0);

    useEffect(() => {
        if (loggedIn) {
            navigator("/")
        }
    }, [loggedIn, navigator]);

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("currentUser")) || [];
        if (savedUser) {
            setCurrentUser(savedUser);
        }
    }, [])

    function SignUp() {
        const user = {
            email: email,
            username: username,
            password: password,
            avatarUrl: avatarUrl,
            displayName: username,
            registerDate: new Date(),
            lastLoginDate: null,
            rememberMe: false
        }
        if (validateForm()) {
            createUser(user).then((response) => {
                navigator("/login")
            }).catch(err => {
                console.error(err)
            })
        }
    }

    useEffect(() => {
        listUsers().then((response) => {
            setData(response.data)
        }).catch(err => {
            console.error(err)
        })
    }, []);

    function validateForm() {
        let valid = true

        const errorsCopy = {...errors}
        const emailExist = data.some(item => item.email === email)
        const usernameExist = data.some(item => item.username.toLowerCase() === username.toLowerCase())

        if (!email.trim()) {
            errorsCopy.email = "Email is required";
            valid = false
        } else if (emailExist) {
            errorsCopy.email = "Email already exists";
            valid = false
        } else {
            errorsCopy.email = '';
        }
        if (!username.trim()) {
            errorsCopy.username = "Username is required";
            valid = false
        } else if (username.length < 3) {
            errorsCopy.username = "Username is too short"
            valid = false
        } else if (usernameExist) {
            errorsCopy.username = "Username already exists"
            valid = false
        } else {
            errorsCopy.username = '';

        }
        if (!password.trim()) {
            errorsCopy.password = "Password is required";
            valid = false
        } else if (password.length < 8) {
            errorsCopy.password = "Password is too short"
            valid = false
        } else {
            errorsCopy.password = ''
        }

        setErrors(errorsCopy)

        return valid;
    }

    return (
        <div className="bg-slate-100 h-screen flex justify-center items-center">
            <form action="/login" className="bg-white w-90 flex flex-col rounded-sm shadow-md p-8"
                  onSubmit={() => {
                      SignUp()
                  }}
            >
                <h1 className="text-2xl font-bold text-center">Sign Up</h1>
                <div className="flex flex-col gap-8 pb-8 pt-8">
                    <div>
                        <input
                            className={`${errors.email ? 'border-red-500' : 'border-slate-300'}  bg-white w-full p-2 rounded-md border`}
                            placeholder="Email"
                            id="email"
                            value={email}
                            type={"email"}
                            onChange={e => setEmail(e.target.value)}
                            required
                        ></input>
                        {errors.email &&
                            <p className="text-red-500 mt-1 absolute text-xs">{errors.email}</p>
                        }
                    </div>
                    <div>
                        <input
                            className={`${errors.username ? 'border-red-500' : 'border-slate-300'}  bg-white w-full p-2 rounded-md border`}
                            placeholder="Username"
                            id="username"
                            value={username}
                            type={"text"}
                            minLength={3}
                            onChange={e => setUsername(e.target.value)}
                            required
                        ></input>
                        {errors.username &&
                            <p className="text-red-500 absolute mt-1 text-xs">{errors.username}</p>
                        }
                    </div>
                    <div>
                        <input
                            className={`${errors.password ? 'border-red-500' : 'border-slate-300'}  bg-white w-full p-2 rounded-md border`}
                            placeholder="Password"
                            id="password"
                            onChange={e => setPassword(e.target.value)}
                            type={"password"}
                            value={password}
                            minLength={8}
                            required
                        ></input>
                        {errors.password &&
                            <p className="text-red-500 absolute mt-1 text-xs">{errors.password}</p>
                        }
                    </div>
                </div>
                <button
                    className="bg-blue-500 text-white cursor-pointer p-2 rounded-sm"
                    onClick={(e) => {
                        e.preventDefault()
                        SignUp()
                    }}
                >Sign Up
                </button>
                <div className="flex gap-1 pt-6 justify-center text-sm">
                    <p className="text-gray-500 ">
                        Already have an account?</p>
                    <Link to="/login" className="text-blue-500 cursor-pointer">Sign In</Link>
                </div>
            </form>
        </div>
    )
}