import { FaArrowCircleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BackButton = ({ url }) => {
    return (
        <Link to={url} className='flex items-center justify-center w-28 lg:w-36 border-2 py-2 rounded-xl bg-slate-500 text-zinc-50 hover:bg-zinc-50 hover:text-slate-500 ease-in-out duration-300 mt-5'>
            <FaArrowCircleLeft className='mr-2'/> Back
        </Link>
    );
};

export default BackButton;