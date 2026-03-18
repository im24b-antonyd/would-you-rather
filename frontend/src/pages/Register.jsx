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

    const wallpaperOptions = [
        { label: "river", value: "/wallpapers/wallpaper_login.jpg" },
        { label: "road", value: "/wallpapers/wallpaper_road.jpg" },
        { label: "curtains", value: "/wallpapers/wallpaper_curtains.jpeg" },
        { label:"mountains", value: "/wallpapers/wallpaper_mountains.webp" },
        { label:"peak", value: "/wallpapers/wallpaper_peak.jpg" },
        { label:"autumn", value: "/wallpapers/wallpaper_autumn.jpg" },
        { label:"highway", value: "/wallpapers/wallpaper_highway.jpg" },
        { label:"springfall", value: "/wallpapers/wallpaper_springfall.jpg" },
        { label:"panorama", value: "/wallpapers/wallpaper_panorama.jpg" },
        { label:"chill-spot", value: "/wallpapers/wallpaper_chill_spot.jpg" },
        { label:"alien-mountains", value: "/wallpapers/wallpaper_alien_mountains.webp" },
        { label:"pond", value: "/wallpapers/wallpaper_pond.jpg" },
        { label:"winter", value: "/wallpapers/wallpaper_winter.webp" },
        { label:"fantasy-saturn", value: "/wallpapers/wallpaper_fantasy_saturn.jpg" },
        { label:"black-hole", value: "/wallpapers/wallpaper_black_hole.webp" },
        { label:"earth", value: "/wallpapers/wallpaper_earth.jpg" },
        { label:"dark-paradise", value: "/wallpapers/wallpaper_dark_paradise.jpg" },
        { label:"supernova", value: "/wallpapers/wallpaper_supernova.jpg" },
        { label:"hyperspace", value: "/wallpapers/wallpaper_hyperspace.jpg" },
        { label:"space", value: "/wallpapers/wallpaper_space.jpg" },
        { label:"system", value: "/wallpapers/wallpaper_system.jpg" },
        { label:"heat-death", value: "/wallpapers/wallpaper_heat_death.jpg" },
        { label:"star", value: "/wallpapers/wallpaper_star.jpg" },
        { label:"saturn", value: "/wallpapers/wallpaper_saturn.jpg" },
        { label:"twin-planets", value: "/wallpapers/wallpaper_twin_planets.jpg" },
        { label:"bluestar", value: "/wallpapers/wallpaper_bluestar.jpg" },
        { label:"blue-galaxy", value: "/wallpapers/wallpaper_blue_galaxy.jpg" },
        { label:"collision", value: "/wallpapers/wallpaper_collision.jpg" },
        { label:"sky", value: "/wallpapers/wallpaper_sky.webp" },
        { label:"planetary", value: "/wallpapers/wallpaper_planetary.jpg" },
        { label:"noon", value: "/wallpapers/wallpaper_noon.jpg" },
    ]

    const [selectedWallpaper, setSelectedWallpaper] = useState(
        localStorage.getItem("selectedWallpaper") || wallpaperOptions[0].value
    )

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

    useEffect(() => {
        localStorage.setItem("selectedWallpaper", selectedWallpaper)
    }, [selectedWallpaper]);

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
        <div
            className="bg-cover bg-center h-screen flex justify-center items-center"
            style={{ backgroundImage: `url('${selectedWallpaper}')` }}
        >
            <div className="absolute top-4 right-4">
                <select
                    className="bg-white/80 border border-slate-300 rounded-md p-2 text-sm text-gray-700 cursor-pointer"
                    value={selectedWallpaper}
                    onChange={e => setSelectedWallpaper(e.target.value)}
                >
                    {wallpaperOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <form action="/login" className="bg-white/40 w-90 flex flex-col rounded-sm shadow-md p-8"
                  onSubmit={() => {
                      SignUp()
                  }}
            >
                <h1 className="text-2xl font-bold text-center text-white">Sign Up</h1>
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
                    <p className="text-white ">
                        Already have an account?</p>
                    <Link to="/login" className="text-blue-500 cursor-pointer">Sign In</Link>
                </div>
            </form>
        </div>
    )
}