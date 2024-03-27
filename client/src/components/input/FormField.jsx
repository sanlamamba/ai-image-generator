import { useContext } from "react";
import { ThemeContext } from "../../utils/contexts/theme/theme";

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
  disabled
}) => {
  const { getTheme } = useContext(ThemeContext);

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          htmlFor={name}
          className={`block text-sm font-medium ${getTheme('text')}`}
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className={`font-semibold text-xs ${getTheme('button-secondary')} py-1 px-2 rounded-[5px]`}
          >
            Surprise me
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        className={`${getTheme("bg-secondary")} border ${getTheme('border')} ${getTheme('text')} text-sm rounded-lg focus:ring-${getTheme('button-primary').split(' ')[0]} focus:border-${getTheme('button-primary').split(' ')[0]} outline-none block w-full p-3`}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        disabled={disabled}
      />
    </div>
  );
};

export default FormField;