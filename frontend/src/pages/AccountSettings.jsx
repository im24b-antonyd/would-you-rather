import {useContext, useEffect, useState} from "react";
import {CurrentUserContext} from "../components/CurrentUserContext.jsx";
import {deleteUser, findUser, listUsers, updateUser} from "../services/UserService.js";
import {useNavigate} from "react-router-dom";

export default function AccountSettings() {
    const {currentUser, setCurrentUser} = useContext(CurrentUserContext)
    const [data, setData] = useState([])

    const navigator = useNavigate()

    function handleDelete(e) {
        e.preventDefault()

        deleteUser(data.id).then((response) => {
            console.log(response)
            localStorage.setItem('currentUser', JSON.stringify([]));
            const savedUser = JSON.parse(localStorage.getItem("currentUser")) || [];
            if (savedUser) {
                setCurrentUser(savedUser);
            }
        }).catch(err => {
            console.error(err)
        })
        localStorage.removeItem("currentUser");
        return navigator("/")
    }

    useEffect(() => {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }, [currentUser]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await listUsers();
            const allUsers = response.data

            try {
                const user = allUsers.find(item => item.username.toLowerCase() === currentUser.username.toLowerCase())
                if (!user) return;
                const response = await findUser(user.id);
                setData(response.data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchData()
    }, [currentUser]);

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("currentUser")) || [];
        if (savedUser) {
            setCurrentUser(savedUser);
        }
    }, [])

    return (
        <div className="p-8">
            <button
                onClick={(e) => {
                    handleDelete(e)
                }}
                className="p-2 cursor-pointer text-white bg-red-500 rounded-md">Delete Account
            </button>
        </div>
    )
}