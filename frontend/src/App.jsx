import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route, useLocation} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import NavBar from "./components/NavBar.jsx";
import {CurrentUserContext} from "./components/CurrentUserContext.jsx";
import NotFound from "./pages/NotFound.jsx";
import UserPage from "./pages/UserPage.jsx";
import ProfileSettings from "./pages/ProfileSettings.jsx";
import AccountSettings from "./pages/AccountSettings.jsx";
import SettingsLayout from "./layout/SettingsLayout.jsx";
import DashboardLayout from "./layout/DashboardLayout.jsx";
import AuthLayout from "./layout/AuthLayout.jsx";

function App() {
    const [currentUser, setCurrentUser] = useState([])
    /*
    const location = useLocation();
    const hideNavBar = location.pathname === "/login" || location.pathname === "/register";
    */

    return (
        <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
            <Routes>
                <Route path="/" element={<DashboardLayout/>}>
                    <Route index element={<Home/>}/> {/* optional */}
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/user/:username" element={<UserPage/>}/>
                    <Route path="/settings" element={<SettingsLayout/>}>
                        <Route index element={<ProfileSettings/>}/> {/* optional */}
                        <Route path="profile" element={<ProfileSettings/>}/>
                        <Route path="account" element={<AccountSettings/>}/>
                    </Route>
                    <Route path="*" element={<NotFound/>}/>
                </Route>
                <Route path="/" element={<AuthLayout/>}>
                    <Route index element={<Login/>}/> {/* optional */}
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Route>
            </Routes>
        </CurrentUserContext.Provider>
    )
}

export default App
