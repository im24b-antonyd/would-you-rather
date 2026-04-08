import {Link} from "react-router-dom";

export default function Games() {
    return (
        <div className="p-20">
            <p className="text-2xl font-bold">Home</p>
            <br/>
            <div className="flex flex-col w-1/2 border-1-gray-300 border">
                <img
                    src="/wyr.jpg"
                    alt="Would you rather"
                    className="w-full rounded-lg"
                />
                <Link to="/wyr" className="text-2xl font-bold bg-blue-500 w-1/5 border rounded-lg text-center  ">Go --></Link>
            </div>
        </div>
    )
}