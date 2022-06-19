import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className='flex justify-between border-solid pb-2 border-b-2'>
            <div className='text-2xl font-bold logo'>
                <Link to='/'>Help Desk</Link>
            </div>
            <ul className='flex items-center'>
                <li className='mr-4'>
                    <Link to='/login' className='flex items-center'>
                        <FaSignInAlt className='mr-1'/> Login
                    </Link>
                </li>
                <li>
                    <Link to='/register' className='flex items-center'>
                        <FaUser className='mr-1'/> Register
                    </Link>
                </li>
            </ul>
        </header>
    );
}

export default Header;