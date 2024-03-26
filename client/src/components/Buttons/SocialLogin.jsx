import React from 'react';
import { toast } from "react-toastify";

function SocialLogin({ icon, text, onClick }) {
    const [isButtonDisabled, setButtonDisabled] = React.useState(false);

    const handleClick = () => {
        if (!isButtonDisabled) {
            setButtonDisabled(true);
            toast.info("Feature is under development");
            setTimeout(() => {
                setButtonDisabled(false);
            }, 5000);
        }
    };

    return (
        <button
            className="bg-white border border-gray-300 py-2 px-2 rounded w-full relative hover:bg-gray-50 transition duration-150 ease-in-out text-start"
            onClick={handleClick}
            disabled={isButtonDisabled}
        >
            <img
                src={icon}
                alt={text}
                className="w-4 h-4 absolute left-4 top-1/2 transform -translate-y-1/2"
            />
            <span className="pl-12">{text}</span>
        </button>
    );
}

export default SocialLogin;
