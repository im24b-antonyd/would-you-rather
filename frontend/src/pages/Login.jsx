import {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {CurrentUserContext} from "../components/CurrentUserContext.jsx";
import {listUsers, updateUser} from "../services/UserService.js";

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isChecked, setIsChecked] = useState(false)
    const {currentUser, setCurrentUser} = useContext(CurrentUserContext)
    const [data, setData] = useState([])

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    })

    const navigator = useNavigate()

    function SignIn() {
        if (validateForm()) {
            const user = data.find(item => item.email === email)
            const currentDate = new Date()
            const userData = {
                email: user.email,
                displayName: user.displayName,
                username: user.username,
                password: user.password,
                avatarUrl: user.avatarUrl,
                registerDate: user.registerDate,
                lastLoginDate: currentDate,
                rememberMe: isChecked
            }
            updateUser(user.id, userData).then((response) => {
                console.log(response)
            })
            setCurrentUser({
                email: email,
                username: user.username,
                _remember_me: isChecked
            });
            return navigator("/")
        }
    }

    function validateForm() {
        let valid = true

        const errorsCopy = {...errors}

        const emailExist = data.some(item => item.email === email)

        if (!email.trim()) {
            errorsCopy.email = "Email is required";
            valid = false
        } else if (!emailExist) {
            errorsCopy.email = "Email doesn't exist";
            valid = false
        } else {
            errorsCopy.email = '';
            const user = data.find(item => item.email === email)
            const correctPassword = user.password === password
            if (!password.trim()) {
                errorsCopy.password = "Password is required";
                valid = false;
            } else if (!correctPassword) {
                errorsCopy.password = "Wrong password";
                valid = false
            } else {
                errorsCopy.password = ''
            }
        }

        setErrors(errorsCopy)

        return valid;
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await listUsers();
                setData(response.data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchUsers()
    }, []);

    function toggleCheckbox() {
        if (isChecked) {
            setIsChecked(false)
        } else {
            setIsChecked(true)
        }
    }

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("currentUser")) || [];
        if (savedUser) {
            setCurrentUser(savedUser);
        }
    }, [])


    const loggedIn = Object.keys(currentUser).length > 0
    useEffect(() => {
        if (loggedIn) {
            navigator("/")
        }

    }, [loggedIn, navigator]);

    useEffect(() => {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <div className="bg-[url(/tuffimages.jpg)] bg-no-repeat text-center bg-cover h-screen flex justify-center items-center">
            <form action="/" className="bg-white w-90 flex flex-col rounded-sm shadow-md p-8"
                  onSubmit={() => {
                      SignIn()
                  }}
            >
                <h1 className="text-2xl font-bold text-center">Sign In</h1>
                <div className="flex flex-col gap-8 pb-8 pt-8">
                    <div>
                        <input
                            className={`${errors.email ? 'border-red-500' : 'border-slate-300'}  bg-white w-full p-2 rounded-md border`}
                            placeholder="Email"
                            id="email"
                            value={email}
                            type={"email"}
                            onChange={e => setEmail(e.target.value)}

                        ></input>
                        {errors.email &&
                            <p className="text-red-500 mt-1 absolute text-xs">{errors.email}</p>
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
                        ></input>
                        {errors.password &&
                            <p className="text-red-500 absolute mt-1 text-xs">{errors.password}</p>
                        }
                    </div>
                </div>
                <div className="flex justify-between text-sm  pb-6">
                    <div className="flex ">
                        <input className="p-4 border cursor-pointer border-slate-300" type="checkbox"
                               checked={isChecked} onClick={() => {
                            toggleCheckbox()
                        }}
                               onChange={() => {
                                   toggleCheckbox()
                               }}
                        />
                        <label className="ms-1.5 text-gray-700">
                            Remember Me
                        </label>
                    </div>
                    <p className="text-blue-500">Forgot password?</p>
                </div>
                <button
                    className="bg-blue-500 text-white cursor-pointer p-2 rounded-sm"
                    onClick={(e) => {
                        e.preventDefault()
                        SignIn()
                    }}
                >Sign In
                </button>
                <div className="flex gap-1 pt-6 justify-center text-sm">
                    <p className="text-gray-500 ">Don't have an account?</p>
                    <Link to="/register" className="text-blue-500 cursor-pointer">Create one</Link>
                </div>
            </form>

        </div>
    )
}