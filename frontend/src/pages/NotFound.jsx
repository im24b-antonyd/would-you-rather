import {Link} from "react-router-dom";

export default function NotFound() {
    return (
        <div className="h-screen flex p-10 flex-col justify-center items-center">
            <div className="flex justify-center gap-4 flex-1 flex-col items-center">
                <h1 className="text-9xl">404</h1>
                <p>Page not found</p>
            </div>
            <Link className="bg-blue-500 p-2 text-white rounded-md" to="/">Back to Startpage</Link>
        </div>
    )
}