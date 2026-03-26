import {CheckCircle2Icon, InfoIcon} from "lucide-react";

export default function Alert({message, type, children}) {
    return (
        <div className={`alert ${type} bg-white flex gap-2 text-red-500 p-2 rounded-md`}>
            {children && <span className="mt-1">{children}</span>}
            <span>{message}</span>
        </div>
    );
}