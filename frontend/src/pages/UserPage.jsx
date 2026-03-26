import {useContext, useEffect, useRef, useState} from "react";
import {findUser, findUserByUsername, listUsers, publicUserPage, updateUser} from "../services/UserService.js";
import {Link, replace, useNavigate, useParams} from "react-router-dom";
import NotFound from "./NotFound.jsx";
import {CurrentUserContext} from "../components/CurrentUserContext.jsx";
import axios from "axios";
import useAuthStore from "../auth/store.js";

export default function UserPage() {
    const [data, setData] = useState([])
    const [avatarUrl, setAvatarUrl] = useState(null);
    const {currentUser, setCurrentUser} = useContext(CurrentUserContext)

    const fileUploadRef = useRef()
    const params = useParams();

    const checkLogin = useAuthStore(state => state.checkLogin)
    const user = useAuthStore(state => state.user)

    const navigator = useNavigate()

    useEffect(() => {

        async function fetchData() {
            await publicUserPage(params.username.replace("@", "")).then((response) => {
                setData(response.data)
            }).catch(err => {
                navigator("/not-found"); // or render inline
                console.error(err)
            })
        }

        fetchData()

    }, [params]);

    function handleImageUpload(e) {
        e.preventDefault()

        fileUploadRef.current.click()
    }

    const uploadImageDisplay = async (e) => {
        try {
            const uploadedFile =
                e.target.files[0];


            const newAvatarUrl = `/uploads/avatar/${uploadedFile.name}`
            const updatedUser = {
                avatarUrl: newAvatarUrl,
            }

            await updateUser(data.id, updatedUser);
            setAvatarUrl(newAvatarUrl)
        } catch (err) {
            console.error(err)
        }
    }

    //const usernameOnDisplay = `@${data.username}`

    return (
        <div className="">
            <div className="p-4 flex rounded-md gap-4 justify-between items-center ">
                <div className="flex items-center flex-1 gap-4 p-6 ">
                    {checkLogin() ? (
                        <div
                            className="bg-black group relative overflow-hidden cursor-pointer flex items-center justify-center rounded-full">
                            <img src="/camera.png" alt="camera icon"
                                 className="w-10 aspect-square hidden group-hover:block transition-all absolute duration-200 "/>
                            <input type="file" ref={fileUploadRef} className="hidden"
                                   onChange={(e) => {
                                       uploadImageDisplay(e)
                                   }
                                   }
                            />
                            <img src={data.avatarUrl} alt="Profile picture" onClick={(e) => {
                                handleImageUpload(e)
                            }}
                                 className="h-40 hover:opacity-50 duration-200 transition-opacity rounded-full aspect-square"/>
                        </div>
                    ) : (
                        <img src={data.avatarUrl} alt="Profile picture"
                             className="h-40 duration-200 transition-opacity rounded-full aspect-square"/>
                    )
                    }

                    <div className="flex flex-col gap-2">
                        <p className="text-3xl font-bold">{data.displayName}</p>
                        <p className="text-lg">@{data.username}</p>
                    </div>
                </div>
                <div>
                    {user && user.username === params.username.replace("@", "") ? (
                        <div>
                            <Link to="/settings/profile"
                                  className="p-2 bg-blue-500 cursor-pointer text-white rounded-md">Update
                                Profile</Link>
                        </div>
                    ) : (
                        <div className="flex gap-4">
                            <button className="p-2 bg-green-600 cursor-pointer text-white rounded-md">Send Friend
                                Request
                            </button>
                            <button className="p-2 bg-slate-100 aspect-square w-10 cursor-pointer rounded-md">...
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}