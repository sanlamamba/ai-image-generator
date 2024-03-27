import React from 'react';
import { useContext } from 'react';
import { toast } from "react-toastify";
import { ThemeContext } from '../../utils/contexts/theme/theme';

function SocialLogin({ icon, text, onClick }) {
    const [isButtonDisabled, setButtonDisabled] = React.useState(false);
    const { getTheme } = useContext(ThemeContext);

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
            className={`border py-2 px-2 rounded w-full relative hover:${getTheme('bg-secondary')} transition duration-150 ease-in-out text-start ${getTheme('bg')} ${getTheme('border')}`}
            onClick={handleClick}
            disabled={isButtonDisabled}
        >
            <img
                src={icon}
                alt={text}
                className="w-4 h-4 absolute left-4 top-1/2 transform -translate-y-1/2"
            />
            <span className={`pl-12 ${getTheme('text')}`}>{text}</span>
        </button>
    );
}

export default SocialLogin;