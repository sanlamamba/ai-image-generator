
import { useContext } from 'react';
import { download } from '../../assets';
import { ThemeContext } from '../../utils/contexts/theme/theme';
import { downloadImage } from '../../utils/helpers';

const Card = ({ _id, name, prompt, photo }) => {
  const { theme, getTheme } = useContext(ThemeContext); 
  
  return (
    <div className={`rounded-xl group relative shadow-card hover:shadow-cardhover ${getTheme('bg-secondary')} card`}>
      <img
        className="w-full h-auto object-cover rounded-xl"
        src={photo}
        alt={prompt}
      />
      <div className={`group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 ${getTheme('bg')} m-2 p-4 rounded-md`}>
        <p className={`text-${getTheme('text').split('-')[1]} text-sm overflow-y-auto prompt`}>{prompt}</p>

        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            {/* Assuming name's initial circle follows the primary button theme or something similar for visibility */}
            <div className={`w-7 h-7 rounded-full object-cover ${getTheme('button-primary')} flex justify-center items-center text-white text-xs font-bold`}>{name[0]}</div>
            <p className={`text-${getTheme('text').split('-')[1]} text-sm`}>{name}</p>
          </div>
          <button type="button" onClick={() => downloadImage(_id, photo)} className="outline-none bg-transparent border-none">
            <img src={download} alt="download" className={`w-6 h-6 object-contain ${theme === 'dark' ? 'invert' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;