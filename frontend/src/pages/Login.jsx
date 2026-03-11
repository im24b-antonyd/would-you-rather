import {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {CurrentUserContext} from "../components/CurrentUserContext.jsx";
import {listUsers} from "../services/UserService.js";

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

    function SignIn() {
        if (validateForm()) {
            const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD
            const username = data.find(item => item.email === email)
            setCurrentUser({
                email: email,
                username: username.username,
                last_login_date: today,
                _remember_me: isChecked,
                avatar: selectedWallpaper
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

    useEffect(() => {
        localStorage.setItem("selectedWallpaper", selectedWallpaper)
    }, [selectedWallpaper]);

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
            <form action="/" className="bg-white/40 w-90 flex flex-col rounded-sm shadow-md p-8"
                  onSubmit={() => {
                      SignIn()
                  }}
            >
                <h1 className="text-2xl font-bold text-center text-white">Sign In</h1>
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
                        <label className="ms-1.5 text-gray-500">
                            Remember Me
                        </label>
                    </div>
                    <Link to="" className="text-blue-500 hover:underline">Forgot password?</Link>
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
                    <Link to="/register" className="text-blue-500 cursor-pointer hover:underline">Create one</Link>
                </div>
            </form>

        </div>
    )
}